function openNav() {
  document.getElementById("mySidenav").style.width = "450px";
  document.body.style.overflow = "hidden";
  document.getElementById("overlay").style.display = "block"
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.body.style.overflow = "auto";
  document.getElementById("overlay").style.display = "none"
}