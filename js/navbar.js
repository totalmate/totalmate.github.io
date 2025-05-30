//appearance

const navbar = document.querySelector('.navbar');

window.onscroll = function() {
    
    if (document.body.scrollTop > 340 || document.documentElement.scrollTop > 340) {
        navbar.classList.add('fixed'); 
    } else {
        navbar.classList.remove('fixed');
    }
};

//hamburger menu

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navBlur = document.querySelector(".nav-blur");
const bodyBlur = document.querySelector(".body-blur");

// Megnyitja vagy bezárja a menüt
function toggleMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    navBlur.classList.toggle("active");
    bodyBlur.classList.toggle("active");
}

// Hamburger gomb eseménykezelő
hamburger.addEventListener("click", () => {
    toggleMenu();
});

// Dokumentum eseménykezelő: bezárja a menüt, ha nem a menüre kattintasz
document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        if (navMenu.classList.contains("active")) {
            toggleMenu();
        }
    }
});

// Link kattintás eseménykezelő: bezárja a menüt
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        toggleMenu();
    });
});

//scrolled

const navbarEl = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
if (window.scrollY > 340) {
    navbarEl.classList.add('navbar-scrolled');
} else if (window.scrollY <= 340) {
    navbarEl.classList.remove('navbar-scrolled');
}
});

// to top button
// cost button

const toTop = document.querySelector('.to-top');
const cost = document.querySelector('.btn-cost');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;

    // Az oldal elejének 340px-es és az aljának 340px-es tartománya
    const topThreshold = 340;
    const bottomThreshold = documentHeight - 340;

    if (scrollPosition > topThreshold && scrollPosition + windowHeight < bottomThreshold) {
        // Ha nem az oldal elején vagyunk és nem az oldal alján vagyunk, akkor aktiváljuk a gombokat
        toTop.classList.add('activated');
        cost.classList.add('activated');
    } else {
        // Ha az oldal elején vagyunk vagy az oldal alján vagyunk, eltávolítjuk a gombokat
        toTop.classList.remove('activated');
        cost.classList.remove('activated');
    }
});