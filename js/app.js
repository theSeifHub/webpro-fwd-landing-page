"use strict";
/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/* Define Global Variables */

const sections = document.querySelectorAll("section");
const navBarList = document.querySelector("#navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 */

// function Inspired from https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/#putting-it-all-together
// check if element or part of it is visible within viewport
let isInViewport = (elem) => {
  const box = elem.getBoundingClientRect();
  return (
    // element's top border is above the window center
    box.top <
      (window.innerHeight || document.documentElement.clientHeight) / 2 &&
    // either element's top border is below window top border
    // or element's bottom border is below the window center
    (box.top >= 0 ||
      box.bottom >
        (window.innerHeight || document.documentElement.clientHeight) / 2) &&
    // element's left and right borders are within window borders
    box.left >= 0 &&
    box.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// function Inspired from https://javascript.info/coordinates#getCoords
// get document coordinates of the element
let getCoords = (elem) => {
  const box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    bottom: box.bottom + window.pageYOffset,
  };
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
let buildNav = () => {
  const frag = document.createDocumentFragment();
  for (const sect of sections) {
    const navLink = document.createElement("li");
    navLink.innerHTML = `<a href="#${sect.id}" class="menu__link">${
      sect.querySelector("h2").textContent
    }</a>`;
    frag.appendChild(navLink);
  }
  navBarList.appendChild(frag);
};

// Add class 'active' to section when near top of viewport
let activeSection = () => {
  for (const sect of sections) {
    if (sect.nodeName === "SECTION" && isInViewport(sect)) {
      sect.classList.add("active-section");
      // add active class to respective nav link
      document
        .querySelector(`a[href="#${sect.id}"]`)
        .classList.add("anchor-viewing");
    } else if (sect.nodeName === "SECTION" && !isInViewport(sect)) {
      sect.classList.remove("active-section");
      // remove active class from respective nav links
      document
        .querySelector(`a[href="#${sect.id}"]`)
        .classList.remove("anchor-viewing");
    }
  }
};
// Scroll to anchor ID using scrollTO event
let smoothScroll = (evt) => {
  evt.preventDefault();
  if (evt.target.nodeName === "A") {
    const elemId = evt.target.getAttribute("href");
    const elemCoords = getCoords(document.querySelector(`${elemId}`));
    window.scrollTo({
      top: elemCoords.top,
      behavior: "smooth",
    });
  }
};
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener("DOMContentLoaded", buildNav);
// Scroll to section on link click
navBarList.addEventListener("click", smoothScroll);
// Set sections as active
window.addEventListener("scroll", activeSection);
