// Update
const update = document.querySelector('.update')
const show = document.querySelector('.add_update')
const addressUpdate = document.querySelector('.address_update')
const overlay = document.querySelector('.overlay_address')

update.addEventListener('click', function() {
    updateAddress.innerHTML = 'Update address'
    addressUpdate.innerHTML = 'Update'
    show.style.display = 'block'
    overlay.style.display = 'block'
})

const exit = document.querySelector('.exit')

exit.addEventListener('click', function() {
    show.style.display = 'none'
    overlay.style.display = 'none'
})

var exitDonw = document.querySelector("#address_update");
exitDonw.addEventListener('click', function() {
    show.style.display = 'none'
    overlay.style.display = 'none'
})

// Add_newaddress
const addnewAddress = document.querySelector('.add_newaddress')
const updateAddress = document.querySelector('.update_address')

addnewAddress.addEventListener('click', function() {
    updateAddress.innerHTML = 'Add a new address'
    addressUpdate.innerHTML = 'Add'
    overlay.style.display = 'block'
    show.style.display = 'block'
})

// Contact

function openContact() {
    var overlay = document.getElementById('overlay')
    var contact = document.getElementById('contact');
    overlay.style.display = 'block';
    contact.style.display = 'block';
  }
  
  function closeContact() {
    var overlay = document.getElementById('overlay')
    var contact = document.getElementById('contact');
    overlay.style.display = 'none';
    contact.style.display = 'none';
  }