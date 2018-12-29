import "../scss/main.scss";
import SmoothScroll from "smooth-scroll";
import anime from "animejs";
import "waypoints/lib/noframework.waypoints.js";

// Initialize Smooth Scroll
const scroll = new SmoothScroll('a[href*="#"]', {
  easing: "easeInOutCubic",
  speed: 800,
  speedAsDuration: true
});

// Change language
const body = document.querySelector("body");
const wraps = document.querySelectorAll(".switch span");

function switchSpanish() {
  body.className = "";
  body.classList.add("in-spanish");

  wraps.forEach(wrap => {
    anime.remove(wrap);

    anime({
      targets: wrap,
      duration: 1500,
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
      duration: 1500,
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
const about = new Waypoint({
  element: document.getElementById("about"),
  handler: function() {
    this.element.classList.add("on-screen");
  },
  offset: "30%"
});

const work = new Waypoint({
  element: document.getElementById("work"),
  handler: function() {
    this.element.classList.add("on-screen");
  },
  offset: "30%"
});

const contact = new Waypoint({
  element: document.getElementById("contact"),
  handler: function() {
    this.element.classList.add("on-screen");
  },
  offset: "30%"
});
