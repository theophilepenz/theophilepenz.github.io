$(document).ready(function () {
  'use strict';
  //********* page loader js


  setTimeout(function () {
    $('.loader_bg').fadeToggle();
  }, 1000);


  $('[lang="fr"]').show();
  $('[lang="en"]').hide();

  //********** menu background color change while scroll

  $(window).on('scroll', function () {
    var menu_area = $('.nav-area');
    if ($(window).scrollTop() > 200) {
      menu_area.addClass('sticky_navigation');
    } else {
      menu_area.removeClass('sticky_navigation');
    }
  });

  //********** menu hides after click (mobile menu)

  $(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
      $(this).collapse('hide');
    }
  });

  $(document).on('click', '.languages', function (e) {
    switch (e.target.id) {
      case 'fr':
        console.log("Fr");
        $('[lang="fr"]').show();
        $('[lang="en"]').hide();
        break;
      case 'eng':
        console.log("Eng");
        $('[lang="fr"]').hide();
        $('[lang="en"]').show();
        break;
      default:
        console.log(e.target.id);
    }
  });

  //*********** scrollspy js

  $('body').scrollspy({
    target: '.navbar-collapse',
    offset: 195
  });

  //************ smooth scroll js

  $('a.smooth-menu').on("click", function (e) {
    e.preventDefault();
    var anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top - 50
    }, 1000);
  });

  $('.view').on("click", function (e) {
    $("#modalImg").prop('src', ($(this).children(".Mimg").data("src")));
    $("#modalTitle").text($(this).children(".Mtext").data("title"));
    $("#modalTitle").text($(this).children(".Mtext").data("title"));


    console.log($(this).html());
    $("#modalText").html($(this).children(".Mtext").html());
  });

});
