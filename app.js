var slides = document.querySelectorAll(".slide");
var dots = document.querySelectorAll(".dot");
var currentSlide = 0;
var autoSlide;

function ubUpdateCartBadge() {
  var cart = ubGetCart();
  var totalCount = 0;
  for (var i = 0; i < cart.length; i++) {
    totalCount += cart[i].qty;
  }
  var badge = document.getElementById("cartBadge");
  if (badge) {
    badge.textContent = totalCount;
  }
}

ubUpdateCartBadge();

function ubAddToCart(id, qty) {
  if (localStorage.getItem("ub_loggedIn") !== "true") {
    alert("Please login first to add items to your cart.");
    window.location.href = "login.html";
    return;
  }
  
  id = parseInt(id, 10);
  qty = parseInt(qty, 10) || 1;
  var cart = ubGetCart();
  var found = null;
  
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) { 
      found = cart[i]; 
      break; 
    }
  }
  
  if (found) {
    found.qty += qty;
  } else {
    cart.push({ id: id, qty: qty });
  }
  
  ubSaveCart(cart);
  ubUpdateCartBadge(); 
  ubOpenCart(); 
}

// Open/Close Drawer Controls
function ubOpenCart() {
  document.getElementById("cartDrawer").classList.add("active");
  document.getElementById("cartDrawerOverlay").classList.add("active");
  ubRenderCartDrawer();
}

function ubCloseCart() {
  document.getElementById("cartDrawer").classList.remove("active");
  document.getElementById("cartDrawerOverlay").classList.remove("active");
}

// Event listeners for navbar cart click & close buttons
document.addEventListener("DOMContentLoaded", function() {
  var cartBtn = document.getElementById("navCartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", function(e) {
      e.preventDefault();
      ubOpenCart();
    });
  }

  var closeBtn = document.getElementById("cartCloseBtn");
  if (closeBtn) closeBtn.addEventListener("click", ubCloseCart);

  var overlay = document.getElementById("cartDrawerOverlay");
  if (overlay) overlay.addEventListener("click", ubCloseCart);
});

// Render Cart Items & Total
function ubRenderCartDrawer() {
  var cart = ubGetCart();
  var container = document.getElementById("cartDrawerBody");
  var totalContainer = document.getElementById("cartTotalPrice");
  
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p style='text-align:center; color:#777;'>Your cart is empty.</p>";
    if (totalContainer) totalContainer.textContent = "Rs. 0.00";
    return;
  }

  var html = "";
  var grandTotal = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    // Find matching product details from UB_PRODUCTS array (defined in productsdata.js)
    var product = null;
    if (typeof UB_PRODUCTS !== "undefined") {
      for (var p = 0; p < UB_PRODUCTS.length; p++) {
        if (UB_PRODUCTS[p].id === item.id) {
          product = UB_PRODUCTS[p];
          break;
        }
      }
    }

    if (product) {
      var itemTotal = product.price * item.qty;
      grandTotal += itemTotal;

      html += '<div class="cart-item">' +
                '<div class="cart-item-info">' +
                  '<h4>' + product.name + '</h4>' +
                  '<span style="color:#666;">Rs. ' + product.price + ' x ' + item.qty + '</span>' +
                  '<div class="cart-item-controls">' +
                    '<button onclick="ubUpdateQty(' + item.id + ', -1)">-</button>' +
                    '<span>' + item.qty + '</span>' +
                    '<button onclick="ubUpdateQty(' + item.id + ', 1)">+</button>' +
                  '</div>' +
                '</div>' +
                '<button onclick="ubRemoveFromCart(' + item.id + ')" style="background:none; border:none; color:red; cursor:pointer;">Delete</button>' +
              '</div>';
    }
  }

  container.innerHTML = html;
  if (totalContainer) totalContainer.textContent = "Rs. " + grandTotal.toFixed(2);
}

// Update quantity helper (+ / -)
function ubUpdateQty(id, change) {
  var cart = ubGetCart();
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].qty += change;
      if (cart[i].qty <= 0) {
        cart.splice(i, 1); // Remove if quantity drops to 0
      }
      break;
    }
  }
  ubSaveCart(cart);
  ubUpdateCartBadge();
  ubRenderCartDrawer();
}

// Remove Item completely
function ubRemoveFromCart(id) {
  var cart = ubGetCart();
  cart = cart.filter(function(item) {
    return item.id !== id;
  });
  ubSaveCart(cart);
  ubUpdateCartBadge();
  ubRenderCartDrawer();
}

function showSlide(index) {
  slides.forEach(function(s) { s.classList.remove("active"); });
  dots.forEach(function(d) { d.classList.remove("active"); });
  if (slides[index]) slides[index].classList.add("active");
  if (dots[index]) dots[index].classList.add("active");
  currentSlide = index;
}

function nextSlide() {
  if (slides.length > 0) showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  if (slides.length > 0) showSlide((currentSlide - 1 + slides.length) % slides.length);
}

if (slides.length > 0) {
  autoSlide = setInterval(nextSlide, 4000);

  var nextBtn = document.getElementById("sliderNext");
  if (nextBtn) {
    nextBtn.addEventListener("click", function() {
      clearInterval(autoSlide);
      nextSlide();
      autoSlide = setInterval(nextSlide, 4000);
    });
  }

  var prevBtn = document.getElementById("sliderPrev");
  if (prevBtn) {
    prevBtn.addEventListener("click", function() {
      clearInterval(autoSlide);
      prevSlide();
      autoSlide = setInterval(nextSlide, 4000);
    });
  }

  dots.forEach(function(dot, i) {
    dot.addEventListener("click", function() {
      clearInterval(autoSlide);
      showSlide(i);
      autoSlide = setInterval(nextSlide, 4000);
    });
  });
}

var menuTrack = document.getElementById("menuTrack");
if (menuTrack) {
  var menuWrapper = menuTrack.parentElement;
  var menuNext = document.getElementById("menuNext");
  var menuPrev = document.getElementById("menuPrev");

  if (menuNext) {
    menuNext.addEventListener("click", function(e) {
      e.preventDefault();
      menuWrapper.scrollBy({ left: 300, behavior: "smooth" });
    });
  }

  if (menuPrev) {
    menuPrev.addEventListener("click", function(e) {
      e.preventDefault();
      menuWrapper.scrollBy({ left: -300, behavior: "smooth" });
    });
  }
}

var tTrack = document.getElementById("testimonialsTrack");
var tDotsEl = document.getElementById("testimonialsDots");
var tIndex = 0;

function ubTestimonialCardsPerView() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

if (tTrack) {
  var tCards = tTrack.querySelectorAll(".testimonial-card");
  var totalCards = tCards.length;
  var cardsPerView, totalGroups;

  function ubBuildTestimonialDots() {
    cardsPerView = ubTestimonialCardsPerView();
    totalGroups = Math.max(1, totalCards - cardsPerView + 1);
    tIndex = 0;
    tTrack.style.transform = "translateX(0px)";

    if (tDotsEl) {
      tDotsEl.innerHTML = "";
      for (var d = 0; d < totalGroups; d++) {
        var dot = document.createElement("div");
        dot.classList.add("t-dot");
        if (d === 0) dot.classList.add("active");
        (function(idx) {
          dot.addEventListener("click", function() { goToTestimonial(idx); });
        })(d);
        tDotsEl.appendChild(dot);
      }
    }
  }

  function goToTestimonial(index) {
    tIndex = index;
    if (tCards.length > 0) {
      var cardW = tCards.offsetWidth + 24;
      tTrack.style.transform = "translateX(-" + (tIndex * cardW) + "px)";
    }
    document.querySelectorAll(".t-dot").forEach(function(d, i) {
      d.classList.toggle("active", i === tIndex);
    });
  }

  ubBuildTestimonialDots();

  var tNextBtn = document.getElementById("tNext");
  if (tNextBtn) {
    tNextBtn.addEventListener("click", function() {
      if (tIndex < totalGroups - 1) goToTestimonial(tIndex + 1);
    });
  }

  var tPrevBtn = document.getElementById("tPrev");
  if (tPrevBtn) {
    tPrevBtn.addEventListener("click", function() {
      if (tIndex > 0) goToTestimonial(tIndex - 1);
    });
  }

  var tResizeTimer;
  window.addEventListener("resize", function() {
    clearTimeout(tResizeTimer);
    tResizeTimer = setTimeout(function() {
      if (ubTestimonialCardsPerView() !== cardsPerView) {
        ubBuildTestimonialDots();
      }
    }, 200);
  });
}

function updateNavbar() {
  var loggedIn = localStorage.getItem("ub_loggedIn");
  var userName = localStorage.getItem("ub_name");
  var loginBtn = document.getElementById("navLoginBtn");
  var userSection = document.getElementById("navUserSection");
  var userAvatar = document.getElementById("navUserAvatar");

  if (loggedIn === "true" && userName) {
    if (loginBtn) loginBtn.style.display = "none";
    if (userSection) userSection.style.display = "flex";
    if (userAvatar) userAvatar.textContent = userName.charAt(0).toUpperCase();
  } else {
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (userSection) userSection.style.display = "none";
  }
}

updateNavbar();

var logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function() {
    localStorage.removeItem("ub_loggedIn");
    window.location.href = "signup.html";
  });
}

function showError(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = "block";
}

function hideError(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = "none";
}

var signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("signupName").value.trim();
    var email = document.getElementById("signupEmail").value.trim();
    var password = document.getElementById("signupPassword").value;
    var confirm = document.getElementById("signupConfirm").value;
    var isValid = true;

    if (name.length < 3) { showError("signupNameErr"); isValid = false; } else { hideError("signupNameErr"); }
    if (!email.includes("@") || !email.includes(".")) { showError("signupEmailErr"); isValid = false; } else { hideError("signupEmailErr"); }
    if (password.length < 6) { showError("signupPassErr"); isValid = false; } else { hideError("signupPassErr"); }
    if (confirm !== password || confirm === "") { showError("signupConfirmErr"); isValid = false; } else { hideError("signupConfirmErr"); }

    if (isValid) {
      localStorage.setItem("ub_name", name);
      localStorage.setItem("ub_email", email);
      localStorage.setItem("ub_password", password);
      alert("Account created! Please login.");
      window.location.href = "login.html";
    }
  });
}

var loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var email = document.getElementById("loginEmail").value.trim();
    var password = document.getElementById("loginPassword").value;
    var isValid = true;

    if (!email.includes("@") || !email.includes(".")) { showError("loginEmailErr"); isValid = false; } else { hideError("loginEmailErr"); }
    if (password.length < 6) { showError("loginPassErr"); isValid = false; } else { hideError("loginPassErr"); }

    if (isValid) {
      var savedEmail = localStorage.getItem("ub_email");
      var savedPassword = localStorage.getItem("ub_password");

      if (email === savedEmail && password === savedPassword) {
        localStorage.setItem("ub_loggedIn", "true");
        window.location.href = "index.html";
      } else {
        alert("Invalid email or password. Please signup first.");
      }
    }
  });
}

var reservationForm = document.getElementById("reservationForm");
if (reservationForm) {
  reservationForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("resName").value.trim();
    var phone = document.getElementById("resPhone").value.trim();
    var date = document.getElementById("resDate").value;
    var time = document.getElementById("resTime").value;
    var guests = document.getElementById("resGuests").value;
    var isValid = true;

    if (name === "") { showError("resNameErr"); isValid = false; } else { hideError("resNameErr"); }
    if (phone === "") { showError("resPhoneErr"); isValid = false; } else { hideError("resPhoneErr"); }
    if (date === "") { showError("resDateErr"); isValid = false; } else { hideError("resDateErr"); }
    if (time === "") { showError("resTimeErr"); isValid = false; } else { hideError("resTimeErr"); }
    if (guests === "") { showError("resGuestsErr"); isValid = false; } else { hideError("resGuestsErr"); }

    if (isValid) {
      var msg = document.getElementById("reservationSuccess");
      if (msg) {
        msg.style.display = "block";
        msg.textContent = "✔ Your table is reserved! We look forward to seeing you, " + name + ".";
      }
      reservationForm.reset();
    }
  });
}

var contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("contactName").value.trim();
    var email = document.getElementById("contactEmail").value.trim();
    var message = document.getElementById("contactMsg").value.trim();
    var isValid = true;

    if (name === "") { showError("contactNameErr"); isValid = false; } else { hideError("contactNameErr"); }
    if (!email.includes("@") || !email.includes(".")) { showError("contactEmailErr"); isValid = false; } else { hideError("contactEmailErr"); }
    if (message === "") { showError("contactMsgErr"); isValid = false; } else { hideError("contactMsgErr"); }

    if (isValid) {
      var msg = document.getElementById("contactSuccess");
      if (msg) {
        msg.style.display = "block";
        msg.textContent = "Message sent! We will get back to you soon.";
      }
      contactForm.reset();
    }
  });
}

var pdImage = document.getElementById("pdImage");
var pdName = document.getElementById("pdName");
var pdPrice = document.getElementById("pdPrice");
var pdDesc = document.getElementById("pdDesc");
var pdQtyValue = document.getElementById("pdQtyValue");
var pdQtyMinus = document.getElementById("pdQtyMinus");
var pdQtyPlus = document.getElementById("pdQtyPlus");
var pdAddToCart = document.getElementById("pdAddToCart");

if (pdImage && typeof UB_PRODUCTS !== "undefined") {
  var urlParams = new URLSearchParams(window.location.search);
  var productId = parseInt(urlParams.get("id"), 10) || 1;
  var product = UB_PRODUCTS.find(function(p) { return p.id === productId; }) || UB_PRODUCTS;

  if (product) {
    pdImage.src = product.image;
    pdImage.alt = product.name;
    pdName.textContent = product.name;
    pdPrice.textContent = "Rs. " + product.price;
    pdDesc.textContent = product.longDesc || product.shortDesc;
  }

  var currentQty = 1;
  if (pdQtyMinus) {
    pdQtyMinus.addEventListener("click", function() {
      if (currentQty > 1) {
        currentQty--;
        if (pdQtyValue) pdQtyValue.textContent = currentQty;
      }
    });
  }
  if (pdQtyPlus) {
    pdQtyPlus.addEventListener("click", function() {
      currentQty++;
      if (pdQtyValue) pdQtyValue.textContent = currentQty;
    });
  }

  if (pdAddToCart) {
    pdAddToCart.addEventListener("click", function() {
      ubAddToCart(product.id, currentQty);
    });
  }
}

function ubGetCart() {
  var raw = localStorage.getItem("ub_cart");
  if (!raw) return [];
  try { return JSON.parse(raw); } catch(e) { return []; }
}

function ubSaveCart(cart) {
  localStorage.setItem("ub_cart", JSON.stringify(cart));
}