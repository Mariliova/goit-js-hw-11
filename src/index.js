import ImagesApiService from './js/images-service';
import renderCards from './js/render-cards';
import PageInterface from './js/page-interface';
import NotifyApi from './js/notify-service';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'material-icons/iconfont/material-icons.css';
import './sass/index.scss';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const imagesApiService = new ImagesApiService();
const pageInterface = new PageInterface();
const notifyApi = new NotifyApi();
let lightbox = new SimpleLightbox('.gallery .gallery__item', {
  captionsData: 'alt',
  captionDelay: 250,
});

pageInterface.hide(refs.loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onSearchFormSubmit(e) {
  e.preventDefault();
  pageInterface.reset(refs.gallery);
  pageInterface.hide(refs.loadMoreBtn);

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;
  imagesApiService.resetPageCount();
  imagesApiService.imagesLoadedCount = 0;
  imagesApiService.fetchImages().then(markup);
}

function onLoadMoreBtnClick() {
  imagesApiService.fetchImages().then(markup);
}

function markup({ data: { hits: imgArr, totalHits: limit } }) {
  const numberOfImages = imgArr.length;

  if (numberOfImages <= 0) {
    notifyApi.failure();
    pageInterface.hide(refs.loadMoreBtn);
    return;
  }

  renderCards(imgArr, refs.gallery);
  lightbox.refresh();
  imagesApiService.imagesLoadedCount = numberOfImages;

  if (imagesApiService.imagesLoadedCount === imagesApiService.perPage) {
    notifyApi.success(limit);
  }

  if (imagesApiService.imagesLoadedCount >= limit) {
    notifyApi.info();
    pageInterface.hide(refs.loadMoreBtn);
    return;
  }

  pageInterface.show(refs.loadMoreBtn);
}
