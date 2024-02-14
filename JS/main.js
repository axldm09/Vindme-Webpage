(function ($) {
  /*  $(".screenshot-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    loop: true,
    dots: true,
}); */

})(jQuery);

const leftDiv = document.getElementById("left-div-ID");
const rightDiv = document.getElementById("right-div-ID");

function handleScroll() {
  const scrollPosition = window.scrollY;

  if (scrollPosition > 330) { // Adjust this value based on when you want the animation to start
    leftDiv.style.transform = "translateX(0)";
    rightDiv.style.opacity = 1;
    leftDiv.style.opacity = 1;
    rightDiv.style.transform = "translateX(0)";
  } else {
    leftDiv.style.transform = "translateX(-100%)";
    rightDiv.style.opacity = 0;
    leftDiv.style.opacity = 0;
    rightDiv.style.transform = "translateX(100%)";
  }
}

window.addEventListener("scroll", handleScroll);

