import './sass/main.scss';
import debounce from 'lodash.debounce';
import { notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import listPictures from './partials/list_pictures.hbs';
import { getAPI } from './js/apiService.js'

const refs = {
    input: document.querySelector('input'),
    gallery: document.querySelectorAll('.gallery'),
    loadMoreBtn: document.querySelectorAll('.button-load-more')
};

let page = 1;

refs.input.addEventListener("input", debounce(onSearch, 500));
// refs.loadMoreBtn.addEventListener('click', onLoadMore())



function onSearch(e) {
    const searchQuery = refs.input.value.trim();
    
    if (searchQuery.length === 0) {
    refs.gallery.innerHTML = "";
    document.body.style.overflow = "hidden";
    return;
  }

  refs.gallery.innerHTML = "";
  page = 1;
  document.body.style.overflow = "auto";
  onFetchHandler(searchQuery, page);
};

function addCollection(res) {
    const picturesMarkup = listPictures(res.hits);
    refs.gallery.innerHTML = picturesMarkup;
    console.log(res.hits)
};

async function onFetchHandler(query, page) {

    const getPictures = await getAPI(query, page);
    addCollection(getPictures);

    if (getPictures.hits.length === 0) {
      notice({
        text: "No more images to fetch",
        delay: 2000,
      });
      return;
    }
}

function onLoadMore(e) {

};