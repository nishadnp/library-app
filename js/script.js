
// Array to store all books in the library
const myLibrary = [];

// Constructor function to create a Book object
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

// Function to prompt user for book details and add it to the library
function addBookToLibrary() {
    const title = prompt("Title: ");
    const author = prompt("Author: ");
    const pages = prompt("Total Pages: ");
    
    myLibrary.push(new Book(title, author, pages)); // Create book and add to library
}

// Function to render all the books in library on the page
function renderLibrary() {
    for (let book of myLibrary) {

        // Create a container element for the book
        const theBook = document.createElement('article');

        // Create elements to display the book details
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');

        // Set text content for each element
        bookTitle.textContent = `Title: ${book.title}`;
        bookAuthor.textContent = `Author: ${book.author}`;
        bookPages.textContent = `Pages: ${book.pages}`;

        // Append the details to the book container
        theBook.appendChild(bookTitle);
        theBook.appendChild(bookAuthor);
        theBook.appendChild(bookPages);

        // Append the book container to the body
        document.body.appendChild(theBook);
    }
}

// Example calls to test the functionality
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();

renderLibrary();