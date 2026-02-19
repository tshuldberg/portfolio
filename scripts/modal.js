$(document).ready(function () {
  // MODAL
  var modalText = {
    receeps: {
      title: "Receeps",
      tag: "RECEIPT WORKFLOW AUTOMATION.",
      detail:
        "Receeps streamlines expense capture and reconciliation with a Django + React architecture, integrating OCR pipelines, role-based controls, and cloud deployment for team-scale workflows.",
      link: "https://github.com/cedricholz/receipts",
    },
    marlin: {
      title: "The Marlin Traders",
      tag: "TRADING AND ANALYTICS PLATFORM.",
      detail:
        "A modern trading platform built with Next.js and tRPC, paired with PostgreSQL-backed analytics and companion mobile workflows to keep portfolio actions fast and reliable.",
      link: "https://github.com/tshuldberg/TheMarlinTraders",
    },
    easystreet: {
      title: "EasyStreet",
      tag: "NATIVE IOS NAVIGATION.",
      detail:
        "Native iOS app using Swift, UIKit, and MapKit to deliver location-aware experiences with a local SQLite store, optimized for responsiveness and low-friction daily use.",
      link: "https://github.com/tshuldberg/EasyStreet",
    },
    easystreetmono: {
      title: "EasyStreet Cross-Platform",
      tag: "MONOREPO MOBILE + WEB SUITE.",
      detail:
        "Cross-platform evolution of EasyStreet using Expo, Next.js, Convex, and Turborepo for shared logic, rapid iteration, and cohesive product behavior across devices.",
      link: "https://github.com/tshuldberg/easystreet-monorepo",
    },
    myvoice: {
      title: "MyVoice",
      tag: "ON-DEVICE VOICE WORKFLOWS.",
      detail:
        "MyVoice is a macOS-first TypeScript app that integrates whisper.cpp for private local transcription and developer-friendly automation hooks for fast voice-to-action flows.",
      link: "https://github.com/tshuldberg/MyVoice",
    },
    macoshub: {
      title: "macOS Hub",
      tag: "LOCAL AI AUTOMATION CENTER.",
      detail:
        "TypeScript-based command center that connects MCP SDK services with AppleScript automations, enabling contextual desktop workflows and AI-assisted system orchestration.",
      link: "https://github.com/tshuldberg/macos-hub",
    },
  };

  $("#gallery .button").on("click", function () {
    fillModal(this.id);
    $(".modal-wrap").addClass("visible");
  });

  $(".close").on("click", function () {
    $(".modal-wrap, #modal .button").removeClass("visible");
  });

  $(".mask").on("click", function () {
    $(".modal-wrap, #modal .button").removeClass("visible");
  });

  var carousel = $("#carousel"),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $("#next").click(function () {
    shiftSlide(-1);
  });
  $("#prev").click(function () {
    shiftSlide(1);
  });

  carousel.on("mousedown", function () {
    if (carousel.hasClass("transition")) return;
    dragStart = event.pageX;
    $(this).on("mousemove", function () {
      dragEnd = event.pageX;
      $(this).css("transform", "translateX(" + dragPos() + "px)");
    });
    $(document).on("mouseup", function () {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $(".carousel-wrap, .slide").css("width", slideWidth);
    $(".modal").css("max-width", slideWidth);
    $("#carousel").css("left", slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass("transition")) return;
    dragEnd = dragStart;
    $(document).off("mouseup");
    carousel
      .off("mousemove")
      .addClass("transition")
      .css("transform", "translateX(" + direction * slideWidth + "px)");
    setTimeout(function () {
      if (direction === 1) {
        $(".slide:first").before($(".slide:last"));
      } else if (direction === -1) {
        $(".slide:last").after($(".slide:first"));
      }
      carousel.removeClass("transition");
      carousel.css("transform", "translateX(0px)");
    }, 700);
  }

  function fillModal(id) {
    $("#modal .title").text(modalText[id].title);
    $("#modal .detail").text(modalText[id].detail);
    $("#modal .tag").text(modalText[id].tag);
    if (modalText[id].link)
      $("#modal .button")
        .addClass("visible")
        .parent()
        .attr("href", modalText[id].link);

    $.each($("#modal li"), function (index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($("#modal .slide"), function (index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + "-" + index + ".jpg') center center/cover",
        backgroundSize: "cover",
      });
    });
  }
});
