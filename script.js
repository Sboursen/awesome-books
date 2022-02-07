let books;

const getItems = () => {
  console.log('33333333333333333333333333333');
  if (localStorage.getItem('books') !== null) {
    books = JSON.parse(localStorage.getItem('books'));
  } else {
    localStorage.setItem('books', '');
    books = [];
  }
};

getItems();

const storeItems = () => {
  localStorage.setItem('books', JSON.stringify(books));
};

const updateLocalStorage = (e) => {
  if (e.target.tagName === 'BUTTON') {
    storeItems();
    getItems();
  }
};

window.addEventListener('DOMContentLoaded', getItems);

window.addEventListener('click', updateLocalStorage);

// book =

const container = document.getElementById('container');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');

function displayBook(book, index) {
  const bookContainer = document.createElement('div');
  bookContainer.id = index;

  const text = document.createElement('p');
  text.innerHTML =
    `Title: ${book.title}<br>` +
    `Author: ${book.author}<br>`;
  bookContainer.append(text);

  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'Remove';
  removeButton.onclick = (e) => {
    removeBook(book, index);
  };
  bookContainer.append(removeButton);
  const breakline = document.createElement('hr');
  bookContainer.append(breakline);
  container.append(bookContainer);
}

books.forEach((book, index) => {
  displayBook(book, index);
});

function removeBook(book, index) {
  const bookContainer = document.getElementById(index);
  books.splice(index, index + 1);
  container.removeChild(bookContainer);
  titleInput.textContent = '';
  authorInput.textContent = '';
}

// add book
const addButton = document.querySelector('.add-book');
function addBook() {
  const book = {
    title: titleInput.value,
    author: authorInput.value,
  };
  books.push(book);
  displayBook(book, books.length - 1);
  titleInput.value = '';
  authorInput.value = '';
}

addButton.addEventListener('click', addBook);
