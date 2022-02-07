let books;
const container = document.getElementById('container');

// = [
//   { title: '1', author: '1' },
//   { title: '2', author: '2' },
//   { title: '3', author: '3' },
//   { title: '4', author: '4' },
// ];

const getItems = () => {
  if (localStorage.getItem('books') !== null) {
    books = JSON.parse(localStorage.getItem('books'));
  } else {
    localStorage.setItem('books', '[]');
    books = [];
  }
};

getItems();

const storeItems = () => {
  localStorage.setItem('books', JSON.stringify(books));
};

const updateLocalStorage = (e) => {
  if (e.currentTarget.classList.contains('book-container'))
    console.log('hey');
  storeItems();
};

window.addEventListener('DOMContentLoaded', getItems);

container.addEventListener('click', updateLocalStorage);

// book =

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');

function removeBook(e) {
  let bookContainer = e.currentTarget.parentNode;
  if (bookContainer.classList.contains('book-container')) {
    let index = Array.prototype.indexOf.call(
      container.children,
      bookContainer,
    );
    books.splice(index, index + 1);
    titleInput.value = '';
    authorInput.value = '';
    container.removeChild(bookContainer);
    e.stopPropagation();
  }
}

function displayBook(book) {
  const bookContainer = document.createElement('div');
  bookContainer.classList.add('book-container');
  const text = document.createElement('p');
  text.innerHTML = `Title: ${book.title} <br> Author: ${book.author} <br>`;
  bookContainer.appendChild(text);

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';

  removeButton.addEventListener('click', removeBook);

  bookContainer.append(removeButton);
  const breakLine = document.createElement('hr');
  bookContainer.append(breakLine);
  container.appendChild(bookContainer);
}

books.forEach((book) => {
  displayBook(book);
});

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
