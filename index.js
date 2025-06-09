import{a as m,S as v,i as f}from"./assets/vendor-BMHzDZyJ.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const g=t=>`
    <li class="gallery-card">
      <a class="gallery-link" href="${t.largeImageURL}">
        <img
          class="gallery-img"
          src="${t.webformatURL}"
          alt="${t.tags}"
        />
      </a>
      <div class="gallery-info" style="display: flex; justify-content: space-around; padding: 8px; font-size: 14px; border: 1px solid #ddd; border-top: none;">
        <div><strong>Likes</strong><br>${t.likes}</div>
        <div><strong>Views</strong><br>${t.views}</div>
        <div><strong>Comments</strong><br>${t.comments}</div>
        <div><strong>Downloads</strong><br>${t.downloads}</div>
      </div>
    </li>
  `;m.defaults.baseURL="https://pixabay.com/api";const y=(t,r)=>{const s={q:t,orientation:"horizontal",image_type:"photo",safesearch:!0,key:"50729371-43a7836f0c474a05c441d935f",page:r,per_page:15};return m.get("/",{params:s})},L=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),d=document.querySelector(".js-loader"),i=document.querySelector(".load-btn"),p=new v(".js-gallery a",{captionsData:"alt",captionDelay:250});let n=1,u="";const b=async t=>{try{t.preventDefault();const{target:r}=t;u=r.elements.user_query.value,d.classList.add("active"),c.innerHTML="",i.classList.add("is-hidden"),n=1;const{data:s}=await y(u,n);if(d.classList.remove("active"),s.totalHits===0){f.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),c.innerHTML="";return}s.totalHits>15&&(i.classList.remove("is-hidden"),i.addEventListener("click",h));const a=s.hits.map(e=>g(e)).join("");c.innerHTML=a,p.refresh()}catch(r){d.classList.remove("active"),console.log(r)}};L.addEventListener("submit",b);const h=async t=>{try{n++;const{data:r}=await y(u,n),s=r.hits.map(o=>g(o)).join("");n*15>r.total&&(i.classList.add("is-hidden"),i.removeEventListener("click",h),f.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),c.insertAdjacentHTML("beforeend",s),p.refresh();const e=document.querySelector(".gallery-card").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}catch(r){console.log(r)}};
//# sourceMappingURL=index.js.map
