import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchPhotosByQuery = (searchQuery, currentPage) => {
  const requestParams = {
    q: searchQuery,
    orientation: 'horizontal',
    image_type: 'photo',
    safesearch: true,
    key: '50729371-43a7836f0c474a05c441d935f',
    page: currentPage,
    per_page: 15,
  };

  return axios.get(`/`, {params: requestParams});
}