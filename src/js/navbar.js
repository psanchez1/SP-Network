

function toggleNav(){
    var sideNav = document.getElementById("mySidenav");
    console.log(sideNav.style.width);
    if (sideNav.style.width == "0px" || sideNav.style.width == ""){
        openNav();
    }
    else{
        closeNav();
    }
}

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }