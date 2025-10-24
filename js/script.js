
// Array to store all books in the library
const myLibrary = [];

// Constructor function to create a Book object
function Book(id, title, author, pages) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
}

// Function to add the book to the library
function addBookToLibrary(title, author, pages) {   

    // Generate a unique ID for the new book (used for tracking/removal)
    const id = crypto.randomUUID();

    myLibrary.push(new Book(id, title, author, pages)); 
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

        // Set data-id as unique ID of the book
        theBook.dataset.id = book.id;

        // Create a remove button
        const removeBookButton = document.createElement('button');
        removeBookButton.type = "button";
        removeBookButton.classList.add('remove-book-btn');

        // Create elements to display the book details
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');

        // Set text content for each element
        removeBookButton.textContent = 'X';
        bookTitle.textContent = `Title: ${book.title}`;
        bookAuthor.textContent = `Author: ${book.author}`;
        bookPages.textContent = `Pages: ${book.pages}`;

        // Append the remove button and details to the book container
        theBook.appendChild(removeBookButton);
        theBook.appendChild(bookTitle);
        theBook.appendChild(bookAuthor);
        theBook.appendChild(bookPages);

        // Append the book container to the main section of the body
        main.appendChild(theBook);
    }
}

// Function to remove the book from the library
function removeBook(uniqueID) {
    
    // Find the index of the book that matches given unique ID
    const bookIndex = myLibrary.findIndex(book => book.id === uniqueID);

    // If found, remove the book and render the newly updated library
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        renderLibrary();
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

    renderLibrary();    // Render the updated library
});

// Use event delegation to handle clicks on dynamically created "Remove" buttons
document.body.addEventListener('click', e => {
    // Check if the clicked button is a remove button
    if (e.target.classList.contains('remove-book-btn')) {
        // Get the book's unique ID from its parent element
        const bookId = e.target.parentElement.dataset.id;
        // Remove the corresponding book from the library
        removeBook(bookId);
    }
});