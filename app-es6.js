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

  }

  deleteBook(target) {

  }

  clearFields() {

  }
}