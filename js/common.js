/* COMMON JS CODE */
$(document).ready(function () {
  // all of my code
  // general
  $(".goTo").on("click", function () {
    $("html").animate(
      {
        scrollTop: $("." + $(this).data("scroll")).offset().top,
      },
      1400
    );
  });

  // nav
  $("#menuToggle input").on("click", function () {
    $(".navbar__navs").toggleClass("hide");
  });

  $(".navbar__navs li").on("click", function () {
    $("#menuToggle input").click();
  });

  // cmnForm -mine

  let fileInput = $('.cmnForm input[type="file"]');
  $(fileInput).on("change", function () {
    let files =
        document.forms[$(this).parents("form").attr("name")]["file"].files,
      fileName = "",
      n;

    if (files.length > 1) {
      let p = document.createElement("p");
      let more = document.createTextNode(files.length + " ملفات وهم : ");
      $(this).siblings("label").find("ul")[0].appendChild(more);
    }

    for (n = 0; n < files.length; n++) {
      let li = document.createElement("li");
      let text = document.createTextNode(files[n].name);
      li.appendChild(text);
      $(this).siblings("label").find("ul")[0].appendChild(li);
    }
  });
  $(fileInput).on("click", function () {
    $(this).siblings("label").find("ul").html("");
  });

  //  (videos, library pages)
  $(".slide").on("click", function () {
    $(".slide").removeClass("active");
    $(this).addClass("active");
  });
  $(".slides-toggler").on("click", function () {
    $(".slides-container").slideToggle();
  });

  // library page
  $(".library .slide").on("click", function () {
    $("." + $(this).parent().siblings().children().data("lib")).hide();

    $("." + $(this).data("lib")).show();
  });

  let WIDTH_LIMIT = 767;
  let windowWidth = window.innerWidth;

  if (windowWidth <= WIDTH_LIMIT) {
    $(".library .slide").on("click", function () {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $("." + $(this).data("lib")).offset().top,
        },
        600
      );
    });
  } else {
  }

  //   login/signup
  $(".forget-text").on("click", function () {
    $(".forget-mail").slideDown();
  });

  // search-results
  $(".search-result__head").on("click", function () {
    $(this).children("svg").toggleClass("rotate");
    $(this).siblings(".search-result__result").slideToggle();
  });

  // At the bottom of  jQuery code: hide preloader
  $(".preloader-container").fadeOut();
});
