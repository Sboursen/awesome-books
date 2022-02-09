/* eslint-disable max-classes-per-file */
// navbar
const navbarContainer = document.getElementById('navbar-container');
const projectTitle = document.createElement('p');
projectTitle.innerHTML = 'Awesome Books';
const linksContainer = document.createElement('div');
const listLink = document.createElement('button');
const addLink = document.createElement('button');
const contactLink = document.createElement('button');

//
const date = new Date();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const month = months[date.getMonth()];
const dateExtension = (date) => {
  let extension = '';
  switch (date.getDate()) {
    case 3:
      extension = 'rd';
      break;
    case 2:
      extension = 'nd';
      break;
    case 1:
      extension = 'st';
      break;
    default:
      extension = 'th';
  }
  return extension;
};

const dateString = `${month} ${date.getDate()}${dateExtension(date)}  ${date.getFullYear()}, ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getHours() > 12 ? 'pm' : 'am'} `;
navbarContainer.append(dateString);
let books;

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

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
    text.innerHTML = `"${book.title}" by ${book.author}`;

    bookContainer.append(text);
    const removeButtonContainer = document.createElement('td');

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = "<i class='fas fa-trash-alt'></i> Remove";

    removeButton.onclick = () => {
      UserInterface.removeBook(book, index);
    };
    removeButtonContainer.append(removeButton);
    bookContainer.append(removeButtonContainer);
    UserInterface.container.appendChild(bookContainer);
  }
}

function populateContainer() {
  if (localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
    books.forEach((book, index) => {
      UserInterface.displayBook(book, index);
    });
  } else {
    localStorage.setItem('books', '');
    books = [];
  }
}

populateContainer();

UserInterface.addButton.addEventListener(
  'click',
  UserInterface.addBook,
);
