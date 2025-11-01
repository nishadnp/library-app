
// Array to store all book objects in the library (includes sample books)
const myLibrary = [new Book('0b875c72-b8dc-4bfc-852f-5c145ddd6919', 'Atomic Habits', 
    'James Clear', '320', true), 
    new Book('9b4d4233-4654-45a7-8fc0-8a5eb982c455', 'Harry Porter', 
    'J.K. Rowling', '4100', false), 
    new Book('70989918-0747-482d-8502-7b7060de964c', 'The Arabian Nights', 
    'Various Authors', '2700', true),
    new Book('78cd9366-43b5-4259-8931-d93bbac84884', 'The Chronicles of Narnia', 
    'C.S. Lewis', '1625', false)];

// Constructor function to create a Book object
function Book(id, title, author, pages, readStatus) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.toggleRead = function() {
    this.readStatus = !this.readStatus;
};

// Function to add the book to the library
function addBookToLibrary(title, author, pages, readStatus) {   

    // Generate a unique ID for the new book (used for tracking/removal)
    const id = crypto.randomUUID();

    myLibrary.push(new Book(id, title, author, pages, readStatus)); 
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
        theBook.classList.add('the-book');

        // Set data-id as unique ID of the book
        theBook.dataset.id = book.id;

        // Create a remove button
        const removeBookButton = document.createElement('button');
        removeBookButton.type = 'button';
        removeBookButton.classList.add('remove-book-btn');
        removeBookButton.textContent = "✕";

        // Create a read button
        const readBookButton = document.createElement('button');
        readBookButton.type = 'button';
        readBookButton.classList.add('read-book-btn');
        
        // Change the read button color according to book read status
        if (book.readStatus) { 
            readBookButton.style.backgroundColor = '#007bff';
            readBookButton.textContent = "Read";
        }
        else {
            readBookButton.style.backgroundColor = '#d9534f';
            readBookButton.textContent = "Unread";
        }
        
        // Create elements to display the book details
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');

        // Helper function to create and return a label span
        const makeLabel = labelText => {
            const labelSpan = document.createElement('span');
            labelSpan.classList.add('book-label');
            labelSpan.textContent = labelText;
            return labelSpan;
        }

        // Append labels and text content
        bookTitle.append(makeLabel('Title:'), ` ${book.title}`);
        bookAuthor.append(makeLabel('Author:'), ` ${book.author}`);
        bookPages.append(makeLabel('Pages:'), ` ${book.pages}`);

        // Append all elements to the book container
        theBook.append(removeBookButton, bookTitle, bookAuthor, bookPages, readBookButton);

        // Append the book container to the main section
        main.appendChild(theBook);
    }
}

// Function to remove the book from the library
function removeBook(uniqueID) {
    
    // Find the index of the book that matches given unique ID
    const bookIndex = myLibrary.findIndex(book => book.id === uniqueID);

    // If found, remove the book from the library
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
    } 
}

// Function to toggle the read status of the book
function toggleReadStatus(uniqueID) {

    // Find the book by matching it's unique ID
    const book = myLibrary.find(book => book.id === uniqueID);

    // Toggle the read status
    if(book) {
        book.toggleRead();
    }
}

// Select the `New Book` button
const newBookButton = document.getElementById('new-book-btn');
// Select the dialog element
const dialog = document.querySelector('dialog');

// Show the dialog when the 'New Book' button is clicked
newBookButton.addEventListener('click', () => dialog.showModal());

// Handle form button clicks within the dialog
dialog.addEventListener('click', e => {

    // Select the form inside the dialog
    const bookForm = document.getElementById('get-book-details');

    // If the 'Submit' button is clicked, 
    if (e.target.id === 'form-submit-btn') {

        e.preventDefault(); // Prevent default form submission (page reload)

        // Run built-in HTML5 validation manually
        if (!bookForm.checkValidity()) {
            bookForm.reportValidity();
            return; // stop here validation fails
        }

        // Retrieve input values from the form fields
        const bookTitle = document.getElementById('book-title').value;
        const bookAuthor = document.getElementById('book-author').value;
        const bookPages = document.getElementById('book-total-pages').value;
        const bookReadStatus = document.getElementById('book-read-status').checked;

        // Add new book to the library
        addBookToLibrary(bookTitle, bookAuthor, bookPages, bookReadStatus);

        // Reset form fields and close the dialog after adding the book
        bookForm.reset();
        dialog.close();

        // Re-render the library to include newly added book
        renderLibrary();
    }

    // If the 'Cancel' button is clicked, 
    if (e.target.id === 'form-cancel-btn') {
        // Clear the form inputs and close the dialog without saving
        bookForm.reset();
        dialog.close();
    }
});

// Use event delegation to handle clicks on dynamically created "Remove" buttons
const bookSection = document.getElementById('main');
bookSection.addEventListener('click', e => {
    // Get the book's unique ID from its parent element
    const bookId = e.target.parentElement.dataset.id;

    // Check if the clicked button is remove button of a book
    if (e.target.classList.contains('remove-book-btn')) {
        // Remove the corresponding book from the library
        removeBook(bookId);
    }

    // Check if the clicked button is read button of a book
    if (e.target.classList.contains('read-book-btn')) {
        // Call the function to toggle read status of the book
        toggleReadStatus(bookId);
    }

    renderLibrary();
});

// Initial render of library on page load
renderLibrary();