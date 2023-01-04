// import { fetchCountries } from './js/fetchCountries';
import 'material-icons/iconfont/material-icons.css';
import '../node_modules/modern-normalize/modern-normalize.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './sass/index.scss';

Notify.init({});

const refs = {
  searchForm: document.querySelector('.search-form'),
  searchBox: document.querySelector('.search-box'),
  searchBtn: document.querySelector('.search-btn'),
};

const NOTIFY_SUCCESS = 'Hooray! We found totalHits images.';
const NOTIFY_FAILURE =
  'Sorry, there are no images matching your search query. Please try again.';
const NOTIFY_INFO =
  "We're sorry, but you've reached the end of search results.";

{
  // <div class="photo-card">
  //   <img src="" alt="" loading="lazy" />
  //   <div class="info">
  //     <p class="info-item">
  //       <b>Likes</b>
  //     </p>
  //     <p class="info-item">
  //       <b>Views</b>
  //     </p>
  //     <p class="info-item">
  //       <b>Comments</b>
  //     </p>
  //     <p class="info-item">
  //       <b>Downloads</b>
  //     </p>
  //   </div>
  // </div>;
}
