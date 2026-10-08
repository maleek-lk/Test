/* =========================================================
   ✦ EDITABLE SITE SETTINGS
   CHANGE ONLY THIS SECTION FOR A NEW CLIENT.
========================================================= */

const SITE = {

  brand: "Rach3al Atelier",

  whatsapp: "234XXXXXXXXXX",

  whatsappMessage:
    "Hello Rach3al Atelier, I would like to make an enquiry.",

  assetPath: "assets/",

  logo: "",

  heroImage: "atelier-01.jpg",

  customImage: "atelier-15.jpg",

  marqueeImages: [
    "atelier-01.jpg",
    "atelier-02.jpg",
    "atelier-03.jpg",
    "atelier-05.jpg",
    "atelier-08.jpg",
    "atelier-09.jpg",
    "atelier-11.jpg",
    "atelier-13.jpg"
  ],

  products: [

    {
      name: "The Amara",
      image: "atelier-04.jpg",
      category: "collection",
      price: "₦85,000",
      description:
        "A refined silhouette designed for effortless elegance and statement presence."
    },

    {
      name: "The Sade",
      image: "atelier-06.jpg",
      category: "collection",
      price: "₦95,000",
      description:
        "A graceful feminine design with carefully considered structure and movement."
    },

    {
      name: "The Zuri",
      image: "atelier-07.jpg",
      category: "collection",
      price: "₦110,000",
      description:
        "A distinctive occasion piece made for entrances that stay remembered."
    },

    {
      name: "The Naya",
      image: "atelier-10.jpg",
      category: "collection",
      price: "₦90,000",
      description:
        "Elegant lines, confident proportions, and a finish made to stand apart."
    },

    {
      name: "The Elara",
      image: "atelier-12.jpg",
      category: "collection",
      price: "₦125,000",
      description:
        "A sophisticated statement silhouette for celebrations and special moments."
    },

    {
      name: "The Imani",
      image: "atelier-14.jpg",
      category: "collection",
      price: "₦100,000",
      description:
        "A modern atelier classic balancing softness, detail, and quiet confidence."
    },

    {
      name: "The Rhea",
      image: "atelier-15.jpg",
      category: "collection",
      price: "₦135,000",
      description:
        "A signature custom-inspired design created for unforgettable appearances."
    }

  ]

};

/* =========================================================
   ✦ END EDITABLE SITE SETTINGS
========================================================= */


/* =========================================================
   ✦ TEMPLATE INFRASTRUCTURE
   DO NOT EDIT FOR NORMAL CLIENT REUSE.
========================================================= */

(function () {

  "use strict";


  /*
   * Central asset resolver.
   * Every image passes through this function.
   */

  function asset(file) {
    return SITE.assetPath + file;
  }


  /*
   * DOM references.
   */

  const collectionGrid =
    document.getElementById("collectionGrid");

  const marqueeTrack =
    document.getElementById("marqueeTrack");

  const customImage =
    document.getElementById("customImage");

  const productModal =
    document.getElementById("productModal");

  const modalBackdrop =
    document.getElementById("modalBackdrop");

  const modalClose =
    document.getElementById("modalClose");

  const modalImage =
    document.getElementById("modalImage");

  const modalNumber =
    document.getElementById("modalNumber");

  const modalTitle =
    document.getElementById("modalTitle");

  const modalPrice =
    document.getElementById("modalPrice");

  const modalDescription =
    document.getElementById("modalDescription");

  const modalWhatsapp =
    document.getElementById("modalWhatsapp");

  const menuToggle =
    document.getElementById("menuToggle");

  const mobileMenu =
    document.getElementById("mobileMenu");

  const backTop =
    document.getElementById("backTop");

  const navbar =
    document.getElementById("navbar");


  /*
   * Apply basic site settings.
   */

  function applySiteSettings() {

    document.title =
      SITE.brand + " | Fashion & Bespoke Design";

    document.querySelectorAll(".brand-name")
      .forEach(function (element) {
        element.textContent = SITE.brand.split(" ")[0];
      });

    document.querySelectorAll(".brand em")
      .forEach(function (element) {

        const words = SITE.brand.split(" ");

        element.textContent =
          words.slice(1).join(" ") || "";
      });

    if (customImage && SITE.customImage) {
      customImage.src =
        asset(SITE.customImage);
    }

  }


  /*
   * WhatsApp URL generator.
   */

  function whatsappUrl(message) {

    return (
      "https://wa.me/" +
      SITE.whatsapp +
      "?text=" +
      encodeURIComponent(message)
    );

  }


  /*
   * Generate marquee.
   *
   * The list is duplicated so the CSS animation
   * can loop continuously.
   */

  function renderMarquee() {

    if (!marqueeTrack) return;

    const images =
      SITE.marqueeImages || [];

    const firstTrack =
      images.map(function (image, index) {

        const tall =
          index % 2 === 1
            ? " marquee-tall"
            : "";

        return `
          <div class="marquee-item${tall}">
            <img
              src="${asset(image)}"
              alt=""
              loading="${index < 4 ? "eager" : "lazy"}"
            />
            <span>${String(index + 1).padStart(2, "0")}</span>
          </div>
        `;

      }).join("");

    marqueeTrack.innerHTML =
      firstTrack + firstTrack;

  }


  /*
   * Generate product collection.
   */

  function renderProducts() {

    if (!collectionGrid) return;

    collectionGrid.innerHTML =
      SITE.products.map(function (product, index) {

        const number =
          String(index + 1).padStart(2, "0");

        return `
          <article
            class="collection-card"
            data-product-index="${index}"
          >

            <div class="card-image">

              <img
                src="${asset(product.image)}"
                alt="${product.name}"
                loading="lazy"
              />

              <div class="card-overlay">

                <div class="view-circle">
                  View<br />
                  design ↗
                </div>

              </div>

            </div>

            <div class="card-meta">

              <div>

                <div class="card-number">
                  ${number} / SELECTED
                </div>

                <h3 class="card-name">
                  ${product.name}
                </h3>

              </div>

              <div class="card-price">
                ${product.price || "DM FOR PRICE"}
              </div>

            </div>

          </article>
        `;

      }).join("");


    document
      .querySelectorAll(".collection-card")
      .forEach(function (card) {

        card.addEventListener(
          "click",
          function () {

            const index =
              Number(
                card.dataset.productIndex
              );

            openProduct(index);

          }
        );

      });

  }


  /*
   * Product modal.
   */

  function openProduct(index) {

    const product =
      SITE.products[index];

    if (!product) return;


    const number =
      String(index + 1).padStart(2, "0");


    modalImage.src =
      asset(product.image);

    modalImage.alt =
      product.name;


    modalNumber.textContent =
      "DESIGN " + number;


    modalTitle.textContent =
      product.name;


    modalPrice.textContent =
      product.price ||
      "DM FOR PRICE";


    modalDescription.textContent =
      product.description ||
      "";


    const message =
      "Hello " +
      SITE.brand +
      ", I am interested in " +
      product.name +
      ". " +
      "I would like to know more about availability, sizing, pricing and custom details.";


    modalWhatsapp.href =
      whatsappUrl(message);


    productModal.classList.add("open");

    document.body.classList.add(
      "modal-open"
    );

  }


  function closeProduct() {

    productModal.classList.remove(
      "open"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }


  /*
   * Modal events.
   */

  modalClose.addEventListener(
    "click",
    closeProduct
  );

  modalBackdrop.addEventListener(
    "click",
    closeProduct
  );


  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {
        closeProduct();
      }

    }
  );


  /*
   * Generic WhatsApp buttons.
   *
   * Any element with:
   *
   * class="whatsapp-link"
   *
   * can contain:
   *
   * data-message="..."
   */

  document
    .querySelectorAll(".whatsapp-link")
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function (event) {

          event.preventDefault();

          const message =
            link.dataset.message ||
            SITE.whatsappMessage;

          window.open(
            whatsappUrl(message),
            "_blank",
            "noopener,noreferrer"
          );

        }
      );

    });


  /*
   * Mobile navigation.
   */

  menuToggle.addEventListener(
    "click",
    function () {

      const open =
        mobileMenu.classList.toggle(
          "open"
        );

      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

    }
  );


  mobileMenu
    .querySelectorAll("a")
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function () {

          mobileMenu.classList.remove(
            "open"
          );

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });


  /*
   * Back to top.
   */

  backTop.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  /*
   * Navbar scroll state.
   */

  window.addEventListener(
    "scroll",
    function () {

      if (window.scrollY > 50) {

        navbar.style.background =
          "rgba(11, 12, 16, 0.92)";

        navbar.style.backdropFilter =
          "blur(16px)";

        navbar.style.webkitBackdropFilter =
          "blur(16px)";

      } else {

        navbar.style.background =
          "linear-gradient(to bottom, rgba(11, 12, 16, 0.94), rgba(11, 12, 16, 0))";

        navbar.style.backdropFilter =
          "none";

        navbar.style.webkitBackdropFilter =
          "none";

      }

    },
    {
      passive: true
    }
  );


  /*
   * Initialize.
   */

  applySiteSettings();

  renderMarquee();

  renderProducts();

})();
