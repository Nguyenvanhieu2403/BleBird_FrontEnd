function showPorductSideBar(){
    const productSideBar = document.querySelector('.sideBar_item--product');
    const status = window.getComputedStyle(productSideBar);
  
    if (status.display === "none") {
      productSideBar.style.display = "block";
    }
    else{
      productSideBar.style.display = "none";
    }
  }
function openSiderBar(){
  const closeIcon = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');
  closeIcon.style.display = "block";
  overlay.style.display = "block";
}
function closeSideBar(){
  const closeIcon = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');
  closeIcon.style.display = "none";
  overlay.style.display = "none";
}

function openSidebarProfile(){
  const sidebarProfile = document.querySelector('.sideBar_container');
  const overlay = document.querySelector('.overlay_profile');

  overlay.style.display = "block";
  sidebarProfile.style.display = "block";
}

function closeSidebarProfile(){
  const sidebarProfile = document.querySelector('.sideBar_container');
  const overlay = document.querySelector('.overlay_profile');
  overlay.style.display = "none";
  sidebarProfile.style.display = "none";

}
function openSidebarProfile_revenue(){
  const sideBar = '.sideBar_container';
  const sidebarProfile = document.querySelector(sideBar);
  const overlay = document.querySelector('.overlay_profile');
  overlay.style.display = "block";
  sidebarProfile.style.display = "block";

}