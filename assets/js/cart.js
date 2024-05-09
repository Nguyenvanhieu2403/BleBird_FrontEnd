// // Contact

// function openContact() {
//     var overlay = document.getElementById('overlay')
//     var contact = document.getElementById('contact');
//     overlay.style.display = 'block';
//     contact.style.display = 'block';
// }
  
// function closeContact() {
//     var overlay = document.getElementById('overlay')
//     var contact = document.getElementById('contact');
//     overlay.style.display = 'none';
//     contact.style.display = 'none';
// }

// // Tính tiền từng sản phẩm

// const plusButton = document.querySelectorAll('.plus')

// plusButton.forEach(plus => {
//     plus.onclick = function() {
//         document.querySelector('.plus.main').classList.remove('main')
//         this.classList.add('main')
        
//     }
// })



function ChangeNumber() {
    var productContainers = document.querySelectorAll('.product_information--price');
    var inputChecks = document.querySelectorAll('.select_check');
    var total = document.querySelector('.total_payment');

    productContainers.forEach(container => {
        var valueQuantity = container.querySelector('.quantity');
        var valueTotal = container.querySelector('.price_total');
        var productPriceElement = container.closest('.cart').querySelector('.product_price');
        var price = parseInt(productPriceElement.textContent);

        var quantity = parseInt(valueQuantity.value);

        var plusButton = container.querySelector('.plus');
        var minusButton = container.querySelector('.minus');

        plusButton.onclick = function() {
            quantity++;
            valueQuantity.value = quantity;
            valueTotal.innerHTML = quantity * price; // Cập nhật giá trị total dựa trên số lượng mới và giá sản phẩm
            updateTotal();
        };

        minusButton.onclick = function() {
            if (quantity > 1) {
                quantity--;
                valueQuantity.value = quantity;
                valueTotal.innerHTML = quantity * price; // Cập nhật giá trị total dựa trên số lượng mới và giá sản phẩm
                updateTotal();
            }
        };
    });

    inputChecks.forEach(check => {
        check.addEventListener('change', function() {
            var totalAmount = 0;
            inputChecks.forEach(inputCheck => {
                if (inputCheck.checked) {
                    var productContainer = inputCheck.closest('.cart');
                    var productTotal = productContainer.querySelector('.price_total');
                    totalAmount += parseInt(productTotal.textContent);
                }
            });
            total.innerHTML = totalAmount;
        });
    });

    function updateTotal() {
        var totalAmount = 0;
        inputChecks.forEach(inputCheck => {
            if (inputCheck.checked) {
                var productContainer = inputCheck.closest('.cart');
                var productTotal = productContainer.querySelector('.price_total');
                totalAmount += parseInt(productTotal.textContent);
            }
        });
        total.textContent = totalAmount;
    }

    var selectAllCheckbox = document.querySelector('.select_all input[type="checkbox"]');
    selectAllCheckbox.addEventListener('change', function() {
        var isChecked = selectAllCheckbox.checked;

        // Đặt trạng thái của các checkbox sản phẩm dựa trên trạng thái của 'Select all'
        inputChecks.forEach(inputCheck => {
            inputCheck.checked = isChecked;
        });

        // Cập nhật tổng thanh toán dựa trên trạng thái của 'Select all'
        updateTotal();
    });

}

ChangeNumber();

function updateTotalPrices() {
    // Lấy tất cả các phần tử giỏ hàng
var carts = document.querySelectorAll('.cart');

    // Lặp qua mỗi phần tử giỏ hàng và cập nhật tổng giá
    carts.forEach(function(cart, index) {
        var quantity = cart.querySelector('.quantity').value;
        var productPrice = cart.querySelector('.product_price').textContent;
        var totalPrice = quantity * productPrice;
        cart.querySelector('.price_total').textContent = totalPrice;
    });
}


updateTotalPrices();


function Check() {
    var productContainers = document.querySelectorAll('.product_information--price');
    var inputChecks = document.querySelectorAll('.select_check');
    var total = document.querySelector('.total_payment');

    productContainers.forEach(container => {
        var valueQuantity = container.querySelector('.quantity');
        var valueTotal = container.querySelector('.price_total');
        var productPriceElement = container.closest('.cart').querySelector('.product_price');
        var price = parseInt(productPriceElement.textContent);

        var quantity = parseInt(valueQuantity.value);

        var plusButton = container.querySelector('.plus');
        var minusButton = container.querySelector('.minus');

        plusButton.onclick = function() {
            quantity++;
            valueQuantity.value = quantity;
            valueTotal.innerHTML = quantity * price; // Cập nhật giá trị total dựa trên số lượng mới và giá sản phẩm
            updateTotal();
        };

        minusButton.onclick = function() {
            if (quantity > 1) {
                quantity--;
                valueQuantity.value = quantity;
                valueTotal.innerHTML = quantity * price; // Cập nhật giá trị total dựa trên số lượng mới và giá sản phẩm
                updateTotal();
            }
        };
    });

    inputChecks.forEach(check => {
        check.addEventListener('change', function() {
            var totalAmount = 0;
            inputChecks.forEach(inputCheck => {
                if (inputCheck.checked) {
                    var productContainer = inputCheck.closest('.cart');
                    var productTotal = productContainer.querySelector('.price_total');
                    totalAmount += parseInt(productTotal.textContent);
                }
            });
            total.innerHTML = totalAmount;
        });
    });

    function updateTotal() {
        var totalAmount = 0;
        inputChecks.forEach(inputCheck => {
            if (inputCheck.checked) {
                var productContainer = inputCheck.closest('.cart');
                var productTotal = productContainer.querySelector('.price_total');
                totalAmount += parseInt(productTotal.textContent);
            }
        });
        total.textContent = totalAmount;
    }

}

function CheckAll() {
    var inputChecks = document.querySelectorAll('.select_check');
    var total = document.querySelector('.total_payment');
function updateTotal() {
        var totalAmount = 0;
        inputChecks.forEach(inputCheck => {
            if (inputCheck.checked) {
                var productContainer = inputCheck.closest('.cart');
                var productTotal = productContainer.querySelector('.price_total');
                totalAmount += parseInt(productTotal.textContent);
            }
        });
        total.textContent = totalAmount;
    }

    var selectAllCheckbox = document.querySelector('.select_all input[type="checkbox"]');
    selectAllCheckbox.addEventListener('change', function() {
        var isChecked = selectAllCheckbox.checked;

        // Đặt trạng thái của các checkbox sản phẩm dựa trên trạng thái của 'Select all'
        inputChecks.forEach(inputCheck => {
            inputCheck.checked = isChecked;
        });

        // Cập nhật tổng thanh toán dựa trên trạng thái của 'Select all'
        updateTotal();
    });
    console.log(456)
}