/* =========================
   ELEMENTS
========================= */

const startButton = document.getElementById("startButton");
const storySection = document.getElementById("story");

const memoryButton = document.getElementById("memoryButton");
const memoriesSection = document.getElementById("memories");

const birthdayButton = document.getElementById("birthdayButton");
const birthdaySection = document.getElementById("birthday");

const wishButton = document.getElementById("wishButton");
const birthdayMessage = document.getElementById("birthdayMessage");

const openLetterButton = document.getElementById("openLetterButton");
const envelope = document.getElementById("envelope");
const loveLetter = document.getElementById("loveLetter");

const finalButton = document.getElementById("finalButton");
const finalSection = document.getElementById("final");

const loveSong = document.getElementById("loveSong");


/* =========================
   OPEN SURPRISE + MUSIC
========================= */

startButton.addEventListener("click", function () {

    // Start music after user's click
    if (loveSong) {
        loveSong.volume = 0.7;

        loveSong.play()
            .then(() => {
                console.log("Music started ❤️");
            })
            .catch((error) => {
                console.log("Music could not start:", error);
            });
    }

    startButton.innerHTML = "Let's begin... ❤️";
    startButton.disabled = true;

    setTimeout(function () {

        storySection.scrollIntoView({
            behavior: "smooth"
        });

        startButton.disabled = false;
        startButton.innerHTML = "Open My Surprise 🎁";

    }, 700);

});


/* =========================
   MEMORIES
========================= */

memoryButton.addEventListener("click", function () {

    memoriesSection.scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================
   BIRTHDAY
========================= */

birthdayButton.addEventListener("click", function () {

    birthdaySection.scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================
   MAKE A WISH + BLOW CANDLES
========================= */

wishButton.addEventListener("click", function () {

    // Turn off all candle flames
    const flames = document.querySelectorAll(".flame");

    flames.forEach(function (flame) {

        flame.style.opacity = "0";

        flame.style.transform =
            "scale(0) translateY(-20px)";

    });


    // Change button
    wishButton.innerHTML =
        "Wish Made! 🎂❤️";

    wishButton.disabled = true;


    // Show birthday message
    setTimeout(function () {

        birthdayMessage.style.display =
            "block";

        createConfetti();

    }, 500);

});


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    for (let i = 0; i < 80; i++) {

        const confetti = document.createElement("div");

        confetti.innerHTML =
            ["❤️", "💕", "💖", "✨", "🎉"][
                Math.floor(Math.random() * 5)
            ];

        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-30px";
        confetti.style.fontSize =
            (15 + Math.random() * 20) + "px";

        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);

        const duration =
            2000 + Math.random() * 2500;

        confetti.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translateY(110vh) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            confetti.remove();
        }, duration);

    }

}


/* =========================
   LOVE LETTER
========================= */

openLetterButton.addEventListener("click", function () {

    envelope.classList.add("open");

    openLetterButton.innerHTML =
        "Opening... 💕";

    openLetterButton.disabled = true;

    setTimeout(function () {

        envelope.style.display = "none";
        loveLetter.style.display = "block";

    }, 800);

});


/* =========================
   FINAL SURPRISE
========================= */

finalButton.addEventListener("click", function () {

    finalSection.scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(function () {

        typeFinalMessage();

        createConfetti();

    }, 800);

});
/* =========================
   PHOTO LIGHTBOX
========================= */

const galleryImages =
    document.querySelectorAll(".gallery-item img");

const photoLightbox =
    document.getElementById("photoLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCaption =
    document.getElementById("lightboxCaption");

const closeLightbox =
    document.getElementById("closeLightbox");


galleryImages.forEach(function (image) {

    image.addEventListener("click", function () {

        lightboxImage.src =
            image.src;

        const caption =
            image.parentElement.querySelector(
                ".photo-caption"
            );

        if (caption) {

            lightboxCaption.innerHTML =
                caption.innerHTML;

        }

        photoLightbox.classList.add(
            "show"
        );

    });

});


/* Close button */

closeLightbox.addEventListener(
    "click",
    function () {

        photoLightbox.classList.remove(
            "show"
        );

    }
);


/* Click outside photo */

photoLightbox.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            photoLightbox
        ) {

            photoLightbox.classList.remove(
                "show"
            );

        }

    }
);


/* ESC key */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            photoLightbox.classList.remove(
                "show"
            );

        }

    }
);
/* =========================
   FINAL TYPEWRITER EFFECT
========================= */

const finalMessage =
    document.getElementById("finalMessage");

const finalText =
    "Suchana... ❤️\nYou are one of the most beautiful parts of my life.\nI hope you always remember how special you are to me.\nHappy Birthday, my love. 💕";

let typingStarted = false;

function typeFinalMessage() {

    if (typingStarted) return;

    typingStarted = true;

    let index = 0;

    finalMessage.innerHTML = "";

    function type() {

        if (index < finalText.length) {

            if (finalText[index] === "\n") {

                finalMessage.innerHTML += "<br>";

            } else {

                finalMessage.innerHTML +=
                    finalText[index];

            }

            index++;

            setTimeout(type, 45);

        }

    }

    type();

}