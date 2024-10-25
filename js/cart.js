let cart = [];
let totalPrice = 0;

function addToCart(event, element) {
  event.preventDefault();
  
  const productCard = element.closest('.card');
  const productName = productCard.querySelector('.card-content h5').textContent;
  const productPrice = parseInt(productCard.querySelector('.card-content h6').textContent.replace('$', ''));
  const productImage = productCard.querySelector('img').src; // Obtener la URL de la imagen del producto
  
  // Verificar si el producto ya está en el carrito
  const existingProduct = cart.find(item => item.name === productName);
  
  if (existingProduct) {
      existingProduct.quantity += 1;
  } else {
      cart.push({
          name: productName,
          price: productPrice,
          image: productImage, // Guardar la imagen del producto
          quantity: 1
      });
  }
  
  updateCart(); // Actualizar la vista del carrito
  updateCartItemCount(); // Actualizar la cantidad de ítems en el icono del carrito
  
  // Mostrar controles de cantidad y ocultar botón "Añadir"
  const btnContainer = element.closest('.btn-container');
  btnContainer.querySelector('.add-to-cart').classList.add('d-none');
  btnContainer.querySelector('.quantity-controls').classList.remove('d-none');
}


function removeItem(event, element, price, productName) {
  const quantityElement = element.nextElementSibling;
  let quantity = parseInt(quantityElement.textContent);

  if (quantity > 1) {
    quantityElement.textContent = --quantity;
    // Actualizar cantidad en el carrito
    const product = cart.find(item => item.name === productName);
    product.quantity--;
    updateCart();
  } else {
    const btnContainer = element.closest('.btn-container');
    btnContainer.querySelector('.add-to-cart').classList.remove('d-none');
    btnContainer.querySelector('.quantity-controls').classList.add('d-none');
    // Eliminar el producto del carrito
    cart = cart.filter(item => item.name !== productName);
    updateCart();
  }
  updateCartItemCount();
}

function addItem(event, element, price, productName) {
  const quantityElement = element.previousElementSibling;
  let quantity = parseInt(quantityElement.textContent);
  quantityElement.textContent = ++quantity;

  // Actualizar cantidad en el carrito
  const product = cart.find(item => item.name === productName);
  product.quantity++;
  updateCart();
  updateCartItemCount();
}

function updateCart() {
  let cartItems = '';
  totalPrice = 0;

  cart.forEach(item => {
      cartItems += `
          <li class="cart-item d-flex align-items-center mb-2">
              <img src="${item.image}" alt="${item.name}">
              <div>
                  ${item.name} - $${item.price} 
                  <div class="cart-quantity-controls">
                      <button class="btn btn-sm btn-secondary" onclick="updateCartQuantity('${item.name}', -1)">
                          <i class="fa fa-minus-circle"></i>
                      </button>
                      <span class="cart-quantity">${item.quantity}</span>
                      <button class="btn btn-sm btn-secondary" onclick="updateCartQuantity('${item.name}', 1)">
                          <i class="fa fa-plus-circle"></i>
                      </button>
                      <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.name}')">
                          <i class="fa fa-times"></i>
                      </button>
                  </div>
              </div>
          </li>`;
      totalPrice += item.price * item.quantity;
  });

  document.getElementById('cart-items').innerHTML = cartItems;
  document.getElementById('total-price').textContent = totalPrice;
}


function updateCartQuantity(productName, change) {
  // Encontrar el producto en el carrito y actualizar la cantidad
  cart = cart.map(item => {
    if (item.name === productName) {
      item.quantity += change;
      if (item.quantity < 1) item.quantity = 1; // Evitar cantidades menores a 1
    }
    return item;
  });

  // Actualizar las cantidades en las tarjetas de productos
  const productCards = document.querySelectorAll('.card');
  productCards.forEach(card => {
    const productTitle = card.querySelector('.card-content h5').textContent;
    if (productTitle === productName) {
      const quantityElement = card.querySelector('.quantity');
      const cartItem = cart.find(item => item.name === productName);
      quantityElement.textContent = cartItem.quantity; // Sincronizar con el carrito
    }
  });

  // Actualizar la vista del carrito
  updateCart();
  updateCartItemCount();
}


function removeFromCart(productName) {
  // Eliminar el producto del carrito
  cart = cart.filter(item => item.name !== productName);
  // Actualizar la vista del carrito
  updateCart();
  updateCartItemCount();

  const productCards = document.querySelectorAll('.card');
  productCards.forEach(card => {
    const productTitle = card.querySelector('.card-content h5').textContent;
    if (productTitle === productName) {
      card.querySelector('.add-to-cart').classList.remove('d-none');
      card.querySelector('.quantity-controls').classList.add('d-none');
      // Resetear la cantidad a 1 para cada producto
      const quantityElement = card.querySelector('.quantity');
      quantityElement.textContent = 1;
    }
  });
}

function clearCart() {
  cart = [];
  totalPrice = 0;

  updateCart();
  updateCartItemCount();

  const productCards = document.querySelectorAll('.card');
  productCards.forEach(card => {
    card.querySelector('.add-to-cart').classList.remove('d-none');
    card.querySelector('.quantity-controls').classList.add('d-none');
    // Resetear la cantidad a 1 para cada producto
    const quantityElement = card.querySelector('.quantity');
    quantityElement.textContent = 1;
  });
}

function updateCartItemCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  // Actualiza el span que muestra el número de ítems
  document.getElementById('cart-item-count').textContent = totalItems;
}

window.onload = function() {
  updateCartItemCount(); // Al cargar la página, actualiza la cantidad de ítems en el carrito
};


// Inicializar todos los popovers en la página
document.addEventListener('DOMContentLoaded', function () {
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
  });
});
