import "../scss/main.scss";
import anime from "animejs";
import "waypoints/lib/noframework.waypoints.js";

// Change language
const body = document.querySelector("body");
const wraps = document.querySelectorAll(
  ".brand__tagline .wrap span, .nav__item .wrap span, .hero__title .wrap span, .hero__caption .wrap span"
);

function switchSpanish() {
  body.className = "";
  body.classList.add("in-spanish");

  wraps.forEach(wrap => {
    anime.remove(wrap);

    anime({
      targets: wrap,
      easing: "easeOutExpo",
      translateY: "-50%"
    });
  });
}

function switchEnglish() {
  body.className = "";
  body.classList.add("in-english");

  wraps.forEach(wrap => {
    anime.remove(wrap);

    anime({
      targets: wrap,
      easing: "easeOutExpo",
      translateY: 0
    });
  });
}

const esBtn = document.querySelector(".lang--es");
const enBtn = document.querySelector(".lang--en");

esBtn.addEventListener("click", switchSpanish);
enBtn.addEventListener("click", switchEnglish);

// Animations
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    animateStart();
  }, 1250);
});

function animateStart() {
  anime
    .timeline({
      easing: "easeOutExpo"
    })
    .add({
      targets: ".hero__title .wrap span",
      duration: 3000,
      translateY: ["100%", 0],
      delay: (el, i) => i * 125
    })
    .add({
      targets:
        ".brand__name .wrap a, .brand__tagline .wrap span, .langs .wrap span",
      duration: 2000,
      translateY: ["100%", 0],
      delay: (el, i) => i * 50,
      offset: "-=2500"
    })
    .add({
      targets: ".nav__item .wrap span, .hero__caption .wrap span",
      duration: 2000,
      translateY: ["100%", 0],
      delay: (el, i) => i * 50,
      offset: "-=2500"
    });
}

// Animate using waypoints when a section is scrolled
var about = new Waypoint({
  element: document.getElementById("about"),
  handler: function() {
    console.log("hi!");
  }
});
