let books = JSON.parse(localStorage.getItem('books')) || [];


let container = document.getElementById('container');

books.map((book, index) => {
  displayBook(book, index);
});

function displayBook(book, index) {
  let bookContainer = document.createElement('div');
  bookContainer.id = index;

  let text = document.createElement('p');
  text.innerHTML =
    'Title: ' +
    book.title +
    '<br>' +
    'Author: ' +
    book.author +
    '<br>';
  bookContainer.append(text);

  let removeButton = document.createElement('button');
  removeButton.innerHTML = 'Remove';
  removeButton.onclick = (e) => {
    removeBook(book, index);
  };
  bookContainer.append(removeButton);
  let breakline = document.createElement('hr');
  bookContainer.append(breakline);
  container.append(bookContainer);
}

function removeBook(book, index) {
  let bookContainer = document.getElementById(index);
  books = books.filter((el, i) => el !== book);
  localStorage.setItem('books', JSON.stringify(books));
  container.removeChild(bookContainer);
}

// add book
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const addButton = document.querySelector('.add-book');

function addBook() {
  const book = {
    title: titleInput.value,
    author: authorInput.value,
  };
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));


  document.querySelector('#author').value = "";
  document.querySelector('#title').value = "";
  displayBook(book, books.length - 1);

}

addButton.addEventListener('click', addBook);
