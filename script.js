/* eslint-disable max-classes-per-file */
// navbar
const navbarContainer = document.getElementById(
  'date-container',
);

const date = new Date();
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

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

const dateString = `${
  months[date.getMonth()]
} ${date.getDate()}${dateExtension(date)}
  ${date.getFullYear()}, ${
  date.toUTCString().split(' ')[4]
} `;
navbarContainer.append(dateString);

let books;

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UserInterface {
  static container = document.getElementById('home');

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
    const removeButtonContainer =
      document.createElement('td');

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
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

// ||| Hide and show mobile menu

const MEDIA_BREAKPOINT = 768;
const mobileMenuButton = document.querySelector(
  'button.mobile-menu-button',
);
const mobileMenuList = document.querySelectorAll(
  '.mobile-menu .page-navigation button',
);
const mobileMenu = document.querySelector(
  'div.mobile-menu',
);

const cancelMobileMenu = document.querySelector(
  '.mobile-menu .cancel',
);

function showMobileMenu(e) {
  if (
    e.currentTarget.classList.contains('mobile-menu-button')
  ) {
    mobileMenu.style.display = 'flex';
    mobileMenu.style['z-index'] = 2;
    document.body.style.overflowY = 'hidden';
  }
}

function hideMobileMenu(e) {
  if (e.currentTarget.classList.contains('cancel')) {
    mobileMenu.style.display = 'none';
    mobileMenu.style['z-index'] = -2;
    document.body.style.overflowY = 'scroll';
  } else if (
    e.currentTarget.parentNode.parentNode.classList.contains(
      'page-navigation',
    )
  ) {
    mobileMenu.style.display = 'none';
    mobileMenu.style['z-index'] = -2;
    document.body.style.overflowY = 'scroll';

    // hide and show sections
    const contactSection =
      document.getElementById('contact');
    const addNewSection =
      document.getElementById('add-new');
    const homeSection = document.getElementById('home');
    console.log(e.currentTarget.className);
    switch (e.currentTarget.className) {
      case 'li':
        contactSection.style.display = 'none';
        addNewSection.style.display = 'none';
        homeSection.style.display = 'block';
        break;
      case 'add-n':
        contactSection.style.display = 'none';
        addNewSection.style.display = 'block';
        homeSection.style.display = 'none';
        break;
      case 'con':
        contactSection.style.display = 'block';
        addNewSection.style.display = 'none';
        homeSection.style.display = 'none';
        break;
      default:
        contactSection.style.display = 'none';
        addNewSection.style.display = 'none';
        homeSection.style.display = 'none';
    }
  }
}

function hideMobileMenuOnEvent(e) {
  if (mobileMenu.style.display !== 'none') {
    if (e.type === 'resize') {
      if (window.innerWidth > MEDIA_BREAKPOINT) {
        mobileMenu.style.display = 'none';
        mobileMenu.style['z-index'] = -2;
        document.body.style.overflowY = 'scroll';
      }
    } else {
      mobileMenu.style.display = 'none';
      mobileMenu.style['z-index'] = -2;
      document.body.style.overflowY = 'scroll';
    }
  }
}

mobileMenuButton.addEventListener('click', showMobileMenu);
cancelMobileMenu.addEventListener('click', hideMobileMenu);
mobileMenuList.forEach((node) =>
  node.addEventListener('click', hideMobileMenu),
);
window.addEventListener('resize', hideMobileMenuOnEvent);
