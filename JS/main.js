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
 
/*$(window).scroll(function() {
  var aboutSectionOffset = $('#moving-div').offset().top;
  var scrollPosition = $(window).scrollTop();

  if (scrollPosition >= aboutSectionOffset) {
    $('body').css('background-color', '#d3d4f5');
    $('body').css('transition', 'background-color 4s ease, opacity 2.5s ease');
    $('body').css('opacity', '1');
  } else {
    $('body').css('background-color', '#ffffff');
    $('body').css('transition', 'background-color 2s ease, opacity 1.5s ease');
  }
}); */


function startCounters() {
  const feedbackCounter = document.getElementById('feedback-counter');
  const clientsCounter = document.getElementById('clients-counter');
  const downloadsCounter = document.getElementById('downloads-counter');

  const feedbackTarget = 99.5;
  const clientsTarget = 50;
  const downloadsTarget = 100;

  let feedbackCount = 0;
  let clientsCount = 0;
  let downloadsCount = 0;

  const incrementCounters = () => {
    if (feedbackCount < feedbackTarget) {
      feedbackCount += .5; // Increase the increment value for faster counting
      feedbackCounter.textContent = feedbackCount.toFixed(1) + '%';
    }

    if (clientsCount < clientsTarget) {
      clientsCount += 1; // Increase the increment value for faster counting
      clientsCounter.textContent = clientsCount;
    }

    if (downloadsCount < downloadsTarget) {
      downloadsCount += 1; // Increase the increment value for faster counting
      downloadsCounter.textContent = downloadsCount;
    }

    if (feedbackCount < feedbackTarget || clientsCount < clientsTarget || downloadsCount < downloadsTarget) {
      requestAnimationFrame(incrementCounters);
    }
  };

  incrementCounters();
}

document.addEventListener('DOMContentLoaded', startCounters);
