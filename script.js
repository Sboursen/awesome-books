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
