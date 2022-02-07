const container = document.getElementById('container');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
let books;
const getItems = () => {
  if (localStorage.getItem('books') !== null) {
    books = JSON.parse(localStorage.getItem('books'));
  } else {
    localStorage.setItem('books', '[]');
    books = [];
  }
};

getItems();

function removeBook(e) {
  const bookContainer = e.currentTarget.parentNode;
  if (bookContainer.classList.contains('book-container')) {
    const index = Array.prototype.indexOf.call(
      container.children,
      bookContainer,
    );
    books.splice(index, index + 1);
    titleInput.value = '';
    authorInput.value = '';
    container.removeChild(bookContainer);
    e.stopPropagation();
    localStorage.setItem('books', JSON.stringify(books));
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
  localStorage.setItem('books', JSON.stringify(books));
}

addButton.addEventListener('click', addBook);
