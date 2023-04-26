class Burger {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}
let plus = document.querySelectorAll(".plus");
let minus = document.querySelectorAll(".minus");
let btnAddToCart = document.querySelectorAll(".add-to-cart");
let quantity = document.querySelectorAll(".quantity");
let btnCart = document.querySelector(".btn-cart");
let badge = document.querySelector(".badge");
let productList = document.querySelector(".product-list");
let overlay = document.querySelector(".overlay");
let total = document.querySelector(".total");
let btnSplit = document.querySelector(".btn-split");
let perPerson = document.querySelector(".per-person-output");

let cart = [];

plus.forEach((element) => {
  element.addEventListener("click", (event) => {
    let target = event.target;
    let parent = target.parentNode;
    let siblingNode = parent.querySelector(".quantity");
    let currentQuantity = parseInt(siblingNode.value);
    currentQuantity += 1;
    siblingNode.value = currentQuantity;
  });
});

minus.forEach((element) => {
  element.addEventListener("click", (event) => {
    let target = event.target;
    let parent = target.parentNode;
    let siblingNode = parent.querySelector(".quantity");
    let currentQuantity = parseInt(siblingNode.value);
    if (currentQuantity > 1) {
      currentQuantity -= 1;
    }
    siblingNode.value = currentQuantity;
  });
});

btnAddToCart.forEach((element) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    let target = event.target;
    let parent = target.parentNode;
    let burgerName = parent.querySelector(".title").textContent;
    let price = parent.querySelector(".price").textContent;
    let quantity = parent.querySelector(".quantity").value;

    let burger = new Burger(burgerName, price, quantity);
    cart.push(burger);
    badge.textContent = cart.length;
  });
});

btnCart.addEventListener("click", (event) => {
  event.preventDefault();
  overlay.style.display = "block";
  let totalAmount = 0;
  cart.forEach((element) => {
    let str = element.price;
    let pricePerPiece = "";

    for (let i = 0; i < str.length; i++) {
      if (str[i] !== "$") {
        pricePerPiece += str[i];
      }
    }
    let quantity = parseInt(element.quantity);
    let totalPrice = parseInt(pricePerPiece) * quantity;

    let li = document.createElement("li");
    li.setAttribute("class", "list-item");
    li.innerHTML = `<div>${element.name}</div>
  <div>${element.quantity}</div>
  <div>$${totalPrice}</div>`;
    productList.appendChild(li);
    totalAmount += totalPrice;
  });
  total.innerHTML = "Total: $" + totalAmount;
});

function splitBill(e) {
  e.preventDefault();
  let numberOfPeopleInput = document.querySelector(".number-of-people");

  let str = total.textContent;
  let amountToSplit = parseInt(str.match(/\d+/)[0]);
  let personsToSplit = parseInt(numberOfPeopleInput.value);

  let billPerPerson = amountToSplit / personsToSplit;
  perPerson.textContent = "Amount per person : $ " + billPerPerson.toFixed(2);
}
