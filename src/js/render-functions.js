export const createImageHtmlTemplate = image => {
  return `
    <li class="gallery-card">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img
          class="gallery-img"
          src="${image.webformatURL}"
          alt="${image.tags}"
        />
      </a>
      <div class="gallery-info" style="display: flex; justify-content: space-around; padding: 8px; font-size: 14px; border: 1px solid #ddd; border-top: none;">
        <div><strong>Likes</strong><br>${image.likes}</div>
        <div><strong>Views</strong><br>${image.views}</div>
        <div><strong>Comments</strong><br>${image.comments}</div>
        <div><strong>Downloads</strong><br>${image.downloads}</div>
      </div>
    </li>
  `;
};