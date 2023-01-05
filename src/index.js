import ImagesApiService from './js/images-service';
import renderCards from './js/render-cards';
import PageInterface from './js/page-interface';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'material-icons/iconfont/material-icons.css';
import './sass/index.scss';

Notify.init({});

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const imagesApiService = new ImagesApiService();
const pageInterface = new PageInterface();
let imagesLoaded = 0;

const NOTIFY = {
  SUCCESS: 'Hooray! We found totalHits images.',
  FAILURE:
    'Sorry, there are no images matching your search query. Please try again.',
  INFO: "We're sorry, but you've reached the end of search results.",
};

pageInterface.hide(refs.loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onSearchFormSubmit(e) {
  e.preventDefault();
  pageInterface.reset(refs.gallery);
  pageInterface.hide(refs.loadMoreBtn);

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;
  imagesApiService.resetPageCount();
  imagesApiService.fetchImages().then(markup);
}

function onLoadMoreBtnClick() {
  imagesApiService.fetchImages().then(markup);
}

function markup({ data: { hits: imgArr, totalHits: limit } }) {
  const imgArrLength = imgArr.length;

  if (imgArrLength <= 0) {
    Notify.failure(NOTIFY.FAILURE);
    pageInterface.hide(refs.loadMoreBtn);
    return;
  }

  renderCards(imgArr, refs.gallery);
  Notify.success(NOTIFY.SUCCESS);
  imagesLoaded += imgArrLength;

  if (imagesLoaded >= limit) {
    Notify.info(NOTIFY.INFO);
    pageInterface.hide(refs.loadMoreBtn);
    return;
  }

  pageInterface.show(refs.loadMoreBtn);
}
