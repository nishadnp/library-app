
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
    
    // Create book and add to library
    myLibrary.push(new Book(title, author, pages)); 
}

// Function to render all the books in library on the page
function renderLibrary() {

    const main = document.getElementById('main')

    // Clear the existing books
    main.innerHTML = '';

    // Render books from myLibrary[]
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

        // Append the book container to the main section of the body
        main.appendChild(theBook);
    }
}

// Listen for clicks on the 'New Book' button
const newBookButton = document.getElementById('new-book-btn');
newBookButton.addEventListener('click', () => {
    addBookToLibrary(); // Collect book data from the user
    renderLibrary();    // Update the DOM to show all books
});