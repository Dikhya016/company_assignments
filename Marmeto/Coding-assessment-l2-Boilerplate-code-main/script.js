// console.log('====================================');
// console.log("Connected");
// console.log('====================================');

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const nav = document.querySelector(".nav");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active");
  nav.classList.toggle("active");
});

const formatCurrency = (amount) => {
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `Rs. ${formattedNumber}`;
};


const createCartItemHTML = (item) => {
  return `
                <div class="cart-item" data-id="${item.id}">
                    <div class="product-info">
                        <img src="${item.image}" alt="${
    item.title
  }" class="product-image">
                        <span class="product-name">${item.title}</span>
                    </div>
                    <div>${formatCurrency(item.price / 100)}</div>
                    <div>
                        <input type="number" value="${
                          item.quantity
                        }" min="1" class="quantity-input" data-id="${item.id}">
                    </div>
                    <div>${formatCurrency(item.final_line_price / 100)}</div>
                    <button class="delete-btn" data-id="${item.id}">🗑️</button>
                </div>
            `;
};

const updateCartTotals = (cartData) => {
  const subtotal = cartData.items.reduce(
    (total, item) => total + item.final_line_price,
    0
  );
  document.getElementById("subtotal").textContent = formatCurrency(
    subtotal / 100
  );
  document.getElementById("total").textContent = formatCurrency(subtotal / 100);
};

const handleQuantityChange = (event, cartData) => {
  const itemId = parseInt(event.target.dataset.id);
  const newQuantity = parseInt(event.target.value);

  const item = cartData.items.find((item) => item.id === itemId);
  if (item) {
    item.quantity = newQuantity;
    item.final_line_price = item.price * newQuantity;

    const itemContainer = event.target.closest(".cart-item");
    itemContainer.querySelector("div:nth-child(4)").textContent =
      formatCurrency(item.final_line_price / 100);

    updateCartTotals(cartData);
  }
};

const handleRemoveItem = (event, cartData) => {
  const itemId = parseInt(event.target.dataset.id);
  cartData.items = cartData.items.filter((item) => item.id !== itemId);

  const itemElement = event.target.closest(".cart-item");
  itemElement.remove();

  updateCartTotals(cartData);

  if (cartData.items.length === 0) {
    document.getElementById("cart-items-container").innerHTML =
      '<div class="empty-cart">Your cart is empty</div>';
  }
};

const initializeCart = async () => {
  const cartContainer = document.getElementById("cart-items-container");

  try {
    cartContainer.innerHTML = '<div class="loading">Loading cart data...</div>';

    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const cartData = await response.json();

    if (cartData.items && cartData.items.length > 0) {
      cartContainer.innerHTML = cartData.items
        .map((item) => createCartItemHTML(item))
        .join("");

      document.querySelectorAll(".quantity-input").forEach((input) => {
        input.addEventListener("change", (e) =>
          handleQuantityChange(e, cartData)
        );
      });

      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", (e) => handleRemoveItem(e, cartData));
      });

      updateCartTotals(cartData);
    } else {
      cartContainer.innerHTML =
        '<div class="empty-cart">Your cart is empty</div>';
    }

    document.getElementById("checkout-btn").addEventListener("click", () => {
      alert("Proceeding to checkout!");
    });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    cartContainer.innerHTML = `
                    <div class="error">
                        Error loading cart data. Please try again later.
                    </div>`;
  }
};

document.addEventListener("DOMContentLoaded", initializeCart);