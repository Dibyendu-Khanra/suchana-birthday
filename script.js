document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GET SECTIONS
    ===================================================== */

    const sections = document.querySelectorAll(".page");

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
    const letterButton = document.getElementById("letterButton");

    const openLetterButton =
        document.getElementById("openLetterButton");

    const finalButton =
        document.getElementById("finalButton");


    /* =====================================================
       MUSIC
    ===================================================== */

    const loveSong =
        document.getElementById("loveSong");

    const musicButton =
        document.getElementById("musicButton");

    let musicPlaying = false;


    /* =====================================================
       SHOW PAGE
    ===================================================== */

    function showPage(page) {

        if (!page) return;

        sections.forEach(function (section) {

            section.classList.remove("active");

        });

        page.classList.add("active");

        page.scrollTop = 0;

        /* Update URL hash without reloading */
        history.replaceState(null, "", "#" + page.id);

    }


    /* =====================================================
       START PAGE
    ===================================================== */

    showPage(welcomeSection);


    /* =====================================================
       START SURPRISE
    ===================================================== */

    if (startButton) {

        startButton.addEventListener("click", function () {

            startButton.innerHTML =
                "Let's begin... ❤️";

            startButton.disabled = true;


            /* Start music */

            if (loveSong) {

                loveSong.volume = 0.5;

                loveSong.play()
                    .then(function () {

                        musicPlaying = true;

                        if (musicButton) {
                            musicButton.innerHTML =
                                "🔊 Music On";
                        }

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
       BIRTHDAY WISH
    ===================================================== */

    const birthdayMessage =
        document.getElementById("birthdayMessage");


    const flames =
        document.querySelectorAll(".flame");


    if (wishButton) {

        wishButton.addEventListener("click", function () {

            /* Turn off candles */

            flames.forEach(function (flame, index) {

                setTimeout(function () {

                    flame.classList.add("off");

                }, index * 180);

            });


            wishButton.innerHTML =
                "Wish made! ❤️";

            wishButton.disabled = true;


            setTimeout(function () {

                if (birthdayMessage) {

                    birthdayMessage.style.display =
                        "block";

                }

                createConfetti();

                /* Enable letter button */

                if (letterButton) {

                    letterButton.disabled = false;

                }

            }, 700);

        });

    }


    /* =====================================================
       BIRTHDAY → LETTER
    ===================================================== */

    if (letterButton) {

        letterButton.addEventListener("click", function () {

            showPage(letterSection);

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


            lightboxImage.alt =
                image.alt;


            const caption =
                image.parentElement.querySelector(
                    ".photo-caption"
                );


            if (caption) {

                lightboxCaption.innerHTML =
                    caption.innerHTML;

            } else {

                lightboxCaption.textContent =
                    image.alt;

            }


            photoLightbox.classList.add("show");

            photoLightbox.setAttribute(
                "aria-hidden",
                "false"
            );

        });

    });


    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    function closePhotoLightbox() {

        if (!photoLightbox) return;

        photoLightbox.classList.remove("show");

        photoLightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        lightboxImage.src = "";

    }


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            closePhotoLightbox
        );

    }


    if (photoLightbox) {

        photoLightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === photoLightbox
                ) {

                    closePhotoLightbox();

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


                    /* Enable final surprise */

                    if (finalButton) {

                        finalButton.disabled = false;

                    }

                }, 850);

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


                /* Start typewriter */

                setTimeout(function () {

                    typeFinalMessage();

                    createConfetti();

                }, 500);

            }
        );

    }


    /* =====================================================
       FINAL TYPEWRITER
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

            if (index >= finalText.length) {
                return;
            }


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


        type();

    }


    /* =====================================================
       MUSIC TOGGLE
    ===================================================== */

    if (musicButton) {

        musicButton.addEventListener(
            "click",
            function () {

                if (!loveSong) return;


                if (musicPlaying) {

                    loveSong.pause();

                    musicPlaying = false;

                    musicButton.innerHTML =
                        "🔇 Music Off";

                } else {

                    loveSong.play()
                        .then(function () {

                            musicPlaying = true;

                            musicButton.innerHTML =
                                "🔊 Music On";

                        })
                        .catch(function (error) {

                            console.log(
                                "Music error:",
                                error
                            );

                        });

                }

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closePhotoLightbox();

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
