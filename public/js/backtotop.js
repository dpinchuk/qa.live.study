$(document).ready(() => {
  
  let btn = $('.scroll-to-top-btn');

  $(window).scroll(() => {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', (e) => {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
  });

});