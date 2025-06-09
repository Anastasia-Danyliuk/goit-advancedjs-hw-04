import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createImageHtmlTemplate } from './js/render-functions.js';
import { fetchPhotosByQuery } from './js/pixabay-api.js';

const searchForm = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.js-loader');
const loadMore = document.querySelector('.load-btn');

const lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let currentPage = 1;
let searchQuery = '';

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    const { target: searchForm } = event;

    searchQuery = searchForm.elements.user_query.value;

    loader.classList.add('active');

    gallery.innerHTML = '';

    loadMore.classList.add('is-hidden');

    currentPage = 1;

    const { data } = await fetchPhotosByQuery(searchQuery, currentPage);

    loader.classList.remove('active');

    if (data.totalHits === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      gallery.innerHTML = '';

      return;
    }

    if (data.totalHits > 15) {
      loadMore.classList.remove('is-hidden');
      loadMore.addEventListener('click', onLoadBtnClick);
    }

    const galleryHtmlTemplate = data.hits.map(image => createImageHtmlTemplate(image)).join('');
    gallery.innerHTML = galleryHtmlTemplate;
    lightbox.refresh();

  } catch (error) {
    loader.classList.remove('active');
    console.log(error);
  }

};
searchForm.addEventListener('submit', onSearchFormSubmit);

const onLoadBtnClick = async event => {
  try {
    currentPage++;

    const { data } = await fetchPhotosByQuery(searchQuery, currentPage);

    const galleryHtmlTemplate = data.hits.map(image => createImageHtmlTemplate(image)).join('');

    if (currentPage * 15 > data.total){
      loadMore.classList.add('is-hidden');
      loadMore.removeEventListener('click', onLoadBtnClick);
      iziToast.info({
        message: 'We\'re sorry, but you\'ve reached the end of search results.',
        position: 'topRight',
      });
    }

    gallery.insertAdjacentHTML('beforeend', galleryHtmlTemplate);
    lightbox.refresh();

    const firstCard = document.querySelector('.gallery-card');

    const cardHeight = firstCard.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth'
    });

  } catch (error) {
    console.log(error);
  }
};