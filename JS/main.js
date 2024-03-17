(function ($) {
  /*  $(".screenshot-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    loop: true,
    dots: true,
}); */

})(jQuery);

$(document).ready(function () {
  var owl = $('.owl-carousel');
  owl.owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    margin: 25,
    smartSpeed: 2000,
    onTranslated: function (event) {
      // Remove the 'center' class from all items
      $(".owl-carousel .owl-item").removeClass("center");

      // Add the 'center' class to the currently centered item
      $(".owl-carousel .owl-item.active.center").each(function () {
        $(this).find(".owl-item").addClass("center");
      });
    },
  });

});
 
document.body.style.overflowX = "hidden";
/*
const leftDiv = document.getElementById("left-div-ID");
const rightDiv = document.getElementById("right-div-ID");
const thirdContainer = document.getElementById("third-container-ID");

function handleScroll() {
  const scrollPosition = window.scrollY;

  if (scrollPosition > 330) {
    leftDiv.style.transform = "translateX(0)";
    rightDiv.style.opacity = 1;
    leftDiv.style.opacity = 1;
    rightDiv.style.transform = "translateX(0)";
    thirdContainer.style.transform = "translate(-50%, 0) scale(1)";
    thirdContainer.style.opacity = 1;
  } else {
    leftDiv.style.transform = "translateX(-100%)";
    rightDiv.style.opacity = 0;
    leftDiv.style.opacity = 0;
    rightDiv.style.transform = "translateX(100%)";
    thirdContainer.style.transform = "translate(-50%, 100%) scale(0)";
    thirdContainer.style.opacity = 0;
  }
}

window.addEventListener("scroll", handleScroll);*/
