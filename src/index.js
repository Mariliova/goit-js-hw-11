// import { fetchCountries } from './js/fetchCountries';
import 'material-icons/iconfont/material-icons.css';
import '../node_modules/modern-normalize/modern-normalize.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';

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
  /* <li class="card">
  <img class="card__img" src="" alt="" />
  <ul class="card__description list">
    <li>
      <p class="cards__label"></p>
      <p class="cards__number"></p>
    </li>
    <li>
      <p class="cards__label"></p>
      <p class="cards__number"></p>
    </li>
    <li>
      <p class="cards__label"></p>
      <p class="cards__number"></p>
    </li>
    <li>
      <p class="cards__label"></p>
      <p class="cards__number"></p>
    </li>
  </ul>
</li>; */
}
