/* =========================================
   YANIZA & FLEURS — INTERACTIVE FEATURES
   ========================================= */

const products = document.querySelectorAll(".product-card");

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const filters = document.querySelectorAll(".filter");

let cart = [];


/* =========================================
   OPEN SHOPPING BAG
   ========================================= */

cartButton.addEventListener("click", () => {
  document.body.classList.add("cart-open");
});


/* =========================================
   CLOSE SHOPPING BAG
   ========================================= */

closeCart.addEventListener("click", () => {
  document.body.classList.remove("cart-open");
});

overlay.addEventListener("click", () => {
  document.body.classList.remove("cart-open");
});


/* =========================================
   ADD PRODUCTS TO BAG
   ========================================= */

document.querySelectorAll(".add-button").forEach(button => {

  button.addEventListener("click", () => {

    const product = button.closest(".product-card");

    const name = product.dataset.name;
    const price = Number(product.dataset.price);

    cart.push({
      name: name,
      price: price
    });

    updateCart();

    showNotification(
      `${name} added to your bag ♡`
    );

    button.textContent = "Added ✓";

    setTimeout(() => {
      button.textContent = "Add to Bag";
    }, 1200);

  });

});


/* =========================================
   UPDATE SHOPPING BAG
   ========================================= */

function updateCart() {

  cartCount.textContent = cart.length;

  cartItems.innerHTML = "";

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Your bag is empty.
      </p>
    `;

    cartTotal.textContent = "₱0";

    return;
  }


  let total = 0;


  cart.forEach((item, index) => {

    total += item.price;


    const itemElement = document.createElement("div");

    itemElement.className = "cart-item";


    itemElement.innerHTML = `

      <div>

        <strong>
          ${item.name}
        </strong>

        <small>
          ₱${item.price.toLocaleString("en-PH")}
        </small>

      </div>

      <button
        class="remove-item"
        data-index="${index}"
      >
        Remove
      </button>

    `;


    cartItems.appendChild(itemElement);

  });


  cartTotal.textContent =
    `₱${total.toLocaleString("en-PH")}`;


  /* REMOVE PRODUCT */

  document.querySelectorAll(".remove-item").forEach(button => {

    button.addEventListener("click", () => {

      const index =
        Number(button.dataset.index);

      cart.splice(index, 1);

      updateCart();

    });

  });

}


/* =========================================
   PRODUCT FILTERS
   ========================================= */

filters.forEach(filter => {

  filter.addEventListener("click", () => {

    /* Remove active state */

    filters.forEach(button => {
      button.classList.remove("active");
    });


    /* Activate clicked filter */

    filter.classList.add("active");


    const selectedCategory =
      filter.dataset.filter;


    products.forEach(product => {

      const categories =
        product.dataset.category;


      if (
        selectedCategory === "all" ||
        categories.includes(selectedCategory)
      ) {

        product.style.display = "block";

        /* Small animation */

        product.animate(
          [
            {
              opacity: 0,
              transform: "translateY(15px)"
            },

            {
              opacity: 1,
              transform: "translateY(0)"
            }
          ],
          {
            duration: 350,
            easing: "ease-out"
          }
        );

      } else {

        product.style.display = "none";

      }

    });

  });

});


/* =========================================
   NOTIFICATION
   ========================================= */

function showNotification(message) {

  const notification =
    document.createElement("div");


  notification.textContent =
    message;


  notification.style.position =
    "fixed";

  notification.style.left =
    "50%";

  notification.style.bottom =
    "25px";

  notification.style.transform =
    "translateX(-50%) translateY(20px)";

  notification.style.background =
    "#302522";

  notification.style.color =
    "white";

  notification.style.padding =
    "12px 18px";

  notification.style.borderRadius =
    "999px";

  notification.style.fontSize =
    "0.82rem";

  notification.style.zIndex =
    "9999";

  notification.style.opacity =
    "0";

  notification.style.transition =
    "all 0.3s ease";


  document.body.appendChild(
    notification
  );


  setTimeout(() => {

    notification.style.opacity =
      "1";

    notification.style.transform =
      "translateX(-50%) translateY(0)";

  }, 20);


  setTimeout(() => {

    notification.style.opacity =
      "0";

    notification.style.transform =
      "translateX(-50%) translateY(20px)";

  }, 1800);


  setTimeout(() => {

    notification.remove();

  }, 2200);

}


/* =========================================
   SCROLL REVEAL
   ========================================= */

const revealElements =
  document.querySelectorAll(
    ".product-card, .about, .order, .section-heading"
  );


const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.animate(
            [
              {
                opacity: 0,
                transform: "translateY(25px)"
              },

              {
                opacity: 1,
                transform: "translateY(0)"
              }
            ],
            {
              duration: 700,
              easing: "ease-out",
              fill: "forwards"
            }
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =========================================
   CART BUTTON BOUNCE
   ========================================= */

function animateCart() {

  cartButton.animate(
    [
      {
        transform: "scale(1)"
      },

      {
        transform: "scale(1.25)"
      },

      {
        transform: "scale(1)"
      }
    ],
    {
      duration: 350
    }
  );

}


/* Run cart animation when item count changes */

const originalUpdateCart =
  updateCart;


/* =========================================
   KEYBOARD ACCESS
   ========================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      document.body.classList.remove(
        "cart-open"
      );

    }

  }
);


/* =========================================
   INITIAL STATE
   ========================================= */

updateCart();
