import ImagesApiService from './js/images-service';
import PageInterface from './js/page-interface';
import NotifyApi from './js/notify-service';
import SimpleLightbox from 'simplelightbox';
import InfiniteScroll from 'infinite-scroll';
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

// let infScroll = new InfiniteScroll(refs.gallery, {
//   path: onLoadMoreBtnClick,

//   append: '.gallery__item',
//   // REQUIRED for appending content
//   // Appends selected elements from loaded page to the container
// });

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
  imagesApiService.reseLoadedImagesCount();
  imagesApiService.fetchImages().then(loadInterface);
}

function onLoadMoreBtnClick() {
  imagesApiService.fetchImages().then(loadInterface);
}

function loadInterface({ data: { hits, totalHits } }) {
  const numberOfImages = hits.length;
  const numberOfLoadedImages = imagesApiService.loadedImagesCount;

  if (numberOfImages <= 0) {
    notifyApi.failure();
    pageInterface.hide(refs.loadMoreBtn);
    return;
  }

  pageInterface.renderCards(hits, refs.gallery);
  lightbox.refresh();

  if (numberOfLoadedImages === 0) {
    notifyApi.success(totalHits);
  }

  imagesApiService.loadedImagesCount = numberOfImages;

  if (numberOfLoadedImages > 0) {
    smoothScroll(refs.gallery);
  }

  if (numberOfLoadedImages >= totalHits) {
    notifyApi.info();
    pageInterface.hide(refs.loadMoreBtn);
    return;
  }

  pageInterface.show(refs.loadMoreBtn);
}

function smoothScroll(element) {
  const { height: cardHeight } =
    element.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
