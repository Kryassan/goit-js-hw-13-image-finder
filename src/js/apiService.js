

const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '24111735-71382debc5ec968c97367f2d4';


export default function fetchPhoto(searchQuery, pageNumber) {
  return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${MY_KEY}`,
  );
}











