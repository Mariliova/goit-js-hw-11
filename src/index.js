import { fetchImages } from './js/fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'material-icons/iconfont/material-icons.css';
import './sass/index.scss';

Notify.init({});

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const NOTIFY_SUCCESS = 'Hooray! We found totalHits images.';
const NOTIFY_FAILURE =
  'Sorry, there are no images matching your search query. Please try again.';
const NOTIFY_INFO =
  "We're sorry, but you've reached the end of search results.";

refs.loadMoreBtn.classList.add('visually-hidden');
refs.searchForm.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
  e.preventDefault();
  const query = e.currentTarget.elements.searchQuery.value;
  resetPage();

  fetchImages(query)
    .then(markup)
    .catch(() => {
      // ивкоеується навідь якщо повернувся порожній масив
      // Notify.failure(NOTIFY_FAILURE);
      // resetPage();???
    });
}

function markup({ data: { hits } }) {
  const hitsLength = hits.length;
  console.log(hitsLength);
  if (hitsLength <= 0) {
    Notify.failure(NOTIFY_FAILURE);
    return;
  }
  Notify.success(NOTIFY_SUCCESS);
  renderCards(hits);
}

function renderCards(hits) {
  const cardsMarkup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags: alt,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
    <img src="${webformatURL}" alt="${alt}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
  </div>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', cardsMarkup);
}

function resetPage() {
  refs.gallery.innerHTML = '';
}
