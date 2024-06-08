function Login() {
  const loginUrl = "https://localhost:7029/api/Users/SignIn";
  const username = document.getElementById("userName").value;
  const password = document.getElementById("passWord").value;
  fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        alert(
          "Đăng nhập không thành công.\nVui lòng kiểm tra lại tài khoản và mật khẩu"
        );
        throw new Error("Đăng nhập không thành công.");
      }
      return response.json();
    })
    .then((data) => {
      if (
        data.token === "Tên đăng nhập hoặc mật khẩu không đúng" ||
        data.token ===
          "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin để mở"
      ) {
        alert(data.token);
      } else {
        // Xử lý dữ liệu trả về từ API
        // console.log(data);
        // const setjson=JSON.stringify(data);

        localStorage.setItem("login", data.token);
        // Thực hiện các hành động khác sau khi đăng nhập thành công
        const namelogin = data.name;
        localStorage.setItem("fullname", namelogin);
        localStorage.setItem("email", data.email);
        localStorage.setItem("avata", data.avata);
        localStorage.setItem("role", data.role);
        if (data.status === "Thành công") {
          window.location.href = "../../index.html";
        } else {
          alert(data.token);
        }
      }

      // localStorage.removeItem("signin");
    })
    .catch((error) => {
      // Xử lý lỗi
      console.error(error);
    });
}

function CheckRole() {
  var role = localStorage.getItem("role");
  if (role == "Admin") {
    var function__admin = document.getElementById("function__admin");
    function__admin.style.display = "block";
    var function__itemCart = document.getElementById("function__item--cart");
    function__itemCart.style.display = "none";
    var function__itemHistory = document.getElementById("function__item--history" );
    function__itemHistory.style.display = "none"; 
  } else if (role == "User") {
    var function__admin = document.getElementById("function__admin");
    function__admin.style.display = "none";
    var function__item__shop = document.getElementById("function__item--shop");
    function__item__shop.style.display = "none";
  } else if (role == "Shop") {
    var function__admin = document.getElementById("function__admin");
    function__admin.style.display = "none";
    var function__itemCart = document.getElementById("function__item--cart");
    function__itemCart.style.display = "none";
    var function__itemHistory = document.getElementById("function__item--history");
    function__itemHistory.style.display = "none"; 
  }
}

function SignIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmpassword = document.getElementById("confirm_password").value;
  const firstname = document.getElementById("first_name").value;
  const lastname = document.getElementById("last_name").value;
  const NumberPhone = document.getElementById("phone_number").value;
  const Address = document.getElementById("address").value;
  // const avataShop = document.getElementById("imageInput").value;
  const avataShop = "123";
  // const BrandName = document.getElementById("brandName").value;
  const BrandName = "123";
  // const CheckShop = document.getElementById("action");
  if (false) {
    const signinUrl = "https://localhost:7029/api/Users/SignUpShop";
    fetch(signinUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_Name: firstname,
        last_Name: lastname,
        email: email,
        password: NumberPhone,
        confirmPassword: password,
        phone: confirmpassword,
        address: Address,
        brandName: BrandName,
        avata: avataShop,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Đăng ký không thành công.\nVui long kiểm tra lại");
          throw new Error("Đăng ký không thành công.");
        }
        return response.json();
      })
      .then((data) => {
        // Xử lý dữ liệu trả về từ API
        alert(data.result);
        // window,location.href = "index.html";
        // alert(data.result);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error(error);
      });
  } else {
    const signinUrl = "https://localhost:7029/api/Users/SignUp";
    fetch(signinUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_Name: firstname,
        last_Name: lastname,
        email: email,
        password: password,
        confirmPassword: confirmpassword,
        phone: NumberPhone,
        address: Address,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Đăng ký không thành công.\nVui long kiểm tra lại");
          throw new Error("Đăng ký không thành công.");
        }
        return response.json();
      })
      .then((data) => {
        // Xử lý dữ liệu trả về từ API
        alert(data.result);
        // window,location.href = "index.html";
        // alert(data.result);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error(error);
      });
  }
}

async function displayProductByProductType(
  pageIndex,
  productType,
  IdClass,
  NameProduct
) {
  try {
    const getClassUrl = `https://localhost:7029/api/Product?pageIndex=${pageIndex}&pageSize=5&ProductType=${productType}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById(IdClass);
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      // const productTitle = document.createElement('div');
      //     productTitle.className = 'col l-12'
      //     productTitle.innerHTML = `
      //         <div class="product_bag--heading">
      //             <h2>${NameProduct}</h2>
      //         </div>
      //     `;
      //     productContainer.appendChild(productTitle);
      data.result.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "col l-2-4 m-4 c-6 fix_padding";
        let sales = Math.floor(Math.random() * 50);
        productDiv.innerHTML = `
                    <div class="product_shoe--item"  onclick="InsertIdProductFromShopLocal('${
                      product.id
                    }')">
                        <div class="shoe_item--img">
                            <i class="fa-sharp fa-solid fa-bookmark shoe_item--icon"></i>
                            <img src="${product.images[0].img || ""}" alt="${
          product.name
        }" class="fix__height--img">
                        </div>
                        <div class="shoe_item--content">
                            <div class="bag_content--discount">
                                <p>Sale</p><span>${sales}%</span>
                            </div>
                            <div class="shoe_content--name">
                                <span>${product.name}</span>
                            </div>
                            <div class="shoe_content--price">
                                <span>$${product.price}</span>
                            </div>
                        </div>
                    </div>
                `;

        productContainer.appendChild(productDiv);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

// Call API Page Bag

async function displayPageBagByProductType(
  pageIndex,
  productType,
  IdClass,
  NameProduct
) {
  try {
    const getClassUrl = `https://localhost:7029/api/Product?pageIndex=${pageIndex}&pageSize=20&ProductType=${productType}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById(IdClass);
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      data.result.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product product__one";
        productDiv.style.textAlign = "center";
        productDiv.innerHTML = `
                    <div onclick="InsertIdProductFromShopLocal('${
                      product.id
                    }')">
                        <img src="${product.images[0].img || ""}" alt="${
          product.name
        }">
                        <div class="product__one--name">
                            <p>${product.name}</p>
                        </div>
                        <div class="product__one--price">
                            <span>$${product.price}</span>
                        </div>
                    </div>
                    
                `;

        productContainer.appendChild(productDiv);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

async function FindByProductType(IdClass, NameProduct) {
  var search = document.getElementById("input__search").value;
  try {
    const getClassUrl = `https://localhost:7029/api/Product/Search?search=${search}&pageIndex=1&pageSize=20`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById(IdClass);
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      data.result.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product product__one";
        productDiv.innerHTML = `
                    <div onclick="InsertIdProductFromShopLocal('${
                      product.id
                    }')">
                        <img src="${product.images[0].img || ""}" alt="${
          product.name
        }">
                        <div class="product__one--name">
                            <p>${product.name}</p>
                        </div>
                        <div class="product__one--price">
                            <span>$${product.price}</span>
                        </div>
                    </div>
                    
                `;

        productContainer.appendChild(productDiv);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

// Call api history order

async function ShowHistoryOrders(pageIndex, IdClass) {
  try {
    var token = localStorage.getItem("login");
    const getClassUrl = `https://localhost:7029/api/Orders?pageIndex=${pageIndex}&pageSize=1000&token=${token}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById(IdClass);
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      data.result.forEach((product) => {
        let ShipStatus = product.usedStatus;
        if (ShipStatus == 3) {
          ShipStatus = "Waiting for confirmation from the shop";
        } else if (ShipStatus == 4) {
          ShipStatus = "Delivered to the carrier";
        } else if (ShipStatus == 5) {
          ShipStatus = "Delivering to you";
        } else if (ShipStatus == 6) {
          ShipStatus = "Order has been delivered successfully";
        }
        // Phân định dạng tiền
        var totalPrice = product.totalPrice
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var price = product.price
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var shipPrice = product.shipPrice
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        function formatPrice(price) {
          if (price.endsWith(".00")) {
            return price.slice(0, -3); // Loại bỏ phần thập phân .00
          }
          return price;
        }

        var productDiv = document.createElement("div");
        productDiv.className = "history__product";

        productDiv.innerHTML = `


                        <div class="shop">
                            <div class="check">
                                <p class="real">Mall</p>
                            </div>
                            <div class="shop_name">
                                <p> ${product.brandName} </p>
                            </div>
                            <div class="viewstore" onclick="InsertIdProductLocal('${
                              product.idProduct
                            }')">
                                <i class="fa-solid fa-shop"></i>
                                <a href="#">View store</a>
                            </div>
                        </div>
                        <div class="product_information">
                            <div class="product_information--img">
                                <img src="${product.img}" alt="">
                            </div>
                            <div class="product_information--info">
                                <p class="product_name">${product.name}</p>
                                <p class="product_color">Color: ${
                                  product.color
                                }</p>
                                <p class="product_quantity">Quantity: ${
                                  product.number
                                }</p>
                                <p class="product_size">Size: ${
                                  product.size
                                }</p>
                            </div>
                            <div class="product_information--price">
                                <p class="product_price">Price: ${formatPrice(
                                  price
                                )}</p>
                                <p class="product_ship">Ship: ${formatPrice(
                                  shipPrice
                                )}</p>
                                <p class="product_total">Total: ${formatPrice(
                                  totalPrice
                                )}</p>
                            </div>
                        </div>
                        <div class="status">
                            <i class="fa-solid fa-truck"></i>
                            <span>${ShipStatus}</span>
                        </div>
                        <div class="option">
                            <div class="feedback" onclick="InsertIdProductFromShopLocal('${
                              product.idProduct
                            }')">
                                <button>Feedback</button>
                            </div>
                            <div class="buyback" onclick="InsertIdProductFromShopLocal('${
                              product.idProduct
                            }')">
                                <button>Buy back</button>
                            </div>
                        </div>
                `;

        productContainer.appendChild(productDiv);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

// Change Password

function ChangePassWord() {
  const token = localStorage.getItem("login");
  const passOld = document.getElementById("oldpass_input").value;
  const passNew = document.getElementById("newpass_input").value;
  const ConfirmPass = document.getElementById("enternewpass_input").value;
  const loginUrl = `https://localhost:7029/api/ChangePassWord?token=${token}`;
  fetch(loginUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      passWordOld: passOld,
      passWordNew: passNew,
      confirmPassWord: ConfirmPass,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        alert("Sửa mật khẩu không thành công");
        throw new Error("Sửa mật khẩu không thành công");
      }
      return response.json();
    })
    .then((data) => {
      alert(data.result);
      location.reload(true);
    })
    .catch((error) => {
      // Xử lý lỗi
      console.error(error);
    });
}

// Get Address

async function GetAddress() {
  try {
    var token = localStorage.getItem("login");
    const getClassUrl = `https://localhost:7029/api/ChangeAddress?token=${token}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById("left");
    productContainer.innerHTML = "";

    if (data.statusCode === 400) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      var productDiv = document.createElement("div");
      productDiv.className = "left_test";

      productDiv.innerHTML = `
                <h4>${data.result.firstName + " " + data.result.lastName} | 0${
        data.result.phoneNumber
      }</h4>
                <h4>${data.result.address}</h4>
            `;

      productContainer.appendChild(productDiv);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

// Update Address
function ChangeAddress() {
  const token = localStorage.getItem("login");
  const fistname = document.getElementById("FirstName").value;
  const lastname = document.getElementById("LastName").value;
  const phone = document.getElementById("Phone").value;
  const address = document.getElementById("textarea").value;
  const loginUrl = `https://localhost:7029/api/ChangeAddress?token=${token}`;
  fetch(loginUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: fistname,
      lastName: lastname,
      phoneNumber: phone,
      address: address,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        alert("Sửa địa chỉ không thành công");
        throw new Error("Sửa địa chỉ không thành công");
      }
      return response.json();
    })
    .then((data) => {
      alert(data.result);
      location.reload(true);
    })
    .catch((error) => {
      // Xử lý lỗi
      console.error(error);
    });
}

//   Call api Get All My Shop

async function GetAllProductMyShop(search) {
  try {
    var token = localStorage.getItem("login");
    const getClassUrl = `https://localhost:7029/api/GetProductMyShop?token=${token}&search=${search}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById("product_manager");
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      const table = document.createElement("table");
      table.id = "product__myshop";
      table.innerHTML = `
                    <thead id="product__myshop--title">
                        <tr>
                            <th style="width: 10%;">Image</th>
                            <th style="width: 30%;">Product's name</th>
                            <th style="width: 10%;">Category</th>
                            <th style="width: 10%;">Quantity</th>
                            <th style="width: 10%;">Sold</th>
                            <th style="width: 10%;">Action</th>
                            <th style="width: 10%;">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                `;
      productContainer.appendChild(table);
      data.result.forEach((product) => {
        var productDiv = document.createElement("tr");
        productDiv.className = "product__myshop--body";

        productDiv.innerHTML = `
                <td style="width: 10%;"><img class="td_img" src="${product.img}" alt=""></td>
                <td style="width: 30%;" class="product_name">${product.nameProduct}</td>
                <td style="width: 10%;"> ${product.category}</td>
                <td style="width: 10%;" ${product.quantity}</td>
                <td style="width: 10%;">${product.sold}</td>
                <td style="width: 10%;" class="product_details" onclick="InsertIdProductFromShopLocal('${product.id}')">
                    <a href="#">Details</a>
                </td>
                <td style="width: 10%;" class="option">
                    <div class="select_option--detail">
                        <i class="fa-regular fa-trash-can delete--icon" style="cursor: pointer;" onclick="DeleteProduct('${product.id}')" ></i>
                        <a href="#" onclick="FixProductNextPage('${product.id}')">
                            <i class="fa-solid fa-screwdriver-wrench"></i>
                        </a>
                    </div>
                </td>
                `;

        productContainer.appendChild(productDiv);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

async function GetAllProductMyShopOnMobile(search) {
  try {
    var token = localStorage.getItem("login");
    const getClassUrl = `https://localhost:7029/api/GetProductMyShop?token=${token}&search=${search}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById("product_manager--mobile");
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      data.result.forEach((product) => {
        var productDiv = document.createElement("div");
        productDiv.className = "col c-12";

        productDiv.innerHTML = `
                <div class="shopProdcut">
                <div class="shopProduct__img">
                    <img src="${product.img}" alt="">
                    </div>
                    <div class="shopProduct__infor">
                        <div class="shopProduct__infor--heading">Product's name: ${product.nameProduct}</div>
                        <div class="shopProduct__infor--category">Category:	${product.category}</div>
                        <div class="shopProduct__infor--quantity">Quantity: ${product.quantity}</div>
                        <div class="shopProduct__infor--sold">Sold: ${product.sold}</div>
                        <div class="shopProdcut__infor--action product_details" onclick="InsertIdProductFromShopLocal('${product.id}')"><a href="#">Action: Details</a></div>
                        <div class="shopProdcut__infor--option option">
                            <div class="select_option--detail">
                                <i class="fa-regular fa-trash-can delete--icon" style="cursor: pointer;" onclick="DeleteProduct('${product.id}')" ></i>
                                <a href="#" onclick="FixProductNextPage('${product.id}')">
                                    <i class="fa-solid fa-screwdriver-wrench"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
        productContainer.appendChild(productDiv);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

// Add product
async function GetCategory() {
  try {
    const getClassUrl = `https://localhost:7029/api/ProductType?pageIndex=1&pageSize=100`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById("body__productcategory");
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<p id="Data__null">Không có dữ liệu</p>';
    } else {
      var productSelect__title = document.createElement("label");
      productSelect__title.className = "productcategory_label";
      productSelect__title.textContent = "Category";
      productContainer.appendChild(productSelect__title);
      var productSelect = document.createElement("select");
      productSelect.id = "select__type";
      data.result.forEach((product) => {
        var option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
      });
      productContainer.appendChild(productSelect);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

// async function GetCategoryMain() {
//     try {
//         const getClassUrl = `https://localhost:7029/api/ProductType?pageIndex=1&pageSize=100`;
//         const response = await fetch(getClassUrl);
//         const data = await response.json();

//         const productContainer = document.getElementById("body__productcategory");
//         productContainer.innerHTML = '';

//         if (!Array.isArray(data.result) || data.result.length === 0) {
//             productContainer.innerHTML = '<p id="Data__null">Không có dữ liệu</p>';
//         } else {
//             var productSelect__title = document.createElement("label");
//             productSelect__title.className = "productcategory_label"
//             productSelect__title.textContent = "Category";
//             productContainer.appendChild(productSelect__title)
//             var productSelect = document.createElement('select');
//             productSelect.id = "select__type"
//             data.result.forEach(product => {
//                 var option = document.createElement('option');
//                 option.value = product.id;
//                 option.textContent = product.name;
//                 productSelect.appendChild(option);
//             });
//             productContainer.appendChild(productSelect);
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         alert(error);
//     }
// }

async function  AddProduct() {
  const token = localStorage.getItem("login");
  const name_product = document.getElementById("productname_input").value;
  // const img_main = document.getElementById("productimg_input--img__main").value;
  // const img_1 = document.getElementById("productimg_input--img__1").value;
  // const img_2 = document.getElementById("productimg_input--img__2").value;
  // const img_3 = document.getElementById("productimg_input--img__3").value;
  // const img_4 = document.getElementById("productimg_input--img__4").value;

  var seafoodImages = [];

  var imageInputs = [
    "productimg_input--img__main",
    "productimg_input--img__1",
    "productimg_input--img__2",
    "productimg_input--img__3",
    "productimg_input--img__4",
  ];

  const uploadImage = imageInputs.map(async (id, index) => {
    var imageName = document.getElementById(id); // Lấy tên ảnh từ dataset

    if (imageName) {
      const file = imageName.files[0];
      if (!file) {
        alert("Please select a file first!");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          "https://localhost:7029/api/Product/UploadImgProduct",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result.id);
        const linkImg = `https://drive.google.com/thumbnail?id=${result.id}&sz=w800`;
        seafoodImages.push({ nameImage: linkImg, index: index});
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to upload file!");
      }
    }
  });

  await Promise.all(uploadImage);

  seafoodImages.sort((a, b) => a.index - b.index);
  console.log(seafoodImages);


  const product_information =
    document.getElementById("productinfo_input").value;
  const product_detail = document.getElementById("productdetails_input").value;
  const price = document.getElementById("productprice_input").value;
  // const Material = document.getElementById("productmaterial_input").value;
  const type = document.getElementById("select__type").value;
  const colors = getTableData().color;
  const sizes = getTableData().size;
  const numbers = getTableData().number;

  const loginUrl = `https://localhost:7029/api/Product?token=${token}`;
  fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name_product,
      idProducer: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      idProductType: type,
      material: "123",
      price: price,
      description: product_information,
      idDiscount: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      images: [
        {
          img: seafoodImages[0].nameImage,
          usedStatus: 1,
        },
        {
          img: seafoodImages[1].nameImage,
          usedStatus: 2,
        },
        {
          img: seafoodImages[2].nameImage,
          usedStatus: 2,
        },
        {
          img: seafoodImages[3].nameImage,
          usedStatus: 2,
        },
        {
          img: seafoodImages[4].nameImage,
          usedStatus: 2,
        },
      ],
      product_Detail: generateProductDetail(
        colors,
        sizes,
        product_detail,
        numbers
      ),
    }),
  })
    .then((response) => {
      if (!response.ok) {
        alert("Thêm sản phẩm không thành công");
        throw new Error("Thêm sản phẩm không thành công");
      }
      return response.json();
    })
    .then((data) => {
      alert(data.result);
      location.reload(true);
    })
    .catch((error) => {
      // Xử lý lỗi
      console.error(error);
    });
}

function generateProductDetail(colors, sizes, productDetail, numbers) {
  const productDetailArray = [];

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const color = colors[i % colors.length]; // Lấy màu tương ứng với kích thước hiện tại
    const number = numbers[i % numbers.length];

    productDetailArray.push({
      number: number,
      description: productDetail,
      color: color,
      size: size,
    });
  }

  return productDetailArray;
}

function getTableData() {
  const table = document.getElementById("table_size");
  const sizeRow = table.querySelector("#header_size + #header_long");
  const colorRow = table.querySelector("#header_long + #header_height");
  const numberRow = table.querySelector("#header_height");

  const sizeData = getSizeData(sizeRow);
  const colorData = getColorData(colorRow);
  const numberData = getNumberData(numberRow);
  return {
    size: sizeData,
    color: colorData,
    number: numberData,
  };
}

function getSizeData(row) {
  const cells = row.getElementsByTagName("td");
  const sizeData = [];

  for (let i = 1; i < cells.length; i++) {
    sizeData.push(cells[i].textContent);
  }

  return sizeData;
}

function getColorData(row) {
  const cells = row.getElementsByTagName("td");
  const colorData = [];

  for (let i = 1; i < cells.length; i++) {
    colorData.push(cells[i].textContent);
  }

  return colorData;
}

function getNumberData(row) {
  const cells = row.getElementsByTagName("td");
  const numberData = [];

  for (let i = 1; i < cells.length; i++) {
    numberData.push(cells[i].textContent);
  }

  return numberData;
}

async function GetAllCart(pageIndex, pageSize, search) {
  try {
    var token = localStorage.getItem("login");
    const getClassUrl = `https://localhost:7029/api/Cart?pageIndex=${pageIndex}&pageSize=${pageSize}&token=${token}&search=${search}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById("my_cart");
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      data.result.forEach((product) => {
        var productDiv = document.createElement("div");
        productDiv.className = "cart";
        productDiv.setAttribute("data-cart-id", product.id);
        let BrandType = product.brandName;
        if (product.brandName == "BleuBird") BrandType = "Mall";
        else BrandType = "Yêu thích";
        productDiv.innerHTML = `
                    <div class="shop">
                        <div class="check">
                            <p class="real">${BrandType}</p>
                        </div>
                        <div class="shop_name">
                            <p>${product.brandName}</p>
                        </div>
                        <div class="viewstore" onclick="InsertIdProductLocal('${product.id}')">
                            <i class="fa-solid fa-shop"></i>
                            <a href="#" >View store</a>
                        </div>
                        <div class="select">
                            <input class="select_check" id="SelectCheckCart" type="checkbox"  onclick="CaculateTotalPayment()">
                        </div>
                    </div>
                    <div class="product_information">
                        <div class="product_information--img">
                            <img src="${product.img}" alt="">
                        </div>
                        <div class="product_information--info">
                            <p class="product_name">${product.nameProduct}</p>
                            <p class="product_color">Color: ${product.color}</p>
                            <p class="product_size">Size: ${product.size}</p>
                            <span>Price:</span>
                            <span class="product_price" id="product_price">${product.totalPrice}</span>
                        </div>
                        <div class="product_information--price">
                            <div class="product_quantity">
                                <span>Quantity</span>
                                <button class="minus" id="minus" onclick="ChangeNumber()"><i class="fa-solid fa-minus"></i></button>
                                <input class="quantity" id="quantityInput" type="text" value="${product.number}">
                                <button class="plus" id="plus" onclick="ChangeNumber()"><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <div class="product_price">
                                <span class="product_total">Total:</span>
                                <span class="price_total" id="price_total">${product.totalPrice}</span>
                            </div>
                            <div class="product_delete" onclick="DeleteCart('${product.id}')">
                                <button>DELETE</button>
                            </div>
                        </div>
                    </div>
                `;

        productContainer.appendChild(productDiv);
      });

      const table = document.createElement("div");
      (table.id = "option"), (table.className = "option");
      table.innerHTML = `
                <div class="select_all">
                    <div>
                        <input type="checkbox" id="SelectAllCart" onClick="SelectAllCart()">
                        <span>Select all</span>
                    </div>
                    <span onClick="DeleteToOrderList()">Delete</span>
                    <div>
                        <span>Total payment: </span>
                        <span class="total_payment" id="total_payment">0</span>
                    </div>
                    <button onClick="AddToOrderList()">BUY NOW</button>
                    </div>
                `;
      productContainer.appendChild(table);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}
let selectedCartIds = [];
function SelectAllCart() {
  const SelectAllCart = document.getElementById("SelectAllCart");
  const checkboxes = document.querySelectorAll('input[id="SelectCheckCart"]');

  SelectAllCart.addEventListener("click", function () {
    // Gọi hàm xử lý khi checkbox "SelectAllCart" thay đổi trạng thái
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = SelectAllCart.checked;
    });
    CaculateTotalPayment();
  });
}

function CaculateTotalPayment() {
  const checkboxes = document.querySelectorAll(
    'input[id="SelectCheckCart"]:checked'
  );
  const TotalPriceText = document.getElementById("total_payment");
  let totalPrice = 0;

  checkboxes.forEach((checkbox) => {
    // Lấy giá trị của checkbox được chọn
    const price = parseFloat(
      checkbox.closest(".cart").querySelector(".product_price").innerText
    );
    totalPrice += price;
    const cartId = checkbox.closest(".cart").getAttribute("data-cart-id");
    if (!selectedCartIds.includes(cartId)) {
      selectedCartIds.push(cartId);
    }
  });

  TotalPriceText.innerText = totalPrice;
  console.log(selectedCartIds);
}

async function AddToOrderList() {
  if (selectedCartIds.length === 0) {
    alert("Vui lòng chọn sản phẩm để mua");
    return;
  }

  var token = localStorage.getItem("login");
  if (token === null) {
    alert("Vui lòng đăng nhập để mua sảm phẩm");
    return;
  }

  try {
    const loginUrl = `https://localhost:7029/api/Orders/AddCartList?token=${token}&ListIdCart=${selectedCartIds}`;
    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        idDiscount: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        shipPrice: 0,
        description: "Đơn hàng trong giỏ hàng",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Mua sản phẩm không thành công");
          throw new Error("Mua sản phẩm không thành công.");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.result);
        window.location.href = "../cart.html";
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error(error);
      });
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

async function DeleteToOrderList() {
  if (selectedCartIds.length === 0) {
    alert("Vui lòng chọn sản phẩm để xóa");
    return;
  }

  var token = localStorage.getItem("login");
  if (token === null) {
    alert("Vui lòng đăng nhập để xóa sảm phẩm");
    return;
  }

  try {
    const loginUrl = `https://localhost:7029/api/Orders?ListIdCart=${selectedCartIds}`;
    fetch(loginUrl, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert("Xóa sản phẩm không thành công");
          throw new Error("Xóa sản phẩm không thành công.");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.result);
        window.location.href = "../cart.html";
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error(error);
      });
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

async function GetAllCartHover(pageIndex, pageSize, search) {
  try {
    var token = localStorage.getItem("login");
    const getClassUrl = `https://localhost:7029/api/Cart?pageIndex=${pageIndex}&pageSize=${pageSize}&token=${token}&search=${search}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById("show_product");
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h3 id="Data__null">Không có dữ liệu</h3>';
    } else {
      data.result.forEach((product) => {
        var productDiv = document.createElement("a");
        productDiv.className = "product_cart";
        productDiv.onclick = function () {
          // InsertIdProductFromShopLocal(product.id)
          window.location.href = "../page/cart.html";
        };
        productDiv.innerHTML = `
                    <img src="${product.img}" alt="">
                    <span>${product.nameProduct}</span>
                    <span>${product.totalPrice}</span>
                `;

        productContainer.appendChild(productDiv);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

function ChangeNumber() {
  var quantityControls = document.querySelectorAll(".cart");

  // Lặp qua từng phần tử và gán sự kiện onclick
  quantityControls.forEach(function (control) {
    var minusButton = control.querySelector(".minus");
    var plusButton = control.querySelector(".plus");
    var quantityInput = control.querySelector(".quantity");
    minusButton.onclick = function () {
      changeQuantity("minus", quantityInput);
      var price = document.getElementById("product_price").textContent;
      var number = document.getElementById("quantityInput").value;
      var totalPrice = document.getElementById("price_total");
      const PriceTotal = price * number;
      totalPrice.textContent = PriceTotal;
    };

    plusButton.onclick = function () {
      changeQuantity("plus", quantityInput);
      var price = document.getElementById("product_price").textContent;
      var number = document.getElementById("quantityInput").value;
      var totalPrice = document.getElementById("price_total");
      const PriceTotal = price * number;
      totalPrice.textContent = PriceTotal;
    };
  });
}

function changeQuantity(action, quantityInput) {
  var currentQuantity = parseInt(quantityInput.value, 100);

  if (action === "minus" && currentQuantity > 1) {
    currentQuantity--;
  } else if (action === "plus") {
    currentQuantity++;
  }
}

function UpdatePriceCart() {
  var price = document.getElementById("product_price").textContent;
  var number = document.getElementById("quantityInput").value;
  var totalPrice = document.getElementById("price_total");
  const PriceTotal = price * number;
  totalPrice.textContent = PriceTotal;
}

// Xóa Cart
function DeleteCart(Id) {
  if (confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
    const loginUrl = `https://localhost:7029/api/Cart?Id=${Id}`;
    fetch(loginUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert("Xóa đơn hàng không thành công");
          throw new Error("Xóa đơn hàng không thành công");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.result);
        location.reload(true);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error(error);
      });
  } else alert("Xóa đơn hàng thất bại");
}

function InsertIdProductLocal(IdProduct) {
  localStorage.setItem("IdProduct", IdProduct);
  window.location.href = "./viewshop.html";
}

function InsertIdProductFromShopLocal(IdProduct) {
  localStorage.removeItem("IdProduct1");
  localStorage.setItem("IdProduct1", IdProduct);
  window.location.href = "../productDetail.html";
}

// View Shop
async function GetAllProductViewShop() {
  try {
    var IdProduct = localStorage.getItem("IdProduct");
    const getClassUrl = `https://localhost:7029/api/Shop?IdProduct=${IdProduct}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();
    const productContainer = document.getElementById("content_shop");
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      const table = document.createElement("div");
      table.id = "shop_information";
      table.className = "shop_information";
      let avataShop;
      if (data.result[1].avata === "string") {
        avataShop = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
      } else {
        avataShop = data.result[1].avata;
      }
      table.innerHTML = `
                    <div class="information-left">
                        <div class="shop_info--left">
                            <div class="shop_info--image">
                                <img src="${avataShop}" alt="">
                            </div>
                            <div class="shop_info--name">
                                <span>${data.result[1].brandName}</span>
                            </div>
                            <div class="shop_info--favourtite">
                                <button>Mall</button>
                            </div>
                        </div>
                        <div id="shop_info--follow" onclick="follow()">
                            <button id="follow--text">Follow</button>
                        </div>
                    </div>
                    <div class="information-right">
                        <div class="shop_info--right">
                            <div class="shop_info--follower">
                                <i class="fa-solid fa-user-group"></i>
                                <span>Followers: <span id="product_follower">99</span></span>
                            </div>
                            <div class="shop_info--product">
                                <i class="fa-solid fa-store"></i>
                                <span>Products: <span id="product_quantity">7</span></span>
                            </div>
                        </div>
                    </div>
                `;
      productContainer.appendChild(table);
      const containerProduct = document.createElement("div");
      containerProduct.innerHTML = "";
      containerProduct.className = "shop_product";
      containerProduct.innerHTML = `
                    <h1>ALL OF PRODUCTS</h1>
                `;
      productContainer.appendChild(containerProduct);
      var productDiv = document.createElement("div");
      productDiv.className = "container__product";
      productDiv.id = "container__product";
      productContainer.appendChild(productDiv);
      var productContainerElement =
        document.getElementById("container__product");
      productContainerElement.innerHTML = "";
      var i = 0;
      data.result.forEach((product) => {
        var product__element = document.createElement("div");
        product__element.className = "viewshop_product";

        product__element.innerHTML = `
                        <div class="all_product" onclick="InsertIdProductFromShopLocal('${product.id}')">
                            <a href="#" class="product product__one">
                                <img src="${product.img}" alt="">
                                <div class="product__one--name">
                                    <p>${product.nameProduct}</p>
                                </div>
                                <div class="product__one--price">
                                    <span>$3,200</span>
                                </div>
                            </a>
                        </div>
                    `;
        i++;
        productContainerElement.appendChild(product__element);
      });
      var quantity = document.getElementById("product_quantity");
      quantity.innerHTML = i;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

// Product Detail
async function GetProductDetail() {
  try {
    var IdProduct = localStorage.getItem("IdProduct1");

    const getClassUrl = `https://localhost:7029/api/Product/Id?Id=${IdProduct}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();
    const productContainer = document.getElementById("product_imgs");
    productContainer.innerHTML = "";

    if (data.statusCode === 400) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      const imgContainer = document.createElement("ul");
      imgContainer.className = "imgContainer";
      data.result.images.forEach((imgs) => {
        const imgContainer__element = document.createElement("li");
        imgContainer__element.className = "product_img--item";
        imgContainer__element.innerHTML = `
                    <img src="${imgs.img}" onclick="changeImg1()" alt="">
                `;
        imgContainer.appendChild(imgContainer__element);
      });
      productContainer.appendChild(imgContainer);
      const imgContainer__main = document.getElementById("product_img--main");
      imgContainer__main.innerHTML = "";
      const imgElement__main = document.createElement("div");
      imgElement__main.className = "main_img";
      imgElement__main.innerHTML = `
                <img id="big_img" src="${data.result.images[0].img}" alt="">
            `;
      imgContainer__main.appendChild(imgElement__main);

      const product__infor = document.getElementById("product_infor");
      product__infor.innerHTML = "";
      const product__info__title = document.createElement("div");
      product__info__title.className = "product_infor";
      product__info__title.id = "product__info__title";
      let checkQuantity = "";
      let checkQuantityNumber = 0;
      data.result.products.forEach((product) => {
        checkQuantityNumber += product.number;
      });
      if (checkQuantityNumber <= 0) checkQuantity = "Hết hàng";
      else checkQuantity = "$" + data.result.price;
      product__info__title.innerHTML = `
                <div class="product_infor--heading">
                    <h2>${data.result.name}</h2>
                </div>
                <div class="product_infor--price">
                    <p>${checkQuantity}</p>
                </div>
                <div class="product_infor--button">
                    <div class="product_button--buy" id="product_button--buy" onclick="AddToOrder()">BUY NOW</div>
                    <div class="product_button--add" id="product_button--add" onclick= "AddToCart()">ADD TO BAG</div>
                </div>
                
            `;
            // + <div class="product_infor--size">
            //         <table>
            //             <tr>
            //                 <th></th>
            //                 <th>M</th>
            //                 <th>L</th>
            //             </tr>
            //             <tr>
            //                 <td>Heigh</td>
            //                 <td>30</td>
            //                 <td>36</td>
            //             </tr>
            //             <tr>
            //                 <td>Long</td>
            //                 <td>25</td>
            //                 <td>30</td>
            //             </tr>
            //         </table>
            //     </div>

      product__infor.appendChild(product__info__title);
      if (checkQuantityNumber <= 0) {
        var buyButton = document.getElementById("product_button--buy");
        var addButton = document.getElementById("product_button--add");
        buyButton.onclick = null;
        addButton.onclick = null;
      }
      let totalNumber = 0;
      const productInforTitle = document.getElementById("product__info__title");
      // const div__size = document.createElement("div");
      // div__size.className = "choose_size";
      // div__size.id = "choose_size";
      // productInforTitle.appendChild(div__size);
      // var div__size__element = document.getElementById("choose_size");
      // var productSelect__title = document.createElement("label");
      // productSelect__title.className = "productcategory_label";
      // productSelect__title.textContent = "Select Size";
      // div__size__element.appendChild(productSelect__title);

      // var productSelect = document.createElement("select");
      // productSelect.id = "select__type";
      // data.result.products.forEach((product) => {
      //   var option = document.createElement("option");
      //   option.value = product.id;
      //   option.textContent = product.size;
      //   productSelect.appendChild(option);
      //   totalNumber += product.number;
      // });
      // div__size__element.appendChild(productSelect);
      // productInforTitle.appendChild(div__size__element);

      // Color

      const div__color = document.createElement("div");
      div__color.className = "choose_color";
      div__color.id = "choose_color";
      productInforTitle.appendChild(div__color);
      var div__color__element = document.getElementById("choose_color");
      var productSelect__title = document.createElement("label");
      productSelect__title.className = "productcategory_label";
      productSelect__title.textContent = "Select color";
      div__color__element.appendChild(productSelect__title);

      var productSelect = document.createElement("select");
      productSelect.id = "select__type";
      data.result.products.forEach((product) => {
        var option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.color;
        productSelect.appendChild(option);
      });
      div__color__element.appendChild(productSelect);
      productInforTitle.appendChild(div__color__element);

      // Quantity

      const div_quantity = document.createElement("div");
      div_quantity.className = "product_infor--quantity";
      div_quantity.id = "product_infor--quantity";
      productInforTitle.appendChild(div_quantity);
      var div__quantity__element = document.getElementById(
        "product_infor--quantity"
      );
      var productQuantity = document.createElement("div");
      productQuantity.className = "product_quantity";
      productQuantity.innerHTML = `
                <span>Quantity</span>
                <button id="minus" onclick="reduce()"><i class="fa-solid fa-minus"></i></button>
                <input id="quantity" type="text" value="1">
                <button id="plus" onclick="increase()"><i class="fa-solid fa-plus"></i></button>
            `;
      div__quantity__element.appendChild(productQuantity);
      const numberAvalible = document.createElement("div");
      numberAvalible.className = "product_infor--total";
      numberAvalible.innerHTML = `
                <span>${totalNumber}</span> Available
            `;
      div__quantity__element.appendChild(numberAvalible);
      // Pay
      const div_pay = document.createElement("div");
      div_pay.className = "choose_payment_method";
      // div_pay.onclick = function() {
      //     showInfor('payment_method');
      // };
      div_pay.innerHTML = `
                <label for="" class="">Pay</label>
                <select name="" id="pay__selected" onchange="handlePaymentMethodChange()">
                    <option id="" >Select a payment method</option>
                    <option value="1">Payment upon receipt of goods</option>
                    <option value="2" >Pay by account wallet</option>
                </select>
            `;
      productInforTitle.appendChild(div_pay);
      // Discount
      if (data.result.nameDiscount.length != 0) {
        const DiscountCode = document.createElement("div");
        DiscountCode.className = "choose_discount";
        DiscountCode.id = "choose_discount";
        productInforTitle.appendChild(DiscountCode);
        const div_discount = document.getElementById("choose_discount");
        div_discount.innerHTML = "";
        const discount__title = document.createElement("label");
        discount__title.innerHTML = `
                    <label for="" class="">Discount code</label>
                `;
        div_discount.appendChild(discount__title);
        var saleSelect = document.createElement("select");
        saleSelect.id = "select__discount";
        div_discount.appendChild(saleSelect);
        var div__discount__element =
          document.getElementById("select__discount");
        var option = document.createElement("option");
        option.value = data.result.idDiscount;
        option.textContent = data.result.nameDiscount;
        div__discount__element.appendChild(option);
      }
      // Information shop
      var product_desc__logo = document.getElementById("product_desc--logo");
      product_desc__logo.innerHTML = "";
      var product_logo = document.createElement("div");
      product_logo.className = "product_logo";
      product_logo.id = "product_logo";
      let avataSHop = data.result.avataShop;
      if (avataSHop === "string")
        avataSHop = "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";

      product_logo.innerHTML = `
                <div class="product_logo--img">
                    <img src="${avataSHop}" alt="logo">
                </div>
                <div class="product_logo--shop">
                    <p>${data.result.brandName}</p>
                    <a href="#" onclick="InsertIdProductLocal('${IdProduct}')">
                        <i class="fa-solid fa-shop"></i>
                        See shop
                    </a>
                </div>
            `;
      product_desc__logo.appendChild(product_logo);

      var product_about = document.createElement("div");
      product_about.className = "product_about";
      product_about.innerHTML = "";
      product_about.innerHTML = `
                <div class="product_about--rate">Đánh giá: 15k</div>
                <div class="product_about--total">Sản phẩm: 72</div>
            `;
      product_desc__logo.appendChild(product_about);
      var product_desc__text = document.getElementById("product_desc--text");
      product_desc__text.innerHTML = "";
      var product_desc__text__title = document.createElement("div");
      product_desc__text__title.className = "product_desc--text";
      product_desc__text__title.innerHTML = "";
      product_desc__text__title.innerHTML = `
                <span>Product Description</span>
            `;
      product_desc__text.appendChild(product_desc__text__title);
      var product_desc__info = document.createElement("div");
      product_desc__info.className = "product_desc--info";
      product_desc__info.innerHTML = "";
      product_desc__info.innerHTML = `
                <p>${data.result.description}</p>
            <p>${data.result.products[1].description}</p>
            `;
      product_desc__text.appendChild(product_desc__info);

      var product_review__content = document.getElementById(
        "current_content--text"
      );
      product_review__content.innerHTML = "";
      product_review__content.innerHTML = `
                <div class="current_name">
                    <span>${localStorage.getItem("fullname")}</span>
                </div>
                <div class="current_content">
                    <textarea name="" id="description" cols="30" rows="10" placeholder="Write a comment..."></textarea>
                </div>
                <div class="current_post" onclick="PostFeedBack('${IdProduct}')">
                    <button>POST</button>
                </div>
            `;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

async function PostFeedBack(IdProduct) {
  var description = document.getElementById("description").value;
  var token = localStorage.getItem("login");
  const loginUrl = `https://localhost:7029/api/FeedBack?token=${token}&IdProduct=${IdProduct}`;
  fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: description,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        alert("Đánh giá không thành công");
        throw new Error("Đánh giá không thành công");
      }
      return response.json();
    })
    .then((data) => {
      alert(data.result);
      location.reload(true);
    })
    .catch((error) => {
      // Xử lý lỗi
      console.error(error);
    });
}
async function GetAllFeedBack(pageIndex, pageSize) {
  try {
    var IdProduct = localStorage.getItem("IdProduct1");
    localStorage.removeItem("IdProduct");
    const getClassUrl = `https://localhost:7029/api/FeedBack?IdProduct=${IdProduct}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById("div__feedback");
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      // productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      data.result.forEach((product) => {
        var product__element = document.createElement("div");
        product__element.className = "product_review--content";
        const ngayGoc = product.dateCreate;

        // Tạo một đối tượng ngày từ chuỗi ngày ban đầu
        const ngay = new Date(ngayGoc);

        // Lấy ngày, tháng và năm từ đối tượng ngày
        const ngayNum = ngay.getDate();
        const thangNum = ngay.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const namNum = ngay.getFullYear();

        // Chuyển đổi thành chuỗi định dạng dd/mm/yyyy
        const ngayChinhSua = `${ngayNum.toString().padStart(2, "0")}/${thangNum
          .toString()
          .padStart(2, "0")}/${namNum}`;
        product__element.innerHTML = `
                    <div class="cunrrent_content--img">
                        <img src="${product.avata}" alt="">
                    </div>
                    <div class="current_content--text">
                        <div class="current_name">
                            <span>${product.fullName}</span>
                            <span class="date_submit">
                                <span>Date Submited: </span>
                                ${ngayChinhSua}
                            </span>
                        </div>
                        <div class="current_content">
                            <textarea readonly name="" id="" cols="30" rows="10" placeholder="Write a comment...">${product.description}</textarea>
                        </div>
                    </div>
                `;
        productContainer.appendChild(product__element);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

async function AddToCart() {
  var token = localStorage.getItem("login");
  if (token === null) {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
    return;
  } else {
    var number = document.getElementById("quantity").value;
    var IdProductDetail = document.getElementById("select__type").value;
    if (number === 0) {
      alert("Vui lòng chọn số lượng sản phẩm");
      return;
    }
    try {
      const loginUrl = `https://localhost:7029/api/Cart?token=${token}`;
      fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            idProduct: IdProductDetail,
            number: number,
          },
        ]),
      })
        .then((response) => {
          if (!response.ok) {
            alert("Thêm vào giỏ hàng không thành công");
            throw new Error("Thêm vào giỏ hàng không thành công.");
          }
          return response.json();
        })
        .then((data) => {
          alert(data.result);
        })
        .catch((error) => {
          // Xử lý lỗi
          console.error(error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(error);
    }
  }
}

async function AddToOrder() {
  var token = localStorage.getItem("login");
  if (token === null) {
    alert("Vui lòng đăng nhập để mua sảm phẩm");
    return;
  }
  var number = document.getElementById("quantity").value;
  var IdProductDetail = document.getElementById("select__type").value;
  if (number === 0) {
    alert("Vui lòng chọn số lượng sản phẩm");
    return;
  }
  var pay__selected = document.getElementById("pay__selected").value;
  if (pay__selected === 2) {
    var Card_Number = document.getElementById("Card_Number").value;
    var Experied_Time = document.getElementById("Experied_Time").value;
    var CVC_Number = document.getElementById("CVC_Number").value;

    if (
      Card_Number === null ||
      Experied_Time === null ||
      CVC_Number === null ||
      Card_Number === undefined ||
      Experied_Time === undefined ||
      CVC_Number === undefined
    )
      alert("Vui lòng nhật thông tin thẻ");
    else {
      try {
        const loginUrl = `https://localhost:7029/api/Orders?token=${token}`;
        fetch(loginUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            idProduct: IdProductDetail,
            idDiscount: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            number: number,
            shipPrice: 0,
            description: "Đơn hàng mặc định",
          }),
        })
          .then((response) => {
            if (!response.ok) {
              alert("Mua sản phẩm không thành công");
              throw new Error("Mua sản phẩm không thành công.");
            }
            return response.json();
          })
          .then((data) => {
            alert(data.result);
          })
          .catch((error) => {
            // Xử lý lỗi
            console.error(error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error);
      }
    }
  }
  try {
    const loginUrl = `https://localhost:7029/api/Orders?token=${token}`;
    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        idProduct: IdProductDetail,
        idDiscount: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        number: number,
        shipPrice: 0,
        description: "Đơn hàng mặc định",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Mua sản phẩm không thành công");
          throw new Error("Mua sản phẩm không thành công.");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.result);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error(error);
      });
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

async function DeleteProduct(IdProduct) {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
    try {
      const loginUrl = `https://localhost:7029/api/Product?Id=${IdProduct}`;
      fetch(loginUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            alert("Xóa sản phẩm không thành công");
            throw new Error("Xóa sản phẩm không thành công.");
          }
          return response.json();
        })
        .then((data) => {
          alert(data.result);
        })
        .catch((error) => {
          // Xử lý lỗi
          console.error(error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(error);
    }
  } else alert("Hành động đã bị hủy");
}

// Show Information
async function showInformation() {
  var token = localStorage.getItem("login");
  const getClassUrl = `https://localhost:7029/api/Users?token=${token}`;
  const response = await fetch(getClassUrl);
  const data = await response.json();
  var email_input = document.getElementById("email_input");
  var firstname_input = document.getElementById("firstname_input");
  var lastname_input = document.getElementById("lastname_input");
  var phonenumber_input = document.getElementById("phonenumber_input");
  var birth_input = document.getElementById("birth_input");
  var body__gender = document.getElementById("body__gender");

  // Chuyển đổi chuỗi thành đối tượng Date
  var originalDate = new Date(data.result.dateOfBirth);

  // Lấy thông tin năm, tháng, và ngày
  var year = originalDate.getFullYear();
  var month = ("0" + (originalDate.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0
  var day = ("0" + originalDate.getDate()).slice(-2);

  // Định dạng ngày theo yêu cầu 'yyyy-MM-dd'
  var formattedDate = year + "-" + month + "-" + day;

  email_input.value = data.result.email;
  firstname_input.value = data.result.first_Name;
  lastname_input.value = data.result.last_Name;
  phonenumber_input.value = data.result.phone;
  birth_input.value = formattedDate;
}

//  Fix Product

async function FixProductNextPage(IdProduct) {
  localStorage.setItem("IdProductFix", IdProduct);
  window.location.href = "../FixProduct.html";
}

async function GetProductFix() {
  try {
    var IdProduct = localStorage.getItem("IdProductFix");
    const getClassUrl = `https://localhost:7029/api/Product/Id?Id=${IdProduct}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();
    const productContainer = document.getElementById("product");

    if (data.statusCode === 400) {
      productContainer.innerHTML = "";
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      var productname_input = document.getElementById("productname_input");
      var productimg_input__img__main = document.getElementById(
        "productimg_input--img__main"
      );
      var productimg_input__img__1 = document.getElementById(
        "productimg_input--img__1"
      );
      var productimg_input__img__2 = document.getElementById(
        "productimg_input--img__2"
      );
      var productimg_input__img__3 = document.getElementById(
        "productimg_input--img__3"
      );
      var productimg_input__img__4 = document.getElementById(
        "productimg_input--img__4"
      );
      var productinfo_input = document.getElementById("productinfo_input");
      var productdetails_input = document.getElementById(
        "productdetails_input"
      );
      var productprice_input = document.getElementById("productprice_input");
      var productmaterial_input = document.getElementById(
        "productmaterial_input"
      );
      //
      localStorage.setItem("type", data.result.idProductType);
      localStorage.setItem("producer", data.result.idProducer);
      //
      productname_input.value = data.result.name;
      // data.result.images.forEach((product) => {
      //   productimg_input__img__main.value = product.img;
      //   productimg_input__img__1.value = product.img;
      //   productimg_input__img__2.value = product.img;
      //   productimg_input__img__3.value = product.img;
      //   productimg_input__img__4.value = product.img;
      // });
      productinfo_input.value = data.result.description;
      productdetails_input.value = data.result.products[1].description;
      productprice_input.value = data.result.price;
      productmaterial_input.value = data.result.material;

      // Lấy bảng và các dòng trong bảng
      var table = document.getElementById("table_size");
      var sizeRow = table.rows[0]; // Dòng chứa thông tin size
      var colorRow = table.rows[1]; // Dòng chứa thông tin color
      var quantityRow = table.rows[2]; // Dòng chứa thông tin quantity

      // Đổ dữ liệu vào bảng
      data.result.products.forEach(function (product) {
        // Đổ dữ liệu size
        var sizeCell = document.createElement("td");
        sizeCell.textContent = product.size;
        sizeCell.onclick = function () {
          editCell(this);
        };
        sizeRow.appendChild(sizeCell);

        // Đổ dữ liệu color
        var colorCell = document.createElement("td");
        colorCell.textContent = product.color;
        colorCell.onclick = function () {
          editCell(this);
        };
        colorRow.appendChild(colorCell);

        // Đổ dữ liệu quantity
        var quantityCell = document.createElement("td");
        quantityCell.textContent = product.number;
        quantityCell.onclick = function () {
          editCell(this);
        };
        quantityRow.appendChild(quantityCell);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

async function FixProduct() {
  const token = localStorage.getItem("login");
  var IdProduct = localStorage.getItem("IdProductFix");
  let type = localStorage.getItem("type");
  let producer = localStorage.getItem("producer");
  if (producer === null || producer === undefined)
    producer = "43C20E1F-2C4B-47FF-BAB4-14F7142B3030";
  if (type === null || type === undefined)
    type = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  var seafoodImages = [];

  var imageInputs = [
    "productimg_input--img__main",
    "productimg_input--img__1",
    "productimg_input--img__2",
    "productimg_input--img__3",
    "productimg_input--img__4",
  ];

  const uploadImage = imageInputs.map(async (id, index) => {
    var imageName = document.getElementById(id); // Lấy tên ảnh từ dataset

    if (imageName) {
      const file = imageName.files[0];
      if (!file) {
        alert("Please select a file first!");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          "https://localhost:7029/api/Product/UploadImgProduct",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result.id);
        const linkImg = `https://drive.google.com/thumbnail?id=${result.id}&sz=w800`;
        seafoodImages.push({ nameImage: linkImg, index: index});
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to upload file!");
      }
    }
  });

  await Promise.all(uploadImage);

  seafoodImages.sort((a, b) => a.index - b.index);
  console.log(seafoodImages);

  const name_product = document.getElementById("productname_input").value;
  // const img_main = document.getElementById("productimg_input--img__main").value;
  // const img_1 = document.getElementById("productimg_input--img__1").value;
  // const img_2 = document.getElementById("productimg_input--img__2").value;
  // const img_3 = document.getElementById("productimg_input--img__3").value;
  // const img_4 = document.getElementById("productimg_input--img__4").value;
  const product_information =
    document.getElementById("productinfo_input").value;
  const product_detail = document.getElementById("productdetails_input").value;
  const price = document.getElementById("productprice_input").value;
  // const Material = document.getElementById("productmaterial_input").value;
  const colors = getTableData().color;
  const sizes = getTableData().size;
  const numbers = getTableData().number;

  const loginUrl = `https://localhost:7029/api/Product?Id=${IdProduct}&token=${token}`;
  fetch(loginUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name_product,
      idProducer: producer,
      idProductType: type,
      material: "123",
      price: price,
      description: product_information,
      idDiscount: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      images: [
        {
          img: seafoodImages[0].nameImage,
          usedStatus: 1,
        },
        {
          img: seafoodImages[1].nameImage,
          usedStatus: 2,
        },
        {
          img: seafoodImages[2].nameImage,
          usedStatus: 2,
        },
        {
          img: seafoodImages[3].nameImage,
          usedStatus: 2,
        },
        {
          img: seafoodImages[4].nameImage,
          usedStatus: 2,
        },
      ],
      product_Detail: generateProductDetail(
        sizes,
        colors,
        product_detail,
        numbers
      ),
    }),
  })
    .then((response) => {
      if (!response.ok) {
        alert("Sửa sản phẩm không thành công");
        throw new Error("Sửa sản phẩm không thành công");
      }
      return response.json();
    })
    .then((data) => {
      alert(data.result);
      location.reload(true);
      location.href = "../../myshop.html";
    })
    .catch((error) => {
      // Xử lý lỗi
      console.error(error);
    });
}

// function generateProductDetailFix(colors, sizes, productDetail, numbers) {
//     const productDetailArray = [];

//     for (let i = 0; i < sizes.length; i++) {
//         const size = sizes[i];
//         const color = colors[i % colors.length]; // Lấy màu tương ứng với kích thước hiện tại
//         const number = numbers[i % numbers.length];

//         productDetailArray.push({
//             number: number,
//             description: productDetail,
//             color: color,
//             size: size,
//         });
//     }

//     return productDetailArray;
// }

// function getTableDataFix() {
//     const table = document.getElementById("table_size_fix");
//     const sizeRow = table.querySelector("#header_size_fix ");
//     const colorRow = table.querySelector("#header_long_fix ");
//     const numberRow = table.querySelector("#header_height_fix");

//     const sizeData = getSizeDataFix(sizeRow);
//     const colorData = getColorDataFix(colorRow);
//     const numberData = getNumberDataFix(numberRow);
//     return {
//         size: sizeData,
//         color: colorData,
//         number: numberData
//     };
//     }

// function getSizeDataFix(row) {
//     const cells = row.getElementsByTagName("td");
//     const sizeData = [];

//     for (let i = 1; i < cells.length; i++) {
//         sizeData.push(cells[i].textContent);
//     }

//     return sizeData;
// }

// function getColorDataFix(row) {
//     const cells = row.getElementsByTagName("td");
//     const colorData = [];

//     for (let i = 1; i < cells.length; i++) {
//         colorData.push(cells[i].textContent);
//     }

//     return colorData;
// }

// function getNumberDataFix(row) {
//     const cells = row.getElementsByTagName("td");
//     const numberData = [];

//     for (let i = 1; i < cells.length; i++) {
//         numberData.push(cells[i].textContent);
//     }

//     return numberData;
// }

// Contact

function openContact() {
  var overlay = document.getElementById("overlay");
  var contact = document.getElementById("contact");
  overlay.style.display = "block";
  contact.style.display = "block";
}

function closeContact() {
  var overlay = document.getElementById("overlay");
  var contact = document.getElementById("contact");
  overlay.style.display = "none";
  contact.style.display = "none";
}

// Search
async function displayProductSearch(search, pageIndex, productType, IdClass) {
  try {
    const getClassUrl = `https://localhost:7029/api/Product/Search?search=${search}&pageIndex=${pageIndex}&pageSize=20&ProductType=${productType}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById(IdClass);
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      data.result.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product product__one";
        productDiv.innerHTML = `
                    <div onclick="InsertIdProductFromShopLocal('${
                      product.id
                    }')">
                        <img src="${product.images[0].img || ""}" alt="${
          product.name
        }">
                        <div class="product__one--name">
                            <p>${product.name}</p>
                        </div>
                        <div class="product__one--price">
                            <span>$${product.price}</span>
                        </div>
                    </div>
                    
                `;

        productContainer.appendChild(productDiv);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}

async function displayProductSearchCheck(pageIndex, productType, IdClass) {
  var search = document.getElementById("search").value;
  if (search === null || search === undefined || search === "") {
    search = "";
  }
  displayProductSearch(search, pageIndex, productType, IdClass);
}

function checkTokenExpiration(lastScrollTime) {
  const currentTime = Date.now();
  const elapsedTime = currentTime - lastScrollTime;
  if (elapsedTime >= 1800000) {
    // 30 phút = 30 * 60 * 1000 = 1800000 milliseconds
    var token = localStorage.getItem("login");

    if (token) {
      // Giải mã token để truy cập thông tin thời gian hết hạn
      var tokenData = JSON.parse(atob(token.split(".")[1]));

      // Lấy thời gian hết hạn từ token
      var expirationTime = tokenData.exp * 1000; // Do token lưu thời gian dưới dạng giây

      if (currentTime > expirationTime) {
        // Token đã hết hạn, thực hiện đăng xuất người dùng ở đây
        // Có thể thực hiện logout bằng cách xóa token và chuyển người dùng về trang đăng nhập
        // Gọi hàm kiểm tra hạn của token ở đây
        alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
        LogOut();
      }
    }
    // Reset thời gian cuộn trang
    lastScrollTime = currentTime;
  }
}

function LogOut() {
  localStorage.removeItem("login");
  localStorage.removeItem("IdProduct1");
  localStorage.removeItem("IdProductFix");
  localStorage.removeItem("type");
  localStorage.removeItem("producer");
  localStorage.removeItem("fullname");
  localStorage.removeItem("avata");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  location.href = "./login.html";
}

async function AccountManagement() {
  try {
    let search = document.getElementById("input__search").value;
    if (!search) search = "string";
    
    const getClassUrl = `https://localhost:7029/api/Users/ManagerAccount?search=${search}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById("product_manager");
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      var table = document.createElement("table");
      table.id = "table__manager";
      table.className = "table__manager";
      table.innerHTML = `
        <tr class="product__myshop--title">
          <th>Email</th>
          <th>Account Name</th>
          <th>Account Type</th>
          <th>Quantity of goods sold</th>
          <th>Quantity Purchased</th>
          <th>Tình trạng</th>
          <th>Action</th>
        </tr>
      `;
      productContainer.appendChild(table);
      let i = 0;
      data.result.forEach((product) => {
        i++;
        let lock = product.usedState === 10 ? "none" : "block";
        let unlock = product.usedState === 10 ? "block" : "none";

        let AccountType = product.brandName != null ? "Purchase Account" : "Sale Account";
        
        var productDiv = document.createElement("tr");
        productDiv.className = "product__myshop--body";
        productDiv.innerHTML = `
          <td>${product.email}</td>
          <td>${product.fullName}</td>
          <td>${AccountType}</td>
          <td>${product.totalSell}</td>
          <td>${product.totalBought}</td>
          <td>
            <i class="fa-solid fa-lock lock main" id="lock" style="display: ${lock}"></i>
            <i class="fa-solid fa-unlock unlock main" id="unlock" style="display: ${unlock}"></i>
          </td>
          <td class="option" style="width: 150px">
            <div class="select_choose">
              <i class="fa-solid fa-lock lock main" id="lock" onclick="UpdateUsedStated('${product.id}', 11)"></i>
              <i class="fa-solid fa-unlock unlock main" id="unlock" onclick="UpdateUsedStated('${product.id}', 10)"></i>
              <i class="fa-regular fa-trash-can delete--icon" onclick="DeleteUser('${product.id}', 'Account')"></i>
            </div>
          </td>
        `;

        table.appendChild(productDiv);
      });

      var shop_manager__gross = document.getElementById("shop_manager--gross");
      shop_manager__gross.innerHTML = `<span>Total Account: ${i}</span>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}


async function StoreManager() {
  try {
    let search = document.getElementById("input__search").value;
    if (!search) search = "string";
    
    const getClassUrl = `https://localhost:7029/api/Shop/ManagerShop?search=${search}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById("product_manager");
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      var table = document.createElement("table");
      table.id = "table__manager";
      table.className = "table__manager";
      table.innerHTML = `
        <tr class="product__myshop--title">
          <th>Email</th>
          <th>Account Name</th>
          <th>Name of the Store</th>
          <th>Registration Date</th>
          <th>Tình trạng</th>
          <th>Action</th>
        </tr>
      `;
      productContainer.appendChild(table);

      let i = 0;
      data.result.forEach((product) => {
        i++;
        let lock = product.roles === "User" ? "block" : "none";
        let unlock = product.roles === "User" ? "none" : "block";

        // Format the date
        var ngayThangBanDau = product.createDate;
        var ngayThang = new Date(ngayThangBanDau);
        var ngay = ngayThang.getDate();
        var thang = ngayThang.getMonth() + 1;
        var nam = ngayThang.getFullYear();
        var ngayThangFormatted =
          (ngay < 10 ? "0" : "") + ngay + "/" + (thang < 10 ? "0" : "") + thang + "/" + nam;
        
        var productDiv = document.createElement("tr");
        productDiv.className = "product__myshop--body";
        productDiv.innerHTML = `
          <td>${product.email}</td>
          <td>${product.fullName}</td>
          <td>${product.brandName}</td>
          <td>${ngayThangFormatted}</td>
          <td>
            <i class="fa-solid fa-lock lock main" id="lock" style="display: ${lock}"></i>
            <i class="fa-solid fa-unlock unlock main" id="unlock" style="display: ${unlock}"></i>
          </td>
          <td class="option">
            <div class="select_choose">
              <i class="fa-solid fa-lock lock main" id="lock" onclick="UpdateUsedRole('${product.id}', 'User')"></i>
              <i class="fa-solid fa-unlock unlock main" id="unlock" onclick="UpdateUsedRole('${product.id}', 'Shop')"></i>
              <i class="fa-regular fa-trash-can delete--icon" onclick="DeleteUser('${product.id}', 'Shop')"></i>
            </div>
          </td>
        `;

        table.appendChild(productDiv);
      });

      var shop_manager__gross = document.getElementById("shop_manager--gross");
      shop_manager__gross.innerHTML = `<span>Total Account: ${i}</span>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}


async function CencorshipManagement() {
  try {
    let search = document.getElementById("input__search").value;
    if (!search) search = "string";
    
    const getClassUrl = `https://localhost:7029/api/Product/CencorshipManagement?search=${search}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById("product_manager");
    productContainer.innerHTML = "";

    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      var table = document.createElement("table");
      table.id = "table__manager";
      table.className = "table__manager";
      table.innerHTML = `
        <tr class="product__myshop--title">
          <th>Image</th>
          <th>Product's Name</th>
          <th>Name of the Store</th>
          <th>Request</th>
          <th>Action</th>
        </tr>
      `;
      productContainer.appendChild(table);

      let i = 0;
      data.result.forEach((product) => {
        let status = product.usedStatus === 7 ? "Post of sale" : "Update product";
        i++;
        
        var productDiv = document.createElement("tr");
        productDiv.className = "product__myshop--body";
        productDiv.innerHTML = `
          <td><img class="td_img" src="${product.img}" alt=""></td>
          <td>${product.name}</td>
          <td>${product.brandName}</td>
          <td>${status}</td>
          <td class="option">
            <div class="select_choose">
              <i class="fa-solid fa-check" onclick="UpdateCencorshipManagement('${product.id}')"></i>
              <i class="fa-regular fa-trash-can delete--icon" onclick="DeleteProductCencorshipManagement('${product.id}')"></i>
            </div>
          </td>
        `;

        table.appendChild(productDiv);
      });

      var shop_manager__gross = document.getElementById("shop_manager--gross");
      shop_manager__gross.innerHTML = `<span>Total Account: ${i}</span>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}


async function UpdateCencorshipManagement(IdProduct) {
  if (confirm("Bạn có chắc chắn muốn duyệt sản phẩm này không?")) {
    try {
      var token = localStorage.getItem("login");
      const loginUrl = `https://localhost:7029/api/Product/CencorshipManagement?IdProduct=${IdProduct}&token=${token}`;
      fetch(loginUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            alert("Xác nhận thành công");
            throw new Error("Xác nhận thành công");
          }
          return response.json();
        })
        .then((data) => {
          alert(data.result);
          location.reload(true);
        })
        .catch((error) => {
          // Xử lý lỗi
          console.error(error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(error);
    }
  } else {
    alert("Hành động đã bị hủy");
  }
}

async function DeleteUser(IdUser, Check) {
  if (confirm("Bạn có chắc chắn muốn xóa không?")) {
    try {
      var token = localStorage.getItem("login");
      const loginUrl = `https://localhost:7029/api/Users?Id=${IdUser}&check=${Check}`;
      fetch(loginUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            alert("Xóa thành công");
            throw new Error("Xóa thành công");
          }
          return response.json();
        })
        .then((data) => {
          alert(data.result);
          location.reload(true);
        })
        .catch((error) => {
          // Xử lý lỗi
          console.error(error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(error);
    }
  } else {
    alert("Hành động đã bị hủy");
  }
}

async function UpdateUsedStated(Id, UsedState) {
  if (UsedState === 11) {
    if (confirm("Bạn có chắc chắn muốn khóa tài khoản này không?")) {
      try {
        const token = localStorage.getItem("login");
        const loginUrl = `https://localhost:7029/api/Users/UsedState?Id=${Id}&token=${token}&UsedState=${UsedState}`;
        fetch(loginUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              alert("Khóa không thành thành công");
              throw new Error("Khóa không thành công.");
            }
            return response.json();
          })
          .then((data) => {
            alert(data.result);
            location.reload(true);
          })
          .catch((error) => {
            // Xử lý lỗi
            console.error(error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error);
      }
    } else alert("Hành động đã bị hủy");
  } else {
    if (confirm("Bạn có chắc chắn muốn mở tài khoản này không?")) {
      try {
        const token = localStorage.getItem("login");
        const loginUrl = `https://localhost:7029/api/Users/UsedState?Id=${Id}&token=${token}&UsedState=${UsedState}`;
        fetch(loginUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              alert("Mở không thành thành công");
              throw new Error("Mở không thành công.");
            }
            return response.json();
          })
          .then((data) => {
            alert(data.result);
            location.reload(true);
          })
          .catch((error) => {
            // Xử lý lỗi
            console.error(error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error);
      }
    } else alert("Hành động đã bị hủy");
  }
}

async function UpdateUsedRole(Id, Role) {
  if (Role === "User") {
    if (confirm("Bạn có chắc chắn muốn khóa shop này không?")) {
      try {
        const token = localStorage.getItem("login");
        const loginUrl = `https://localhost:7029/api/Users/UpdateRole?Id=${Id}&token=${token}&Role=${Role}`;
        fetch(loginUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              alert("Khóa không thành thành công");
              throw new Error("Khóa không thành công.");
            }
            return response.json();
          })
          .then((data) => {
            alert(data.result);
            location.reload(true);
          })
          .catch((error) => {
            // Xử lý lỗi
            console.error(error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error);
      }
    } else alert("Hành động đã bị hủy");
  } else {
    if (confirm("Bạn có chắc chắn muốn mở shop này không?")) {
      try {
        const token = localStorage.getItem("login");
        const loginUrl = `https://localhost:7029/api/Users/UpdateRole?Id=${Id}&token=${token}&Role=${Role}`;
        fetch(loginUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              alert("Mở không thành thành công");
              throw new Error("Mở không thành công.");
            }
            return response.json();
          })
          .then((data) => {
            alert(data.result);
            location.reload(true);
          })
          .catch((error) => {
            // Xử lý lỗi
            console.error(error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error);
      }
    } else alert("Hành động đã bị hủy");
  }
}

async function Revenue() {
  var token = localStorage.getItem("login");
  try {
    const getClassUrl = `https://localhost:7029/api/GetProductMyShop/Revenue?token=${token}`;
    const response = await fetch(getClassUrl);
    const data = await response.json();

    const productContainer = document.getElementById("product_manager");
    productContainer.innerHTML = "";
    let i = 0;
    let total = 0;
    if (!Array.isArray(data.result) || data.result.length === 0) {
      productContainer.innerHTML = '<h1 id="Data__null">Không có dữ liệu</h1>';
    } else {
      var table = document.createElement("table");
      table.id = "table__manager";
      table.className = "table__manager";
      table.innerHTML = `
        <tr class="product__myshop--title">
          <th>Image</th>
          <th>Product's name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Sold</th>
          <th>Remaining</th>
          <th>Revenue</th>
        </tr>
      `;
      productContainer.appendChild(table);


      data.result.forEach((product) => {
        total += product.price;
        let status = "Update product";
        if (product.usedStatus === 7) status = "Post of sale";
        i++;
        var productDiv = document.createElement("tr");
        productDiv.className = "product__myshop--body";
        let AccountType = "Sale Account";
        if (product.brandName != null) AccountType = "Purchase Account";
        productDiv.innerHTML = `
          <td><img class="td_img" src="${product.img}" alt=""></td>
          <td class="product_name">${product.name}</td>
          <td>${product.category}</td>
          <td>${product.quantity}</td>
          <td>${product.sold}</td>
          <td>${product.remaining}</td>
          <td><span>${product.price}</span></td>
        `;

        table.appendChild(productDiv);
      });
      
    }
    var shop_manager__gross = document.getElementById("shop_manager--gross");
      shop_manager__gross.innerHTML = "";
      shop_manager__gross.innerHTML = `
                <span>Gross Product: ${i}</span>
            `;
      var total_renevue = document.getElementById("total_renevue");
      total_renevue.innerHTML = "";
      total_renevue.innerHTML = `
                <span>Total Revenue: ${total}</span>
            `;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert(error);
  }
}


async function DeleteProductCencorshipManagement(Id) {
  if (confirm("Bạn có chắc chắn muốn xóa không?")) {
    try {
      var token = localStorage.getItem("login");
      const loginUrl = `https://localhost:7029/api/Product/DeleteProductCencorshipManagement?Id=${Id}`;
      fetch(loginUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            alert("Xóa thành công");
            throw new Error("Xóa thành công");
          }
          return response.json();
        })
        .then((data) => {
          alert(data.result);
          location.reload(true);
        })
        .catch((error) => {
          // Xử lý lỗi
          console.error(error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(error);
    }
  } else {
    alert("Hành động đã bị hủy");
  }
}

async function UnLockAndLockAsync(check) {
  if (check === "LockAccount" || check === "LockShop") {
    if (confirm("Bạn có chắc chắn muốn khóa tài khoản này không?")) {
      try {
        const loginUrl = `https://localhost:7029/api/Users/UnLockAndLockAsync?check=${check}`;
        fetch(loginUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              alert("Khóa không thành thành công");
              throw new Error("Khóa không thành công.");
            }
            return response.json();
          })
          .then((data) => {
            alert(data.result);
            location.reload(true);
          })
          .catch((error) => {
            // Xử lý lỗi
            console.error(error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error);
      }
    } else alert("Hành động đã bị hủy");
  } else {
    if (confirm("Bạn có chắc chắn muốn mở tài khoản này không?")) {
      try {
        const loginUrl = `https://localhost:7029/api/Users/UnLockAndLockAsync?check=${check}`;
        fetch(loginUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              alert("Mở không thành thành công");
              throw new Error("Mở không thành công.");
            }
            return response.json();
          })
          .then((data) => {
            alert(data.result);
            location.reload(true);
          })
          .catch((error) => {
            // Xử lý lỗi
            console.error(error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error);
      }
    } else alert("Hành động đã bị hủy");
  }
}
