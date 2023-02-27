"use strict";

var heroSection;
var descriptionSection;
var assetsSection;

window.onload = function () {
  heroSection = document.getElementById("hero-section");
  descriptionSection = document.getElementById("description-section");
  assetsSection = document.getElementById("assets-section");


  addViewport();
  addAssetHoverAnimation();

  if (screen.width < 450)
  {
    let header = document.getElementById("header");
    let hero = document.getElementById("hero-section");
    console.log(screen.width);
    header.style.width = screen.width * 0.9 + "px";
    header.style.paddingLeft = screen.width * 0.05 + "px";
    header.style.paddingRight = screen.width * 0.05 + "px";

    hero.style.height = screen.height + "px";

    swapDescriptionMobile();
  }
}

/*
Miscellaneous
*/
function addViewport() {
  const inViewport = (entries, observer) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
    });
  };

  const Obs = new IntersectionObserver(inViewport);
  const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options

  const ELs_inViewport = document.querySelectorAll("[data-inviewport]");
  ELs_inViewport.forEach((EL) => {
    Obs.observe(EL, obsOptions);
  });
}

function addAssetHoverAnimation() {
  for (let i = 1; i < 5; i++) {
    let section = document.getElementById("container-" + i);
    section.addEventListener("mouseenter", () => {
      let icon = document.getElementById("icon-" + i);
      icon.style.transform = "translateY(-2rem)";
      setTimeout(function () {
        icon.style.transform = "translateY(0rem)";
      }, 200);
    });
  }
}

function swapDescriptionMobile() {
  let img = document.getElementById("description-swap-img");
  let text = document.getElementById("description-swap-text");
  let container = document.getElementById("description-swap");

  var temp = document.createElement("div");
  img.parentNode.insertBefore(temp, img);

  // move obj1 to right before obj2
  text.parentNode.insertBefore(img, text);

  // move obj2 to right before where obj1 used to be
  temp.parentNode.insertBefore(text, temp);

  // remove temporary marker node
  temp.parentNode.removeChild(temp);
}

/*
Scrolling functions 
*/
function aboutAppScroll() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function overViewScroll() {
  const offset = 0;
  const y = heroSection.clientHeight + offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function assetsScroll() {
  const offset = -300;
  const y = heroSection.clientHeight + descriptionSection.clientHeight + offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function registerScroll() {
  const offset = 0;
  const y =
    heroSection.clientHeight +
    descriptionSection.clientHeight +
    assetsSection.clientHeight +
    offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}