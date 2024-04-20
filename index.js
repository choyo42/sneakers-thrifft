// Nav Bar

const toggleBtn = document.querySelector('.menu');
const toggleBtnIcon = toggleBtn.querySelector('i');
const dropDownMenu = document.querySelector('.dropdown-menu');

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');
  toggleBtnIcon.classList.toggle('fa-bars', !isOpen);
  toggleBtnIcon.classList.toggle('fa-xmark', isOpen);
};

// Nav Bar Ends
let cart = [];
let total = 0;

function addToCart(product, price) {
  const existingItem = cart.find(item => item.product === product);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, price, quantity: 1 });
  }

  total += price;

  updateCartUI();
  saveCartData(); // Save cart data after adding items
}

function updateCartUI() {
  const cartItemsTableBody = document.getElementById('cart-items-body');
  const cartTotalSpan = document.getElementById('cart-total');
  const cartIconCount = document.getElementById('cart-icon-count');

  cartItemsTableBody.innerHTML = '';
  cartIconCount.textContent = cart.reduce((count, item) => count + item.quantity, 0);

  cart.forEach(item => {
    const cartItemRow = document.createElement('tr');
    cartItemRow.innerHTML = `
        <td style="color: #333;">${item.product}</td>
        <td style="color: #28a745;">${item.price.toFixed(2)}</td>
        <td style="color: #333;">${item.quantity}</td>
        <td><button onclick="removeItem('${item.product}')">Remove</button></td>
    `;
    cartItemsTableBody.appendChild(cartItemRow);
  });

  cartTotalSpan.textContent = total.toFixed(2);
}
function removeItem(product) {
  const index = cart.findIndex(item => item.product === product);
  if (index !== -1) {
    total -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);
    updateCartUI();
    saveCartData(); // Save cart data after removing items
  }
}

function showDetails(title, description, price) {
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalPrice = document.getElementById('modal-price');

  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalPrice.textContent = `Price: ${price.toFixed(2)}`; // Corrected interpolation

  const detailsModal = document.getElementById('details-modal');
  detailsModal.style.display = 'block';

  const modalOverlay = document.querySelector('.modal-overlay');
  modalOverlay.style.display = 'block';

  const closeButton = document.querySelector('.close-btn');

  function closeDetailsModal() {
    detailsModal.style.display = 'none';
    modalOverlay.style.display = 'none';
  }

  closeButton.addEventListener('click', closeDetailsModal);
}

function toggleCart() {
  const cartDetails = document.getElementById('cart-details');
  const modalOverlay = document.querySelector('.modal-overlay');

  if (cart.length > 0) {
    cartDetails.style.display = cartDetails.style.display === 'block' ? 'none' : 'block';
    modalOverlay.style.display = modalOverlay.style.display === 'block' ? 'none' : 'block';
  } else {
    cartDetails.style.display = 'none';
    modalOverlay.style.display = 'none';
  }
}
// Load cart data from local storage or cookies when the page loads
window.addEventListener('load', function () {
  loadCartData();
});

// Function to load cart data from local storage or cookies
function loadCartData() {
  let cartData = localStorage.getItem('cart');
  if (!cartData) {
    cartData = getCookie('cart');
  }
  if (cartData) {
    cart = JSON.parse(cartData);
    updateCartUI();
  }
}

// Function to save cart data to both local storage and cookies
function saveCartData() {
  localStorage.setItem('cart', JSON.stringify(cart));
  setCookie('cart', JSON.stringify(cart), 30); // Set cookie with 30 days expiry
}

// Function to set a cookie
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
}

// Function to get a cookie value by name
function getCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function pay() {
  alert('Payment Successful! Thank you for shopping in sneakers thrifft.');
  clearCart();
  toggleCart();
}

function clearCart() {
  cart = [];
  total = 0;
  updateCartUI();
  saveCartData(); // Save cart data after clearing the cart
}

document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault();
  validateForm();
});

function validateForm() {
  var username = document.getElementById("username").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();

  var usernameError = document.getElementById("usernameError");
  var emailError = document.getElementById("emailError");
  var passwordError = document.getElementById("passwordError");

  var isValid = true;

  // Validate Username
  if (username === "") {
    usernameError.textContent = "Username is required";
    isValid = false;
  } else {
    usernameError.textContent = "";
  }

  // Validate Email
  if (email === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Enter a valid email address";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // Validate Password
  if (password === "") {
    passwordError.textContent = "Password is required";
    isValid = false;
  } else if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters long";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  return isValid;
}

function isValidEmail(email) {
  // Basic email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

 // Function to open WhatsApp
  function openWhatsApp() {
    // Change this number to your country code
    var countryCode = "254";
    // Change this number to the recipient's phone number
    var phoneNumber = "0724406921";
    // Open WhatsApp with the provided phone number
    window.open("https://wa.me/" + countryCode + phoneNumber, "_blank");
  }
