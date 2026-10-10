/* =========================================
   NURSE GRADUATION WEBSITE
   INTERACTIVE NAVIGATION
========================================= */

let confettiTimer = null;


/* =========================================
   PINDAH HALAMAN
========================================= */

function goTo(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen) {
        screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if (!target) {
        return;
    }

    target.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Confetti hanya saat halaman wisuda dibuka.
    if (screenId === "graduation") {
        startConfetti();
    } else {
        stopConfetti();
    }

}


/* =========================================
   CONFETTI GRADUATION
========================================= */

function startConfetti() {

    stopConfetti();

    const container = document.getElementById("confettiContainer");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const symbols = [
        "🎉",
        "✨",
        "🎓",
        "💗",
        "🌸",
        "♡"
    ];

    let count = 0;

    function createConfetti() {

        if (count >= 55) {
            stopConfetti();
            return;
        }

        const piece = document.createElement("span");

        piece.className = "confetti-piece";

        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.animationDuration =
            (3 + Math.random() * 3) + "s";

        piece.style.animationDelay =
            (Math.random() * 0.8) + "s";

        piece.style.fontSize =
            (14 + Math.random() * 15) + "px";

        container.appendChild(piece);

        piece.addEventListener("animationend", function () {
            piece.remove();
        });

        count++;
    }

    for (let i = 0; i < 25; i++) {
        createConfetti();
    }

    confettiTimer = setInterval(function () {

        if (!document.getElementById("graduation").classList.contains("active")) {
            stopConfetti();
            return;
        }

        createConfetti();

    }, 150);

}


/* =========================================
   HENTIKAN CONFETTI
========================================= */

function stopConfetti() {

    if (confettiTimer !== null) {
        clearInterval(confettiTimer);

        confettiTimer = null;
    }

    const container = document.getElementById("confettiContainer");

    if (container) {
        container.innerHTML = "";
    }

}


/* =========================================
   ULANGI WEBSITE
========================================= */

function restartWebsite() {

    stopConfetti();

    goTo("opening");

}


/* =========================================
   PHOTO PLACEHOLDER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const photo = document.querySelector(".graduation-photo");

    const placeholder = document.getElementById("photoPlaceholder");

    if (!photo || !placeholder) {
        return;
    }

    function updatePhotoPlaceholder() {

        if (!photo.complete || photo.naturalWidth === 0) {
            photo.style.display = "none";

            placeholder.style.display = "flex";
        } else {
            photo.style.display = "block";

            placeholder.style.display = "none";
        }

    }

    photo.addEventListener("load", updatePhotoPlaceholder);

    photo.addEventListener("error", updatePhotoPlaceholder);

    updatePhotoPlaceholder();

});