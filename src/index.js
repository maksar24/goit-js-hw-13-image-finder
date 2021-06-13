import './sass/main.scss';
import debounce from 'lodash.debounce';
import { notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import listPictures from './partials/list_pictures.hbs';
import { getAPI } from './js/apiService.js';
const basicLightbox = require('basiclightbox');
import './../node_modules/basiclightbox/dist/basicLightbox.min.css';

const refs = {
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
    sentinel: document.querySelector('.observer'),
};

let page = 0;

const options = {
  rootMargin: '100px'
};

refs.input.addEventListener("input", debounce(onSearch, 500));
refs.gallery.addEventListener("click", onClick);

const observer = new IntersectionObserver(onEntry, options);

function onSearch(e) {
    const searchQuery = refs.input.value.trim();
    
    if (searchQuery.length === 0) {
    refs.gallery.innerHTML = "";
    document.body.style.overflow = "hidden";
    observer.unobserve(refs.sentinel);
    return;
  }

  refs.gallery.innerHTML = "";
  page = 1;
  document.body.style.overflow = "auto";
  onFetchHandler(searchQuery, page);
  observer.observe(refs.sentinel);
};

function addCollection(res) {
  refs.gallery.insertAdjacentHTML("beforeend", listPictures(res));
};

function onEntry() {
  const searchQuery = refs.input.value.trim();
  page += 1;
  onFetchHandler(searchQuery, page);
}

async function onFetchHandler(query, page) {
    const getPictures = await getAPI(query, page);
    addCollection(getPictures);

    if (getPictures.hits.length === 0) {
      notice({
        text: "No more images to fetch",
        delay: 2000,
      });
      return;
    };
};

function onClick(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(`<img src="${e.target.dataset.large}" alt="${e.target.alt}">`);

  instance.show();
  console.log(e.target.dataset.large)
};
