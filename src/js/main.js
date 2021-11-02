
import template from '../template/image_card.hbs';
import '../sass/main.scss';
import apiService from './apiService.js';
import refs from './refs.js';
import debounce from 'lodash.debounce';

const { inputEl, cardGallery, btnLoadMore } = refs;

inputEl.addEventListener('input', debounce(getCards, 500));
btnLoadMore.addEventListener('click', getMoreCards);

let pageNumber = 1;
let searchValue = '';

async function useApiService() {
  let res = await apiService(searchValue, pageNumber);
  let card = await res.json();
  const cardList = card.hits.map(template).join('');
  cardGallery.insertAdjacentHTML('beforeend', cardList);
};

function getCards(e) {
  localStorage.setItem('cardName', e.target.value);
  cardGallery.innerHTML = '';
  searchValue = e.target.value;
  pageNumber = 1;

  if (e.target.value.length > 0) {
    useApiService();
    btnLoadMore.classList.remove('is_hidden');
  } else {
    btnLoadMore.classList.add('is_hidden');
  };
};

function getMoreCards(e) {
  e.preventDefault();
  pageNumber++;
  useApiService();
};

let localStorageSave = localStorage.getItem('cardName');
if (localStorageSave !== undefined) {
  getCards({ target: { value: localStorageSave } });
  inputEl.value = localStorageSave;
}

