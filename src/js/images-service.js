import axios from 'axios';

export default class ImagesApiService {
  constructor() {
    this.searchQquery = '';
    this.page = 1;
  }

  async fetchImages() {
    const URL = `https://pixabay.com/api/?q=${this.searchQquery}`;

    const options = {
      params: {
        key: '32612520-8855a8bf59320f9a880e30168',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        pretty: 'true',
        page: this.page,
        per_page: 40,
      },
    };

    try {
      const response = await axios.get(URL, options);
      this.incrementPageCount();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPageCount() {
    this.page += 1;
  }

  resetPageCount() {
    this.page = 1;
  }

  get query() {
    return this.searchQquery;
  }
  set query(newQuery) {
    this.searchQquery = newQuery;
  }
}
