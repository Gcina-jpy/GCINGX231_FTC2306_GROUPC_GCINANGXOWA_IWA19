import {
    books,
    authors,
    genres,
    BOOKS_PER_PAGE
  } from './data.js';
  
  let page = 1;
  let matches = books;
  
  // Function to create a book preview 
  function createBookPreview({ author, id, image, title }) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);
  
    element.innerHTML = `
      <img
        class="preview__image"
        src="${image}"
      />
  
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;
  




    
    return element;
  }
  
  // Function to update the book list with a set of matches
  function updateBookList(matches) {
    const bookList = document.querySelector('[data-list-items]');
    bookList.innerHTML = '';
  
    const fragment = document.createDocumentFragment();
    const startIndex = (page - 1) * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;
  
    for (const book of matches.slice(startIndex, endIndex)) {
      const element = createBookPreview(book);
      fragment.appendChild(element);
    }
  
    bookList.appendChild(fragment);
  }
  
  // Function to update the "Show more" button
  function updateShowMoreButton() {
    const remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
    const showMoreButton = document.querySelector('[data-list-button]');
    showMoreButton.disabled = remainingBooks <= 0;
    showMoreButton.innerText = `Show more (${Math.max(0, remainingBooks)})`;
  }



  
  // Function to handle form submission for filtering books
  function handleSearchFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
  
    const result = books.filter((book) => {
      const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);
      const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
      const authorMatch = filters.author === 'any' || book.author === filters.author;
      return genreMatch && titleMatch && authorMatch;
    });
  
    page = 1;
    matches = result;
    updateBookList(matches);
    updateShowMoreButton();
  }
  
  // Add event listeners
  document.querySelector('[data-search-form]').addEventListener('submit', handleSearchFormSubmit);
  document.querySelector('[data-list-button]').addEventListener('click', () => {
    page++;
    updateBookList(matches);
    updateShowMoreButton();
  });
  
  // Initial setup
  updateBookList(matches);
  updateShowMoreButton();
  