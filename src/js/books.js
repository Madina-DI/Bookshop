let currentPage = 0;
let booksPerPage = 6;  
let categoryButtons;
const downloadBooks = document.querySelector('.books-button');
// let downloadBooks;

document.addEventListener('DOMContentLoaded', function() {
    // const firstCategory = document.querySelector('.categories-books__genre-btn');
    const categoryButtons = document.querySelectorAll('.categories-books__genre-btn'); // Обработка кликов на другие категории

    if (categoryButtons.length > 0) {
        const firstCategory = categoryButtons[0];
        firstCategory.classList.add('active');
        loadBooksForCategory(firstCategory.textContent.trim())
    }

categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
    categoryButtons.forEach(btn => btn.classList.remove('active')); // Удалить класс "active" у всех категорий
    this.classList.add('active'); // Добавить класс "active" к выбранной категории
    currentPage = 0; //Сброс текущей страницы при смене категории
    // const selectedCategory = this.textContent.trim(); // Сделать запрос книг для выбранной категории
    loadBooksForCategory(this.textContent.trim()); //Загрузить книги для выбранной категории
    });
});

downloadBooks.addEventListener('click', function() {
  currentPage++; //Увеличиваем страницу
  const selectedCategory = document.querySelector('.categories-books__genre-btn.active').textContent.trim(); //Берем активную категорию
  loadBooksForCategory(selectedCategory, true); //Загружаем слудующие книги, не очищая предыдущие
  });
});

function loadBooksForCategory(category, append = false) {   // Функция для загрузки книг в зависимости от категории
        const apiKey = 'AIzaSyAo2Kpeenx5LthtRq7rVfMsH9RNFPUMzGo';
        const startIndex = currentPage * booksPerPage;
        const URL = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=${apiKey}&startIndex=${startIndex}&maxResults=6`;
      
        fetch(URL)
          .then(response => response.json())
          .then(data => {
            console.log('Загруженные книги:', data.items);

            const books = data.items.map (book => ({
              cover: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'плейсхолдер для обложки',
              author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Неизвестный автор',
              title: book.volumeInfo.title,
              // rating: book.volumeInfo.averageRating || 'отсутствует',
              rating: book.saleInfo.listPrice ? (book.saleInfo.listPrice.amount / 10) *100+"%": "40%",
              ratingCount: book.volumeInfo.ratingCount ? book.volumeInfo.ratingCount +"m rating": '',
              description: book.volumeInfo.description,
              price: book.saleInfo.retailPrice ? `${book.saleInfo.retailPrice.amount} ${book.saleInfo.retailPrice.currencyCode}` : 'Цена не указана'
            }));

            displayBooks(books, append); //Передаем параметр append для управл поведение добавления книг
          })
          .catch(error => console.error('Ошибка при загрузке данных:', error));
    }

    function displayBooks(books, append = false) {
      const bookContainer = document.querySelector('.categories-books-card'); // Контейнер для карточек книг

      if (!append) {
          bookContainer.innerHTML = ''; // Очищаем контейнер, если append = false
      }
  
      books.forEach(book => {
          const bookHTML = `
            <div class="book-card">
                <img class="book-card__cover" src="${book.cover}" alt="${book.title}">
                <div class="book-card-text">
                  <p class="book-card-text__author">${book.author}</p>
                  <h3 class="book-card-text__title">${book.title}</h3>
                  <div>
                    <p class="book-card-text__rating-count">${book.ratingCount}</p>
                    <svg width="70" height="32" viewBox="0 0 160 32">
                      <defs>
                        <mask id="perc${book.id}">
                          <rect x="0" y="0" width="100%" height="100%" fill="white" />
                          <rect x="48%" y="0" width="100%" height="100%" fill="grey" />
                        </mask>

                        <symbol viewBox="0 0 32 32" id="star">
                          <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
                        </symbol>
                        <symbol viewBox="0 0 160 32" id="stars">
                          <use xlink:href="#star" x="-64" y="0"></use>
                          <use xlink:href="#star" x="-32" y="0"></use>
                          <use xlink:href="#star" x="0" y="0"></use>
                          <use xlink:href="#star" x="32" y="0"></use>
                          <use xlink:href="#star" x="64" y="0"></use>
                        </symbol>
                      </defs>

                      <use xlink:href="#stars" fill="green" stroke="black" mask="url(#perc${book.id})"></use>
                    </svg>
                    
                  </div>
                  <p class="book-card-text__description">${book.description}</p>
                  <p class="book-card-text__price">${book.price}</p>
                  <button class ="button-buy">BUY NOW</button>
                </div>
            </div>`;
          bookContainer.innerHTML += bookHTML;
      });
  }    
  



  
              
  // console.log(loadBooksForCategory); 
              
  
