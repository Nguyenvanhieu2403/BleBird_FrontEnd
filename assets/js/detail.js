// function showInfor(elementId){
//     let element = document.getElementById(elementId)
//     if(element.style.display === "none"){
//         element.style.display = "block";
//     }
//     else{
//         element.style.display = "none";
//     }
// }

// Tăng, giảm số lượng
// const decrementButton = document.getElementById("decrease");
// const incrementButton = document.getElementById("increment");
// const quantitySpan = document.getElementById("quantity");

// // Số lượng ban đầu
// let quantity = 1;
// incrementButton.addEventListener("click", function() {
//     quantity++;
//     quantitySpan.textContent = quantity;
// });
// decrementButton.addEventListener("click", function() {
//     if (quantity > 1) {
//         quantity--;
//         quantitySpan.textContent = quantity;
//     }
// });

let displayOverlay = document.getElementById("overlay");
let displayPaymentForm = document.getElementById("product_payment--form");
let displayPaymentInfor = document.getElementById("payment_form--infor");

function showPayment() {
  if (
    displayOverlay.style.display === "none" &&
    displayPaymentForm.style.display === "none"
  ) {
    displayOverlay.style.display = "block";
    displayPaymentForm.style.display = "block";
  } else {
    displayOverlay.style.display = "none";
    displayPaymentForm.style.display = "none";
  }
}

function showPaymentInfor() {
  displayPaymentInfor.style.display = "block";
}

function handlePaymentMethodChange() {
  var selectElement = document.getElementById("pay__selected");
  var selectedValue = selectElement.value;

  if (selectedValue === "2") {
    showPayment();
  }
}

// Tăng, giảm

var quantity = 1;

function increase() {
  const amountElement = document.getElementById("quantity");
  const amount = amountElement.value;
  let quantity = parseInt(amount);
  quantity++;
  amountElement.value = quantity;
}

function reduce() {
  const amountElement = document.getElementById("quantity");
  const amount = amountElement.value;
  let quantity = parseInt(amount);
  if (quantity > 1) {
    quantity--;
    amountElement.value = quantity;
  }
}

// Thay đổi ảnh

// const big_img = document.getElementById('big_img')

// function changeImg1() {
//     big_img.src = '../assets/img/Bag/Bag1/bag1.1.jpg'
// }
// function changeImg2() {
//     big_img.src = '../assets/img/Bag/Bag1/bag1.2.jpg'
// }
// function changeImg3() {
//     big_img.src = '../assets/img/Bag/Bag1/bag1.3.jpg'
// }
// function changeImg4() {
//     big_img.src = '../assets/img/Bag/Bag1/bag1.4.jpg'
// }

// Contact

function openContact() {
  var overlay = document.getElementById("overlay");
  var contact = document.getElementById("contact");
  overlay.style.display = "block";
  contact.style.display = "block";
  console.log(123);
}

function closeContact() {
  var overlay = document.getElementById("overlay");
  var contact = document.getElementById("contact");
  overlay.style.display = "none";
  contact.style.display = "none";
}

const chooses = document.querySelectorAll(".choose_img");
const img_main = document.getElementById("big_img");

chooses.forEach((choose) => {
  choose.onclick = function () {
    document.querySelector(".choose_img.main").classList.remove("main");
    this.classList.add("main");
    img_main.src = this.src;
  };
});
