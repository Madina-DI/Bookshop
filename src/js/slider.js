const entities = [
    {
        img: "img/banner1.png",
        dot: document.querySelector('.slider-dots__banner'),
    },
    {
        img: "img/banner2.png",
        dot: document.querySelector('.slider-dots__banner2'),
    },
    {
        img: "img/banner3.png",
        dot: document.querySelector('.slider-dots__banner3'),
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const imgSlider = document.querySelector('.slider-container__img');
    let currentIndex = 0;
    
    function setEntity(index) {
        imgSlider.style.backgroundImage = `url(${entities[index].img})`;
    }
    
    function makeActive(index) {
        entities[index].dot.style.opacity = 1;
    }
    
    function makeInactive(index) {
        entities[index].dot.style.opacity = 0.3;
    }
    
    function pressOnElement(index) {
        makeInactive(currentIndex);
        currentIndex = index;
        setEntity(currentIndex);
        makeActive(currentIndex);
    }
    
    function autoSlide() {
        makeInactive(currentIndex);
        currentIndex = (currentIndex === entities.length - 1) ? 0 : currentIndex + 1;
        setEntity(currentIndex);
        makeActive(currentIndex);
    }
    
    setInterval(autoSlide, 5000);
    
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].dot) {
            entities[i].dot.addEventListener('click', () => {
                pressOnElement(i);
            });
        }
    }
    
    setEntity(currentIndex);
    makeActive(currentIndex);
    });
    
    console.log(entities[0].img);
    console.log(`webPack`);

//     document.querySelectorAll('.genre-scroll__btn').forEach(button => {
//         button.addEventListener('click', () => {
//             document.querySelectorAll('.genre-scroll__btn').forEach(btn => btn.classList.remove('active'));
//             button.classList.add('active');
//             const selectedGenre = button.textContent;
//             console.log(`Выбран жанр: ${selectedGenre}`);

//     // Здесь ты можешь вызывать функцию загрузки книг по жанру
//     loadBooks(selectedGenre);
//   });
// });
// async function loadBooks(genre) {
//   const maxResults = 6;
//   const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(genre)}&maxResults=${maxResults}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     const booksContainer = document.querySelector('.categories-books-card');
//     booksContainer.innerHTML = '';

//     data.items.forEach(item => {
//       const volume = item.volumeInfo;
//       const bookCard = document.createElement('div');
//       bookCard.classList.add('book-card');

//       bookCard.innerHTML = `
//         <img class="book-card__cover" src="${volume.imageLinks?.thumbnail || './img/default-book.png'}" alt="${volume.title}">
//         <div class="book-card-text">
//           <h3 class="book-card-text__title">${volume.title}</h3>
//           <p class="book-card-text__author">${volume.authors ? volume.authors.join(', ') : 'Unknown Author'}</p>
//           <p class="book-card-text__description">${volume.description ? volume.description.slice(0, 150) + '...' : 'No description'}</p>
//           <p class="book-card-text__price">$${item.saleInfo?.listPrice?.amount || 'N/A'}</p>
//           <button class="book-card-button_buy">Buy now</button>
//         </div>
//       `;

//       booksContainer.appendChild(bookCard);
//     });

//   } catch (err) {
//     console.error('Ошибка при загрузке книг:', err);
//   }
// }
    


















