import '../scss/main.scss';

// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

/* place your code below */

const inputTitle = document.querySelector(".form__input--title");
const inputText = document.querySelector(".form__input--text");
const buttonSave = document.querySelector(".button--save");
const buttonLoad = document.querySelector(".button--load");
const buttonLoadInfo = document.querySelector(".button__info");
const storageWrapper = document.querySelector(".storage");
const noteList = document.querySelector(".storage__list");



let storage = [];


const notesInfoReload = () => {
    if (storage.length > 0) {
        buttonLoadInfo.style.display = "block";
        buttonLoad.disabled = false;
    }
    buttonLoadInfo.textContent = storage.length;
}


const clearInputs = () => {
    inputTitle.value = "";
    inputText.value = "";
}


buttonSave.addEventListener('click', (e) => {
    e.preventDefault();
    const note = {
        title: inputTitle.value,
        text: inputText.value,
    }
    if (inputTitle.value && inputText.value) storage.push(note);
    else alert('Wypełnij pola');
    localStorage.setItem("notes", JSON.stringify(storage));
    clearInputs();
    notesInfoReload();
})


buttonLoad.addEventListener('click', (e) => {
    e.preventDefault();
    storageWrapper.style.display = "block";
    storage = JSON.parse(localStorage.getItem('notes'));
    if (noteList) {
        noteList.innerHTML = "";
    };
    storage.forEach(note => {
        const savedNote = document.createElement("li");
        noteList.appendChild(savedNote);
        savedNote.classList.add("storage__saved-note");
        savedNote.innerHTML = note.title;
    });
})


storageWrapper.addEventListener("click", (e) => {
    let index;
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].title == e.target.textContent) {
            index = i;
        }
    }
    inputTitle.value = storage[index].title;
    inputText.value = storage[index].text;
})