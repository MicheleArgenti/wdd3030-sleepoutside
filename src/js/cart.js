import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Add the removeItem function to the remove items button
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      removeItem(index);
    });
  });

  cartTotal();
}

function cartItemTemplate(item, index) {
  const newItem = `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button data-index="${index}" class="remove-btn">X</button>
  </li>`;

  return newItem;
}

function cartTotal() {
  let total = 0;
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.forEach(item => {
    total += item.FinalPrice;
  });
  document.getElementById("list-total").textContent = `Total: $${total}`;
}

function removeItem(index) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}

renderCartContents();
