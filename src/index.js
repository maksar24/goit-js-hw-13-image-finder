import './sass/main.scss';
import debounce from 'lodash.debounce';
import { notice  } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import listPictures from './partials/list_pictures.hbs';


const options = {
    headers: {
        Authorization: '',
    },
}
const url =
    'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ'

fetch(url, options)
    .then(res => res.json())
    .then(console.log(res))