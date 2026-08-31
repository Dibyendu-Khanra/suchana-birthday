document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GET ALL SECTIONS
    ===================================================== */

    const sections = document.querySelectorAll("section");

    const welcomeSection = document.getElementById("welcome");
    const storySection = document.getElementById("story");
    const memoriesSection = document.getElementById("memories");
    const birthdaySection = document.getElementById("birthday");
    const letterSection = document.getElementById("letter");
    const finalSection = document.getElementById("final");


    /* =====================================================
       BUTTONS
    ===================================================== */

    const startButton = document.getElementById("startButton");
    const memoryButton = document.getElementById("memoryButton");
    const birthdayButton = document.getElementById("birthdayButton");
    const wishButton = document.getElementById("wishButton");
    const openLetterButton = document.getElementById("openLetterButton");
    const finalButton = document.getElementById("finalButton");


    /* =====================================================
       MUSIC
    ===================================================== */

    const loveSong = document.getElementById("loveSong");


    /* =====================================================
       SHOW ONLY ONE PAGE
    ===================================================== */

    function showPage(page) {

        if (!page) return;

        sections.forEach(function (section) {

            section.style.display = "none";

            section.classList.remove("active");

        });


        page.style.display = "flex";

        page.classList.add("active");


        /* Start from top of the new page */

        page.scrollTop = 0;

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }


    /* =====================================================
       START WITH WELCOME PAGE
    ===================================================== */

    showPage(welcomeSection);


    /* =====================================================
       OPEN MY SURPRISE
    ===================================================== */

    if (startButton) {

        startButton.addEventListener("click", function () {

            startButton.innerHTML = "Let's begin... ❤️";

            startButton.disabled = true;


            /* Start music after user interaction */

            if (loveSong) {

                loveSong.play()
                    .then(function () {

                        console.log("Music started ❤️");

                    })
                    .catch(function (error) {

                        console.log(
                            "Music could not start:",
                            error
                        );

                    });

            }


            setTimeout(function () {

                showPage(storySection);

                startButton.disabled = false;

                startButton.innerHTML =
                    "Open My Surprise 🎁";

            }, 500);

        });

    }


    /* =====================================================
       STORY → MEMORIES
    ===================================================== */

    if (memoryButton) {

        memoryButton.addEventListener("click", function () {

            showPage(memoriesSection);

        });

    }


    /* =====================================================
       MEMORIES → BIRTHDAY
    ===================================================== */

    if (birthdayButton) {

        birthdayButton.addEventListener("click", function () {

            showPage(birthdaySection);

        });

    }


    /* =====================================================
       MAKE A WISH
    ===================================================== */

    const birthdayMessage =
        document.getElementById("birthdayMessage");


    if (wishButton) {

        wishButton.addEventListener("click", function () {

            wishButton.innerHTML =
                "Wish made! ❤️";

            wishButton.disabled = true;


            if (birthdayMessage) {

                birthdayMessage.style.display = "block";

            }


            createConfetti();

        });

    }


    /* =====================================================
       CONFETTI / FLOATING EMOJIS
    ===================================================== */

    function createConfetti() {

        const emojis = [
            "❤️",
            "💕",
            "💖",
            "✨",
            "🎉",
            "💗",
            "🥰"
        ];


        for (let i = 0; i < 80; i++) {

            const confetti =
                document.createElement("div");


            confetti.innerHTML =
                emojis[
                    Math.floor(
                        Math.random() * emojis.length
                    )
                ];


            confetti.style.position = "fixed";

            confetti.style.left =
                Math.random() * 100 + "vw";

            confetti.style.top = "-30px";

            confetti.style.fontSize =
                (15 + Math.random() * 20) + "px";

            confetti.style.zIndex = "99999";

            confetti.style.pointerEvents = "none";


            document.body.appendChild(confetti);


            const duration =
                2000 + Math.random() * 2500;


            const rotation =
                Math.random() * 720;


            confetti.animate(

                [
                    {
                        transform:
                            "translateY(0) rotate(0deg)",

                        opacity: 1
                    },

                    {
                        transform:
                            `translateY(110vh) rotate(${rotation}deg)`,

                        opacity: 0
                    }
                ],

                {
                    duration: duration,

                    easing: "ease-out",

                    fill: "forwards"
                }

            );


            setTimeout(function () {

                confetti.remove();

            }, duration);

        }

    }


    /* =====================================================
       PHOTO LIGHTBOX
    ===================================================== */

    const photoLightbox =
        document.getElementById("photoLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxCaption =
        document.getElementById("lightboxCaption");

    const closeLightbox =
        document.getElementById("closeLightbox");


    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img"
        );


    galleryImages.forEach(function (image) {

        image.addEventListener("click", function () {

            if (!photoLightbox) return;


            lightboxImage.src =
                image.src;


            const caption =
                image.parentElement.querySelector(
                    ".photo-caption"
                );


            if (caption) {

                lightboxCaption.innerHTML =
                    caption.innerHTML;

            } else {

                lightboxCaption.innerHTML =
                    image.alt;

            }


            photoLightbox.style.display =
                "flex";

        });

    });


    /* Close lightbox */

    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            function () {

                photoLightbox.style.display =
                    "none";

            }
        );

    }


    /* Click outside image to close */

    if (photoLightbox) {

        photoLightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === photoLightbox
                ) {

                    photoLightbox.style.display =
                        "none";

                }

            }
        );

    }


    /* =====================================================
       LOVE LETTER
    ===================================================== */

    const envelope =
        document.getElementById("envelope");

    const loveLetter =
        document.getElementById("loveLetter");


    if (openLetterButton) {

        openLetterButton.addEventListener(
            "click",
            function () {

                if (envelope) {

                    envelope.classList.add("open");

                }


                openLetterButton.innerHTML =
                    "Opening... 💕";


                openLetterButton.disabled =
                    true;


                setTimeout(function () {

                    if (envelope) {

                        envelope.style.display =
                            "none";

                    }


                    if (loveLetter) {

                        loveLetter.style.display =
                            "block";

                    }

                }, 800);

            }
        );

    }


    /* =====================================================
       LETTER → FINAL SURPRISE
    ===================================================== */

    if (finalButton) {

        finalButton.addEventListener(
            "click",
            function () {

                showPage(finalSection);


                setTimeout(function () {

                    typeFinalMessage();

                    createConfetti();

                }, 700);

            }
        );

    }


    /* =====================================================
       FINAL TYPEWRITER MESSAGE
    ===================================================== */

    const finalMessage =
        document.getElementById("finalMessage");


    const finalText =
        "Suchana... ❤️\n" +
        "You are one of the most beautiful parts of my life.\n" +
        "I hope you always remember how special you are to me.\n" +
        "Happy Birthday, my love. 💕";


    let typingStarted = false;


    function typeFinalMessage() {

        if (!finalMessage) return;

        if (typingStarted) return;

        typingStarted = true;


        let index = 0;


        finalMessage.innerHTML = "";


        function type() {

            if (index < finalText.length) {

                if (finalText[index] === "\n") {

                    finalMessage.innerHTML +=
                        "<br>";

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


    /* =====================================================
       ESCAPE KEY CLOSES PHOTO
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                photoLightbox
            ) {

                photoLightbox.style.display =
                    "none";

            }

        }
    );


    /* =====================================================
       LOG
    ===================================================== */

    console.log(
        "❤️ Suchana Birthday Website loaded successfully!"
    );

});
