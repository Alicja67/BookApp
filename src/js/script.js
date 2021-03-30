{
  'use strict';

  const select = {
    templateOf: '#template-book',
    containerOfBooks: '.books-list',
    filters: '.filters',
  };

  class BookList {
    constructor() {
      const thisBookList = this;
      console.log('thisBookList', thisBookList);
      this.initData();
      this.getElements();
      this.render();
      this.initActions();

      this.favouriteBooks = [];
      this.filters = [];
    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      this.dom = {
        bookContainer: document.querySelector(select.containerOfBooks),
        filtersContainer: document.querySelector(select.filters),
      };
    }

    render() {
      for(const book of this.data){

        const rating = book.rating;
        book.ratingBgc = this.determineRatingBgc(rating);
        book.ratingWidth = rating * 10;
        const menuBook = Handlebars.compile(document.querySelector(select.templateOf).innerHTML);
        const generatedHtml = menuBook(book);
        const HTML = utils.createDOMFromHTML(generatedHtml);
        this.dom.bookContainer.appendChild(HTML);
      }
    }

    initActions() {
      const thisBookList = this;
      thisBookList.dom.bookContainer.addEventListener('dblclick', function(event){
        event.preventDefault();

        const parent = event.target.offsetParent;
        const bookId = parent.getAttribute('data-id');

        if (thisBookList.favouriteBooks.indexOf(bookId) == -1){
          parent.classList.add('favorite');
          thisBookList.favouriteBooks.push(bookId);
        }else{
          parent.classList.remove('favorite');
          const nrIndex = thisBookList.favouriteBooks.indexOf(bookId);
          thisBookList.favouriteBooks.splice(nrIndex, 1);
        }
      });

      thisBookList.dom.filtersContainer.addEventListener('change', function(event){
        event.preventDefault();
        console.log('event2', event);
        const filter = event.target.value;
        // console.log('data.id', getElements.data[id]);

        if(event.target.checked == true){
          thisBookList.filters.push(filter);
        }else{
          thisBookList.filters.splice(thisBookList.filters.indexOf(filter), 1);
        }

        thisBookList.filterBooks();
      });
    }

    filterBooks() {
      for(const book of this.data){
        let shouldBeHidden = false;
        const link = document.querySelector('.book__image[data-id="' + book.id + '"]');

        for(const filterId of this.filters){
          if(!book.details[filterId]){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden){
          link.classList.add('hidden');
        }else{
          link.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
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
    }
  }

  const app = new BookList();
  console.log('app', app);
}
