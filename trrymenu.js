let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let purchaseButton = document.querySelector('.purchaseButton');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
});

let products = [
  {
    id: 1,
    name: 'Strawberry Latte (16oz)',
    image: '1.jpg',
    price: 105.00
  },
  {
    id: 2,
    name: 'Classic <br> Butterball <br> Brownsugar',
    image: 'butter.jpg',
    price: 120
  },
  {
    id: 3,
    name: 'Caramel Machiato',
    image: 'caramel.jpg',
    price: 85
  },
  {
    id: 4,
    name: 'Shawarma Pita',
    image: 'PITA.png',
    price: 70
  },
  {
    id: 5,
    name: 'Burger Steak',
    image: 'dinner1.jpg',
    price: 90
  },
  {
    id: 6,
    name: 'Cheese sponge cake',
    image: 'lunch1.jpg',
    price: 155
  },
  {
    id: 7,
    name: 'Cheesecake',
    image: 'lunch2.jpg',
    price: 125
  },
  {
    id: 8,
    name: 'Deep fried oreos',
    image: 'oreoes.jpg',
    price: 105
  }
];

let listCards = [];

function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
      <img src="image/${value.image}"/>
      <div class="title">${value.name}</div>
      <div class="price">₱${value.price.toLocaleString()}</div>
      <button onclick="addToCard(${key})">Add To Cart</button>
    `;
    list.appendChild(newDiv);
  });
}

function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;

  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;

    if (value != null) {
      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
        <div><img src="image/${value.image}"/></div>
        <div>${value.name}</div>
        <div>₱${value.price.toLocaleString()}</div>
        <div>
          <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
          <div class="count">${value.quantity}</div>
          <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
        </div>
      `;
      listCard.appendChild(newDiv);
    }
  });

  total.innerText = '₱' + totalPrice.toLocaleString();
  quantity.innerText = count;

  if (!purchaseButton) {
    purchaseButton = document.createElement('div');
    purchaseButton.classList.add('purchaseButton');
    purchaseButton.innerText = 'Purchase';
    purchaseButton.addEventListener('click', handlePurchase);
    document.querySelector('.checkOut').appendChild(purchaseButton);
  }
}

function changeQuantity(key, quantity) {
  if (quantity === 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}

function handlePurchase() {
  // Handle the purchase functionality
}

initApp();
