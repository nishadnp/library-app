
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

// Example calls to test the functionality
addBookToLibrary();
addBookToLibrary();
addBookToLibrary();