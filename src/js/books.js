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

            const books = data.items.map(book => ({
              cover: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'плейсхолдер для обложки',
              author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Неизвестный автор',
              title: book.volumeInfo.title,
              rating: book.volumeInfo.averageRating || null,
              ratingsCount: book.volumeInfo.ratingsCount || null ,
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

        const rating = book.rating || null;
        const ratingsCount = book.ratingsCount || null;

        let starsHTML = '';

        if (rating) {
          for (let i = 1; i <= 5; i++ ) {

            if (i <= rating) {

              starsHTML += `<span style="color: #F2C94C; font-size: 20px;">★</span>`;
            } else {
              starsHTML += `<span style="color: lightgrey; font-size: 20px;">★</span>`;
            }
          }
        }

            

          const bookHTML = `
            <div class="book-card">
                <img class="book-card__cover" src="${book.cover}" alt="${book.title}">
                <div class="book-card-text">
                  <p class="book-card-text__author">${book.author}</p>
                  <h3 class="book-card-text__title">${book.title}</h3>
                  ${rating ? `
                  <div class="book-card-text-rating">
                    <div class="book-card-text__stars">
                      ${starsHTML}
                    </div>
                  ${ratingsCount ? `<p class="book-card-text__rating-count">${book.ratingsCount}</p>` : ""}       
                </div>
                ` : ''}           
                  <p class="book-card-text__description">${book.description}</p>
                  <p class="book-card-text__price">${book.price}</p>
                  <button class="book-card-button_buy">BUY NOW</button>
                </div>
            </div>`;
          bookContainer.innerHTML += bookHTML;
      });
    }
  
  
  



  
              
  // console.log(loadBooksForCategory); 
              
  
