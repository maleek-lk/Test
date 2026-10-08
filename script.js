/* =========================================================
   ✦ EDITABLE SITE SETTINGS
   CHANGE ONLY THIS SECTION FOR A NEW PHONE BRAND.
========================================================= */

const SITE = {

  /* BRAND */

  brand: "Brush Apple",


  /* WHATSAPP */

  whatsapp: "234XXXXXXXXXX",

  whatsappMessage:
    "Hello {brand}, I'm interested in the {product}. Please send me the price, condition, storage and availability.",


  /* ASSET FOLDER */

  assetPath: "assets/",


  /* MAIN IMAGES */

  logo: "logo.webp",

  heroImage: "phone_hero_background.webp",


  /* PRODUCT CATALOG */

  products: [

    {
      name: "iPhone 8+ Black",
      image: "8+_black.jpg",
      category: "iphone"
    },

    {
      name: "iPhone X Gold",
      image: "x_gold.jpg",
      category: "iphone"
    },

    {
      name: "iPhone 11",
      image: "11_back.jpg",
      category: "iphone"
    },

    {
      name: "iPhone 11 Pro Max",
      image: "11_promax.jpg",
      category: "pro"
    },

    {
      name: "iPhone 12 Pro Max",
      image: "12_promax.jpg",
      category: "pro"
    },

    {
      name: "iPhone 13",
      image: "13_back.jpg",
      category: "iphone"
    },

    {
      name: "iPhone 13 Pro",
      image: "13_pro.jpg",
      category: "pro"
    },

    {
      name: "iPhone 14 Pro",
      image: "14_pro.jpg",
      category: "pro"
    },

    {
      name: "iPhone 15",
      image: "15.jpg",
      category: "iphone"
    },

    {
      name: "iPhone 15 Pro",
      image: "15_pro.jpg",
      category: "pro"
    },

    {
      name: "iPhone 16",
      image: "16.jpg",
      category: "iphone"
    },

    {
      name: "iPhone 17",
      image: "17.jpg",
      category: "iphone"
    },

    {
      name: "Samsung S21 5G",
      image: "s21_5G.jpg",
      category: "android"
    },

    {
      name: "Samsung S22 Ultra",
      image: "s22_ultra.jpg",
      category: "android"
    },

    {
      name: "Samsung S24 Ultra",
      image: "s24_ultra_back.jpg",
      category: "android"
    },

    {
      name: "Samsung Fold 4",
      image: "samsung_fold4.jpg",
      category: "android"
    },

    {
      name: "Google Pixel 7",
      image: "pixel_7.jpg",
      category: "android"
    },

    {
      name: "Google Pixel 8",
      image: "pixel_8.jpg",
      category: "android"
    },

    {
      name: "Google Pixel 9",
      image: "pixel_9.jpg",
      category: "android"
    },

    {
      name: "Google Pixel 10",
      image: "pixel_10.jpg",
      category: "android"
    }

  ]

};


/* =========================================================
   ✦ END EDITABLE SITE SETTINGS
   DO NOT EDIT BELOW THIS LINE.
========================================================= */



/* =========================================================
   HELPERS
========================================================= */

function asset(file){

  return SITE.assetPath + file;

}


function whatsapp(product){

  const message =
    SITE.whatsappMessage
      .replace("{brand}", SITE.brand)
      .replace("{product}", product);

  return (
    "https://wa.me/" +
    SITE.whatsapp +
    "?text=" +
    encodeURIComponent(message)
  );

}



/* =========================================================
   BRAND / IMAGES
========================================================= */

document.title =
  SITE.brand + " | Premium Devices";


const logo =
  document.getElementById("siteLogo");

logo.src =
  asset(SITE.logo);

logo.alt =
  SITE.brand;


const footerLogo =
  document.getElementById("footerLogo");

footerLogo.src =
  asset(SITE.logo);

footerLogo.alt =
  SITE.brand;


const heroImage =
  document.getElementById("heroImage");

heroImage.src =
  asset(SITE.heroImage);

heroImage.alt =
  SITE.brand;



/* =========================================================
   PRODUCT CATALOG
========================================================= */

const grid =
  document.getElementById("productGrid");


function renderProducts(filter = "all"){

  const filtered =
    SITE.products.filter(product => {

      return (
        filter === "all" ||
        product.category === filter
      );

    });


  grid.innerHTML =
    filtered.map(product => {

      const tag =
        product.category === "pro"
          ? "PRO"
          : product.category === "android"
          ? "ANDROID"
          : "IPHONE";


      return `

        <article class="product">

          <div class="product-img">

            <span class="tag">
              ${tag}
            </span>

            <img
              src="${asset(product.image)}"
              alt="${product.name}"
              loading="lazy"
            >

          </div>


          <div class="product-body">

            <h3>
              ${product.name}
            </h3>

            <p>
              Ask for price • condition • availability
            </p>


            <div class="product-foot">

              <span class="price">
                DM FOR PRICE
              </span>

              <a
                class="btn btn-main product-btn"
                href="${whatsapp(product.name)}"
                target="_blank"
              >
                Ask Now
              </a>

            </div>

          </div>

        </article>

      `;

    }).join("");

}



/* =========================================================
   FILTERS
========================================================= */

document
  .querySelector(".filters")
  .addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(".filter");

      if(!button) return;


      document
        .querySelectorAll(".filter")
        .forEach(item => {

          item.classList.remove("active");

        });


      button.classList.add("active");


      renderProducts(
        button.dataset.filter
      );

    }
  );



/* =========================================================
   HEADER SCROLL
========================================================= */

window.addEventListener(
  "scroll",
  () => {

    document
      .getElementById("header")
      .classList.toggle(
        "scrolled",
        window.scrollY > 30
      );

  }
);



/* =========================================================
   MAIN WHATSAPP
========================================================= */

document
  .getElementById("mainWhatsapp")
  .href =
    whatsapp("a device");



/* =========================================================
   FOOTER
========================================================= */

document
  .getElementById("footerBrand")
  .textContent =
    SITE.brand;


document
  .getElementById("year")
  .textContent =
    new Date().getFullYear();



/* =========================================================
   INITIAL RENDER
========================================================= */

renderProducts();
