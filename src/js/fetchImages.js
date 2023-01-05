import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

const options = {
  params: {
    key: '32612520-8855a8bf59320f9a880e30168',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    pretty: 'true',
    page: 1,
    per_page: 40,
  },
};

export const fetchImages = async query => {
  const URL = `${BASE_URL}?q=${query}`;

  try {
    const response = await axios.get(URL, options);
    return response;
  } catch (error) {
    console.error(error);
  }
};
