{
  'use strict';


  const select = {
    templateOf: '#template-book',
    containerOfBooks: '.books-list',
    // bookToHidden: '.book__image[data-id="id-of-the-book-here"],
    filters: '.filters',
  };
  // console.log(select);

  const determineRatingBgc = function(rating){
    let ratingBackground = '';

    if(rating < 6){
      ratingBackground = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }else if(rating > 6 && rating<= 8){
      ratingBackground = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }else if(rating > 8 && rating<= 9){
      ratingBackground = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }else{
      ratingBackground = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return ratingBackground;
  };

  const render = function(){
    const data = dataSource;
    const bookContainer = document.querySelector(select.containerOfBooks);

    for(const book of data.books){

      const rating = book.rating;
      console.log('rating', rating);
      book.ratingBgc = determineRatingBgc(rating);
      book.ratingWidth = rating * 10;
      console.log('ratingBGC, ratingWidth', book.ratingBgc, book.ratingWidth);
      const menuBook = Handlebars.compile(document.querySelector(select.templateOf).innerHTML);
      const generatedHtml = menuBook(book);
      const HTML = utils.createDOMFromHTML(generatedHtml);
      bookContainer.appendChild(HTML);
      console.log('book', book);
      console.log('generetdHTML', generatedHtml);
      console.log('data', data);
      console.log('HTML', HTML);
    }
    console.log('bookCointainer', bookContainer);
  };
  render();

  const favouriteBooks = [];
  const filters = [];

  const initActions = function(){
    const getElements ={
      bookContainer: document.querySelector(select.containerOfBooks),
      filtersContainer: document.querySelector(select.filters),
      data: dataSource.books,
    };
    console.log('getElements',getElements);


    getElements.bookContainer.addEventListener('dblclick', function(event){
      event.preventDefault();
      console.log('event', event);

      const parent = event.target.offsetParent;
      const bookId = parent.getAttribute('data-id');
      console.log('parent,', parent);
      console.log('bookId', bookId);

      if (favouriteBooks.indexOf(bookId) == -1){
        parent.classList.add('favorite');
        favouriteBooks.push(bookId);
      }else{
        parent.classList.remove('favorite');
        const nrIndex = favouriteBooks.indexOf(bookId);
        console.log('nrIndex', nrIndex);
        favouriteBooks.splice(nrIndex, 1);
      }
      console.log('favouriteBooks', favouriteBooks);
    });


    getElements.filtersContainer.addEventListener('change', function(event){
      event.preventDefault();
      console.log('event2', event);
      const filter = event.target.value;
      // console.log('data.id', getElements.data[id]);

      if(event.target.checked == true){
        filters.push(filter);
      }else{
        filters.splice(filters.indexOf(filter), 1);
      }

      const addHiddenClass = function(){
        for(const book of getElements.data){
          let shouldBeHidden = false;
          const link = document.querySelector('.book__image[data-id="' + book.id + '"]');

          for(const filterId of filters){
            console.log('filteredId', filterId);

            if(!book.details[filterId]){
              console.log('book.details[filterId]', book.details[filterId]);
              shouldBeHidden = true;
              break;
            }
          }
          if(shouldBeHidden){
            console.log('book.Id', book.id);
            console.log('link', link);
            link.classList.add('hidden');
          }else{
            link.classList.remove('hidden');
          }
        }
      };

      addHiddenClass();
    });
  };
  initActions();

}
