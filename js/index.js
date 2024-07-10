// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const maxWeight = document.querySelector(".maxweight__input"); // поле с макс. значением для Фильтроции
const minWeight = document.querySelector(".minweight__input"); // поле с мин. значением для Фильтроции
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"index": 0, "kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"index": 1, "kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"index": 2, "kind": "Личи", "color": "розово-красный", "weight": 17},
  {"index": 3, "kind": "Карамбола", "color": "желтый", "weight": 28},
  {"index": 4, "kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// поиск через обьект для css свойства
const endings = {
  'фиолетовый': 'violet',
  'зеленый': 'green',
  'розово-красный': 'carmazin',
  'желтый': 'yellow',
  'светло-коричневый': 'lightbrown',
  'black': 'black'
          };
// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

let maxIndexFruts =  fruits[fruits.length-1].index ; // max index \ new fruits
/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    const fruit = fruits[i]; // Доступ к текущему фрукту
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    //fruitsList.innerHTML = "";

    const fruitItem = document.createElement("li");
    fruitItem.classList.add("fruit__item"); // Добавляем класс с цветом

      // Добавляем класс с цветом
    const colorClass = fruit.color
    fruitItem.classList.add(endings[colorClass] ? `fruit_${endings[colorClass]}` : `fruit_${endings['black']}`);

    const fruitInfo = document.createElement("div");
    fruitInfo.classList.add("fruit__info");


    // Создаем элементы с информацией о фрукте
    const indexDiv = document.createElement("div");
    indexDiv.textContent = `index: ${fruit.index}`;
    const kindDiv = document.createElement("div");
    kindDiv.textContent = `kind: ${fruit.kind}`;
    const colorDiv = document.createElement("div");
    colorDiv.textContent =`color: ${ fruit.color}`;
    const weightDiv = document.createElement("div");
    weightDiv.textContent = `weight: ${ fruit.weight}`;

    // Добавляем элементы в fruitInfo
    fruitInfo.appendChild(indexDiv);
    fruitInfo.appendChild(kindDiv);
    fruitInfo.appendChild(colorDiv);
    fruitInfo.appendChild(weightDiv);

    // Добавляем fruitInfo в fruitItem
    fruitItem.appendChild(fruitInfo);

    // Добавляем fruitItem в fruitsList
    fruitsList.appendChild(fruitItem);
  }

  };



// первая отрисовка карточек
display();


/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let clone = fruits.slice(0);

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {

    const randomFruits = getRandomInt(0,fruits.length-1);

    result.push(fruits[randomFruits]);
    fruits.splice(randomFruits,1);

    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
  }

  if (JSON.stringify(clone) === JSON.stringify(result)){
    alert("Порядок элементов не изменился.");
  }

  fruits = result;

};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let result = [];

  fruits.filter((item) => {
    if ( item.weight >= minWeight.value && item.weight <= maxWeight.value){
      result.push(item);
    }
    
    // TODO: допишите функцию
  });

  fruits = result;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

// Приоритет растановки color
const priority = ['фиолетовый', 'синий', 'желтый','зеленый', 'оранжевый', 'красный', 'розово-красный', 'коричневый', 'светло-коричневый'];


const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const indexA = priority.indexOf(a.color);
  const indexB = priority.indexOf(b.color);

  return indexA - indexB;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
          if (comparation(arr[j], arr[j + 1]) > 0) { // функция сравнения
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // перепсваимвам значение 
            }
        }
      }
  },

  quickSort(arr, comparation) {

    // TODO: допишите функцию быстрой сортировки

    if (arr.length <= 1) {
      return arr;
    }

     let temp = [];
    
    for (let i = 0; i < arr.length - 1; i++) {
        temp = arr[i];
        for (let j = i - 1; j >= 0; j--) {
              if (comparation(arr[j], arr[j + 1]) > 0){
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKind = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];

  sortAPI.startSort(sort, fruits, comparationColor);
  sortTimeLabel.textContent = sortTime;
  display();
  
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  const kind = kindInput.value;
  const color = colorInput.value;
  const weight = weightInput.value;

  // Проверка, все ли поля заполнены
  if (!kind || !color || !weight) {
    alert('Пожалуйста, заполните все поля!');
    return; 
  }
  maxIndexFruts = maxIndexFruts+1;
  // Создание нового фрукта
  const newFruit = {
    index: maxIndexFruts,
    kind: kind,
    color: color,
    weight: parseFloat(weight) // Преобразуем строку в число
  };


  fruits.push(newFruit);


  display();

  // Очистка полей ввода
  kindInput.value = '';
  colorInput.value = '';
  weightInput.value = '';


  display();
});
