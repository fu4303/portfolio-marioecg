import "../scss/main.scss";
import Scrollbar from "smooth-scrollbar";
import anime from "animejs";

/**
 * From Github issue on how to make anchor links using Smooth scrollbar
 * https://github.com/idiotWu/smooth-scrollbar/issues/128#issuecomment-390980479
 */
class AnchorPlugin extends Scrollbar.ScrollbarPlugin {
  static pluginName = "anchor";

  onHashChange = () => {
    this.handleHash(location.hash);
  };

  onClick = event => {
    const { target } = event;

    if (target.tagName !== "A") {
      return;
    }

    const hash = target.getAttribute("href");

    if (!hash || hash.charAt(0) !== "#") {
      return;
    }

    this.handleHash(hash);
  };

  handleHash = hash => {
    console.log("hash:", hash);

    if (!hash) {
      return;
    }

    if (hash === "#top") {
      this.scrollbar.setMomentum(0, -this.scrollbar.scrollTop);
    } else {
      console.log("scrollTop:", this.scrollbar.containerEl.scrollTop);

      this.scrollbar.scrollIntoView(document.querySelector(hash), {
        offsetTop: -this.scrollbar.containerEl.scrollTop
      });
    }
  };

  onInit() {
    this.handleHash(location.hash);

    window.addEventListener("hashchange", this.onHashChange);

    this.scrollbar.contentEl.addEventListener("click", this.onClick);
  }

  onDestory() {
    window.removeEventListener("hashchange", this.onHashChange);

    this.scrollbar.contentEl.removeEventListener("click", this.onClick);
  }
}

Scrollbar.use(AnchorPlugin);

// Init smooth scrollbar
Scrollbar.init(document.querySelector("main"), {
  damping: 0.1
});

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
