document.addEventListener('DOMContentLoaded', function() {
    const firstCategory = document.querySelector('.categories-books__genre-btn');

    if (firstCategory) {
        firstCategory.classList.add('active'); // Добавить класс "active"
        loadBooksForCategory('Architecture');
    }
});

const categoryButtons = document.querySelectorAll('.categories-books__genre-btn'); // Обработка кликов на другие категории

categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
    categoryButtons.forEach(btn => btn.classList.remove('active')); // Удалить класс "active" у всех категорий

    this.classList.add('active'); // Добавить класс "active" к выбранной категории
   
   const selectedCategory = this.textContent.trim(); // Сделать запрос книг для выбранной категории
   loadBooksForCategory(selectedCategory);
 });
});

function loadBooksForCategory(category) {   // Функция для загрузки книг в зависимости от категории
        const apiKey = 'AIzaSyAo2Kpeenx5LthtRq7rVfMsH9RNFPUMzGo';
        const URL = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=${apiKey}&maxResults=6`;
    
        fetch(URL)
          .then(response => response.json())
          .then(data => {
            console.log('Загруженные книги:', data);
          })
          .catch(error => console.error('Ошибки при загрузке данных:', error));

          console.log('Загружаются книги для категории:', category);

  }

  console.log(loadBooksForCategory);
  



// const apiKey = 'AIzaSyAo2Kpeenx5LthtRq7rVfMsH9RNFPUMzGo';
// const activeCategories = document.querySelector('.active-categories');
// const URL = `https://www.googleapis.com/books/v1/volumes?q=subject:Business&key=${apiKey}`;

// function Categories(event) {
//     activeCategories.classList.add('active-categories');
// }

// console.log(Categories);


// function categoriesChoose(event) {
//     const activeCategories = document.querySelector('.active-categories');

//     activeCategories.classList.remove('.active-categories');
//     activeCategories = event.target;
//     activeCategories.classList.add('.active-categories');
//     const selectedCategories = activeCategories.textContent;
//     fetchForApi(selectedCategories);
// }

// categories.forEach(button =>{ 
//     button.addEventListener('click', categoriesChoose); 
// });


        
