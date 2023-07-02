import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '36382729-c052200aae6cb40748bb0f135';
const API_URL = 'https://pixabay.com/api/';

export async function fetchImages(searchTerm, currentPage) {
  try {
    const config = {
      params: {
        key: API_KEY,
        q: searchTerm,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: currentPage,
      },
    };

    const response = await axios.get(API_URL, config);
    if (response.data.hits.length === 0) throw new Error();

    return response.data.hits;
  } catch (error) {
    throw Notiflix.Notify.error(
      'Niestety nie znaleziono żadnych wyników wyszukania.'
    );
  }
}
