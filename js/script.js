
// Array to store all books in the library
const myLibrary = [];

// Constructor function to create a Book object
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

// Function to add the book to the library
function addBookToLibrary(title, author, pages) {   

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

// Show the dialog when the button is clicked
const dialog = document.querySelector('dialog');
newBookButton.addEventListener('click', () => dialog.showModal());

// Select the form inside the dialog
const bookForm = document.getElementById('get-book-details');

// Listen for form submission
bookForm.addEventListener('submit', e => {
    e.preventDefault(); // Prevent default page reload on submit

    // Collect input values from the form
    const bookTitle = document.getElementById('book-title').value;
    const bookAuthor = document.getElementById('book-author').value;
    const bookPages = document.getElementById('book-total-pages').value;

    // Add new book to the library
    addBookToLibrary(bookTitle, bookAuthor, bookPages);

    // Reset form fields and close dialog
    bookForm.reset();
    dialog.close();

    // Render the updated library
    renderLibrary();
});