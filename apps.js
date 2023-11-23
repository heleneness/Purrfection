
// SLIDESHOW //

let slideIndex = 1;
showSlides(slideIndex);


function nextSlide() {
    showSlides(slideIndex += 1);
}

function previousSlide() {
    showSlides(slideIndex -= 1);  
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}


function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("item");
    
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
  
    for (let slide of slides) {
        slide.style.display = "none";
    }   
    slides[slideIndex - 1].style.display = "block"; 
}



// BACK TO TOP BUTTON

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    const backToTopButton = document.getElementById("backtotop");
    if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

// SHOPPING SITE

updateCartTotal();

document.getElementById("emptycart").addEventListener("click", emptyCart);
const btns = document.getElementsByClassName('addtocart');
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {addToCart(this);});
}

// ADD TO CART FUNCTIONS

function addToCart(elem) {
    let sibs = [];
    let getprice;
    let getproductName;
    let cart = [];
    let stringCart;
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; 
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    let product = {
        productname : getproductName,
        price : getprice
    };

    let stringProduct = JSON.stringify(product);
    
    if(!sessionStorage.getItem("cart")){
        cart.push(stringProduct);
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem("cart", stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
       cart = JSON.parse(sessionStorage.getItem("cart"));
        cart.push(stringProduct);
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem("cart", stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}
// CART TOTAL

function updateCartTotal(){
    let total = 0;
    let price = 0;
    let items = 0;
    let productname = "";
    let carttable = "";
    if(sessionStorage.getItem("cart")) {
        let cart = JSON.parse(sessionStorage.getItem("cart"));
        items = cart.length;
        for (let i = 0; i < items; i++){
            let x = JSON.parse(cart[i]);
            price = parseFloat(x.price.split("€")[1]);
            productname = x.productname;
            carttable += "<tr><td>" + productname + "</td><td>" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
        
    }
    document.getElementById("total").innerHTML = total.toFixed(2);
    document.getElementById("carttable").innerHTML = carttable;
    document.getElementById("itemsquantity").innerHTML = items;
}


// MESSAGE ADDED TO CART

function addedToCart(pname) {
  let message = pname + " was added to the cart";
  let alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}


// EMPTY CART

function emptyCart() {
    if(sessionStorage.getItem("cart")){
        sessionStorage.removeItem("cart");
        updateCartTotal();
      let alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}

// CHECKOUT BUTTON -- OPENS A POPUP 

function openCheckoutPopup() {
    let popup = window.open(" ", "Checkout", "width=420,height=610");

    if (popup) {
      popup.document.write("<html><head><title></title></head><body><img id='popupImage' src='Images/itworks.webp' alt='Drawing'></body></html>");

    }
    else {
        alert("Sorry, Out Of Function!");
      }
      
  }

// SUBMIT BUTTON

function submitForm() {
    alert("Thank You! We will respond within 24 hours.");
 }




  