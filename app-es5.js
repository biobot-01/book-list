// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('bookList');
  // Create tr element
  const tableRow = document.createElement('tr');
  // Insert cols
  tableRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><button class="delete" type="button"></td>`;
  
  list.appendChild(tableRow);
}

// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event listeners
document.getElementById('bookForm').addEventListener('submit', function(e) {
  // Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate ui
  const ui = new UI();
  // Add book to list
  ui.addBookToList(book);
  // Clear form fields
  ui.clearFields();

  e.preventDefault();
});