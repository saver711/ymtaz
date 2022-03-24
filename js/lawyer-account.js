//Resize browser width to see what happens
//----------------------------------------------------------
let MAX_WIDTH = 1000;
let MENU_CLASS = "menu-hide";
// let menu_width;
let statusHitMenu = false;
let not_loaded = false;
let statusMenu = "open"; //checa se o menu está aberto ou não
let CLASS_MENU_RETRAIDO = "menu-retraido";
//----------------------------------------------------------
$(document).ready(function () {
  initMenu();
  $(window).resize(resizeWindow);
  resizeWindow();

  // slide down things
  $(".menu__list > .show-debend:not(.stand-alone)").on("click", function () {
    if (
      !$(this).next(".menu__submenu").children(".menu__item").hasClass("active")
    ) {
      $("." + $(this).data("show")).slideToggle();
    }
  });

  $('.menu__list > .show-debend[data-show^="menu"]').on("click", function () {
    if (
      !$(this).next(".menu__submenu").children(".menu__item").hasClass("active")
    ) {
      $(this).children("svg").toggleClass("rotate");
    }
  });

  $('.menu__list .show-debend[data-show^="box"]').on("click", function () {
    $('.menu__list .show-debend[data-show^="box"]').removeClass("active");
    $(this).addClass("active");

    $("." + $(this).data("show"))
      .siblings()
      .hide();
    $("." + $(this).data("show")).show();
  });

  // box__add

  $(".box__add").on("click", function () {
    let adddBefore = $(this).siblings("input:last-of-type").clone();
    $(adddBefore).insertBefore($(this));
  });

  //box__crnt-location

  $(".box__crnt-location").on("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  });

  function showPosition(position) {
    $("#Latitude").val(position.coords.latitude);
    $("#Longitude").val(position.coords.longitude);
    $("#Latitude, #Longitude").css("background-color", "#c4f9e7");
  }

  //box__piece--finished

  $(".box__piece--finished").on("click", function () {
    $(this).parents(".col-12").hide();
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
  ///

  // At the bottom of  jQuery code: hide preloader
  $(".preloader-container").fadeOut();

  // filter selections
  (function ($) {
    "use strict";

    $.fn.filterSelect = function (target, optionsObject) {
      var noTargetSet = false;

      function errorOut(message) {
        //console.error(message);
        return this;
      }

      if (target === undefined || typeof target === "object") {
        optionsObject = target;
        noTargetSet = true;
      }

      var defaultDataString = {
        target: "target",
        reference: "reference",
        belongsto: "belongsto",
      };

      var settings = $.extend(
        {
          emptyValue: "-1",
          dataString: defaultDataString,
        },
        optionsObject
      );

      if (optionsObject && optionsObject.dataString) {
        settings.dataString = $.extend(
          defaultDataString,
          optionsObject.dataString
        );
      }

      /**
       * Hides and disables options that don't belong
       * Unhides and re-enables options that do belong
       * removes selection from both belongers and non-belongers
       * @param nonBelongers {jQuery Object}
       * @param belongers {jQuery Object}
       * @return {void}
       */
      function showBelongingOptions(nonBelongers, belongers) {
        belongers.prop("hidden", null);
        nonBelongers.prop("hidden", true);

        belongers.prop("disabled", null);
        nonBelongers.prop("disabled", true);

        nonBelongers.prop("selected", null);
        belongers.prop("selected", null);
      }

      /**
       * Takes an array of options and returns those that do not belong
       * @param {Array | jQuery Object} options
       * @param {Int | Array} belongsTo
       * @return {Array}
       */
      function findNonBelongers(options, belongsTo) {
        var b = parseInt(belongsTo);
        function filterForValue(option) {
          return parseInt(option.dataset[settings.dataString.belongsto]) !== b;
        }
        function filterForArray(option) {
          return (
            belongsTo.indexOf(
              parseInt(option.dataset[settings.dataString.belongsto])
            ) === -1
          );
        }
        var filterFunc = Array.isArray(belongsTo)
          ? filterForArray
          : filterForValue;

        return [].filter.call(options, filterFunc);
      }

      function getAllReferences(options) {
        var result = [];
        for (var i = 0; i < options.length; i++) {
          result.push(
            parseInt(options[i].dataset[settings.dataString.reference])
          );
        }
        return result;
      }

      function filterEmptyFromNonBelongers(nonBelongers) {
        return [].filter.call(nonBelongers, function (option) {
          return option.value != settings.emptyValue;
        });
      }

      /**
       * Filters the target select based on the value of the filter select
       * @param  {string} filter CSS selector for the select to base filter on
       * @param  {string} target CSS selector for the select that gets filtered
       * @return {void}
       */
      function filterIt(filter, tar) {
        $(filter).on("change", function () {
          var targetSelect = $(tar);
          var targetOptions = targetSelect.find("option");
          var filterOptions = $(this).find("option:not(:hidden)");
          var emptyBelongs = targetSelect.data("allowempty") !== undefined;

          var selectedOption = $(this).find("option:selected");
          // if an option is selected, use that as the filter, otherwise use all options as filter
          var reference = selectedOption.length
            ? selectedOption.data(settings.dataString.reference)
            : getAllReferences(filterOptions);
          // Noneblongers get wrapped in jQuery Object
          var nonBelongers = findNonBelongers(
            targetOptions,
            reference,
            emptyBelongs
          );

          if (emptyBelongs) {
            nonBelongers = filterEmptyFromNonBelongers(nonBelongers);
          }

          showBelongingOptions($(nonBelongers), targetSelect.find("option"));
          // Triggering a change in the target select triggers filtering on subsequent targets.
          targetSelect.trigger("change");
        });
      }

      return this.each(function (index, sel) {
        // If this select has no reference, no need to filter anything
        if (
          $(sel)
            .find('option[value!="-1"]')
            .data(settings.dataString.reference) === undefined
        ) {
          return;
        }
        var tgt = target;
        if (noTargetSet) {
          tgt = "#" + $(sel).data(settings.dataString.target);
        }

        if (!$(tgt).length) {
          return errorOut(
            "filterSelect could not find a target! Selector is: " + tgt
          );
        }

        filterIt(sel, tgt);
      });
    };
  })(jQuery);

  $(".filterSelect").filterSelect();
});

function retrairMenu() {
  let _timer = 300;

  $("body").addClass(CLASS_MENU_RETRAIDO);
  let _anim_01 = { right: -280, opacity: 0 };

  $("#menu").stop(true, true).animate(_anim_01, _timer);
  $("#hit-menu").stop(true, true).show();
  $("#header .button-menu-mobile").stop(true, true).show();
  $("#header .button-menu-mobile")
    .stop(true, true)
    .animate({ opacity: 1 }, _timer);

  $("#conteudo .conteudo-inner")
    .stop(true, true)
    .animate({ paddingRight: 0 }, _timer);

  hideBackgroundMenuMobile();
}
/////////
function expandirMenu() {
  $("body").removeClass(CLASS_MENU_RETRAIDO);
  let _anim_01 = { right: 0, opacity: 1 };

  $("#menu").stop(true, true).animate(_anim_01);
  $("#hit-menu").stop(true, true).hide();
  $("#conteudo .conteudo-inner")
    .stop(true, true)
    .animate({ paddingRight: 260 });

  $("#header .button-menu-mobile")
    .stop(true, true)
    .animate({ opacity: 0 }, function () {
      $("#header .button-menu-mobile").stop(true, true).hide();
    });

  if ($(window).width() <= 768) {
    showBackgroundMenuMobile();
  }
}

function resizeWindow() {
  let _w = $(window).width();

  if (_w > MAX_WIDTH) {
    //expandir menu
    if ($("body").hasClass(CLASS_MENU_RETRAIDO)) {
      if (statusMenu != "closed") {
        expandirMenu();
      }
    }
    if (statusMenu == "open_by_menu_mobile") {
      statusMenu = "open";
    }
  } //retrair menu
  else {
    if (!$("body").hasClass(CLASS_MENU_RETRAIDO)) {
      if (statusMenu != "open_by_menu_mobile") {
        retrairMenu();
      }
    }
  }

  if (_w >= 768) {
    if ($(".menu-mobile-background").hasClass("on")) {
      hideBackgroundMenuMobile();

      
    }
  } else {
    if (statusMenu == "open_by_menu_mobile") {
      showBackgroundMenuMobile();
    }
  }
}

function initMenu() {
  $(".header-controlMenuButton").click(function () {
    statusMenu = "closed";
    retrairMenu();
    return false;
  });

  $(".button-menu-mobile").click(function () {
    statusMenu = "open_by_menu_mobile";
    expandirMenu();
    return false;
  });

  $(".menu-mobile-background").mousedown(function () {
    retrairMenu();
  });

  $("#hit-menu").mouseenter(function () {
    statusHitMenu = true;
    expandirMenu();
  });

  $("#menu").mouseleave(function () {
    if (statusHitMenu) {
      statusHitMenu = false;
      retrairMenu();
    }
  });
}

function hideBackgroundMenuMobile() {
  $(".menu-mobile-background").removeClass("on");
  $(".menu-mobile-background")
    .stop(true, true)
    .animate({ opacity: 0 }, function () {
      $(".menu-mobile-background").stop(true, true).hide();
      $(".menu-mobile-background").removeAttr("style");
    });
}

function showBackgroundMenuMobile() {
  $(".menu-mobile-background").addClass("on");
  $(".menu-mobile-background").stop(true, true).show();
  $(".menu-mobile-background").stop(true, true).animate({ opacity: 1 });
}
