class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('bookList');
    // Create tr element
    const tableRow = document.createElement('tr');
    // Insert data into table
    tableRow.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><button class="delete" type="button"></td>`;
    
    list.appendChild(tableRow);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `notification ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const column = document.querySelector('.column');
    // Get form
    const form = document.getElementById('bookForm');
    // Insert alert
    column.insertBefore(div, form);
    // Timeout after 3 secs
    setTimeout(function() {
      document.querySelector('.notification').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local storage class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(book => {
      const ui = new UI();
      // Add book to ui
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event listener for add book
document.getElementById('bookForm').addEventListener('submit', function(e) {
  // Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate ui
  const ui = new UI();
  // Validate form inputs
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'is-danger');
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Add to local storage
    Store.addBook(book);
    // Success alert
    ui.showAlert('Book Added!', 'is-success');
    // Clear form fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete book
document.getElementById('bookList').addEventListener('click', function(e) {
  // Instantiate ui
  const ui = new UI();
  // Delete book from ui
  ui.deleteBook(e.target);
  // Remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Show alert
  ui.showAlert('Book Removed!', 'is-warning');
  e.preventDefault();
});