import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({});

export default class NotifyApi {
  success(limit) {
    const message = `Hooray! We found ${limit} images.`;
    Notify.success(message);
  }

  failure() {
    const message =
      'Sorry, there are no images matching your search query. Please try again.';
    Notify.failure(message);
  }

  info() {
    const message =
      "We're sorry, but you've reached the end of search results.";
    Notify.info(message);
  }
}
