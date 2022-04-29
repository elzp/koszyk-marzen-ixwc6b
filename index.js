// Import stylesheets
import './style.css';

const basket = document.querySelectorAll('body>div>div');

const input = document.querySelectorAll('body>div>div input');
const items = document.querySelectorAll('body>div>div>div');
const title = document.querySelector('h1');
const deleteButtons = document.querySelectorAll('.pl-4');
const prices = document.querySelectorAll(
  'body>div>div>div>div:last-child>div:nth-child(2)'
);
const total = document.querySelector('span');

const pricesAsNumbers = Object.values(prices).map((price) =>
  Number(price.innerHTML.match(/\d+/g))
);
let quantity = Object.values(input).map((item) => item.value);

let newTotal = pricesAsNumbers.reduce((total, next, index) => {
  return (total = total + next * quantity[index]);
}, 0);
total.innerHTML = `${newTotal} zł`;

input.forEach((item, index) => {
  item.addEventListener('change', (event) => {
    quantity[index] = event.target.value;
    newTotal = pricesAsNumbers.reduce((total, next, index) => {
      return (total = total + next * quantity[index]);
    }, 0);
    total.innerHTML = `${newTotal} zł`;
  });
});

title.insertAdjacentHTML('afterend', '<p class="empty"></p>');
const emptyBasket = document.querySelector('.empty');
const itemsLength = items.length;
let lengthToCheck = itemsLength;

deleteButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    console.log(index);
    total.innerHTML = `${
      Number(total.innerHTML.match(/\d+/g)) - pricesAsNumbers[index]
    } zł`;

    items[index].style.display = 'none';
    lengthToCheck -= 1;

    if (lengthToCheck === 0) {
      emptyBasket.innerHTML = 'You have empty basket!';
    }
  });
});
