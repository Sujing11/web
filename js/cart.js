let cartProducts = [];
let products = [
  {
    id: 1,
    name: "tissot",
    description: "Leather purse 1",
    price: "1200",
    img: "./img/1.png",
  },
  {
    id: 2,
    name: "Vostoc",
    description: "Leather purse 2",
    price: "1050",
    img: "./img/2.png",
  },
  {
    id: 3,
    name: "Vostos",
    description: "Leather purse 3",
    price: "1500",
    img: "./img/2.png",
  },
  {
    id: 4,
    name: "tissot",
    description: "Leather purse 4",
    price: "1100",
    img: "./img/1.png",
  },
];

function loadProducts(productsListParam) {
  productsListParam.forEach((product) => {
    document.getElementById(
      "products-section"
    ).innerHTML += `<div class="product">
        <div class="product-head">
          <img src="${product.img}" alt="" />
        </div>
        <div class="product-body">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="payment">
            <h2>$${product.price}</h2>
            <button onclick="addToCart(${product.id})">Agregar</button>
          </div>
        </div>
      </div>`;
  });
}

/**
 * Funcion para agregar productos a la lista del carrito
 * utilizando el id del producto que quiero agregar y buscandolo en
 * la lista de productos
 * @param {*} id
 */
function addToCart(id) {
  const found = products.find((product) => product.id == id);
  cartProducts.push(found);
  loadProductsToCart(cartProducts);
}

function loadProductsToCart(productsListParam) {
  document.getElementById("cart").innerHTML = `<p class="icon">🛒</p>
  <button class="btn-clean" onclick="cleanCart()">🧹</button>`;
  productsListParam.forEach((product) => {
    document.getElementById("cart").innerHTML += `<div class="product">
          <div class="product-head">
            <img src="${product.img}" alt="" />
          </div>
          <div class="product-body">
            <h3>${product.name}</h3>
            <h2>$${product.price}</h2>
            <button class="btn-remove" 
            onclick="removeProductCart(${product.id})">🗑</button>
          </div>
        </div>`;
  });
}

function removeProductCart(productParamId) {
  cartProducts = cartProducts.filter(
    (product) => product.id !== productParamId
  );
  loadProductsToCart(cartProducts);
}

function cleanCart() {
  document.getElementById("cart").innerHTML = `<p class="icon">🛒</p>`;
  cartProducts = [];
}

loadProducts(products);
