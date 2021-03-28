{
  'use strict';

  const select = {
    templateOf: '#template-book',
    containerOfBooks: '.books-list',
    bookLink: '.book__image',
  };
  // console.log(select);

  const render = function(){
    const data = dataSource;
    const bookContainer = document.querySelector(select.containerOfBooks);
    for(const book of data.books){
      // console.log('book', book);
      const menuBook = Handlebars.compile(document.querySelector(select.templateOf).innerHTML);
      const generatedHtml = menuBook(book);
      const HTML = utils.createDOMFromHTML(generatedHtml);
      bookContainer.appendChild(HTML);
      // console.log('data', data);
      // console.log('HTML', HTML);
    }
    console.log('bookCointainer', bookContainer);
    // return bookContainer;
  };

  const favouriteBooks = [];

  const initActions = function(){
    const bookLinks = document.querySelectorAll(select.bookLink);
    console.log('bookLinks', bookLinks);

    for(let bookLink of bookLinks){
      console.log('bookLink', bookLink);
      bookLink.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookId = bookLink.getAttribute('data-id');
        console.log('bookId', bookId);

        if (favouriteBooks.indexOf(bookId) == -1){
          bookLink.classList.add('favorite');
          favouriteBooks.push(bookId);
        }else{
          bookLink.classList.remove('favorite');
          favouriteBooks.pop(bookId);
        }
        console.log('favouriteBooks', favouriteBooks);
      });
    }
  };

  render();
  initActions();

}
