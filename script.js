/* eslint-disable max-classes-per-file */

let books = JSON.parse(localStorage.getItem('books')) || [];

// |||book class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// |||user interface interactions
class UserInterface {
  static container = document.getElementById('container');

  static titleInput = document.querySelector('#title');

  static authorInput = document.querySelector('#author');

  static addButton = document.querySelector('.add-book');

  static addBook() {
    const book = new Book(
      UserInterface.titleInput.value,
      UserInterface.authorInput.value,
    );
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

    UserInterface.titleInput.value = '';
    UserInterface.authorInput.value = '';
    UserInterface.displayBook(book, books.length - 1);
  }

  static removeBook(book, index) {
    const bookContainer = document.getElementById(index);
    books = books.filter((el) => el !== book);
    localStorage.setItem('books', JSON.stringify(books));
    UserInterface.container.removeChild(bookContainer);
  }

  static displayBook(book, index) {
    const bookContainer = document.createElement('tr');
    bookContainer.id = index;
    const text = document.createElement('td');
    text.innerHTML = `${book.title} by ${book.author}`;

    bookContainer.append(text);
    const removeButtonContainer =
      document.createElement('td');

    const removeButton = document.createElement('button');
    removeButton.classList.add('button-table');
    removeButton.innerHTML =
      "<i class='fas fa-trash-alt'></i> Remove";

    removeButton.onclick = () => {
      UserInterface.removeBook(book, index);
    };
    removeButtonContainer.append(removeButton);
    bookContainer.append(removeButtonContainer);
    UserInterface.container.appendChild(bookContainer);
  }
}

// |||Events -----------------------------------------

// populate the local storage items

books.forEach((book, index) => {
  const bookContainer = UserInterface.displayBook(
    book,
    index,
  );
  UserInterface.container.appendChild(bookContainer);
});

// add ba book when button is clicked
UserInterface.addButton.addEventListener(
  'click',
  UserInterface.addBook,
);

// |||Contact form validation

/*
let books = JSON.parse(localStorage.getItem('books')) || [];
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const addButton = document.querySelector('.add-book');
const container = document.getElementById('container');

function removeBook(book, index) {
  const bookContainer = document.getElementById(index);
  books = books.filter((el) => el !== book);
  localStorage.setItem('books', JSON.stringify(books));
  container.removeChild(bookContainer);
}

function displayBook(book, index) {
  const bookContainer = document.createElement('div');
  bookContainer.id = index;

  const text = document.createElement('p');
  text.innerHTML = `Title: ${book.title}<br>`
    + `Author: ${book.author}<br>`;
  bookContainer.append(text);

  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'Remove';
  removeButton.onclick = () => {
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

function addBook() {
  const book = {
    title: titleInput.value,
    author: authorInput.value,
  };
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));

  document.querySelector('#author').value = '';
  document.querySelector('#title').value = '';
  displayBook(book, books.length - 1);
}

addButton.addEventListener('click', addBook);
*/
