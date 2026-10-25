"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* ===================================
       1. FLOATING FLOWERS AND BUTTERFLIES
    =================================== */

    const decorationArea =
        document.getElementById("floatingDecoration");

    if (decorationArea) {

        const decorations = [
            "🌸",
            "🌷",
            "🦋",
            "✿",
            "✨",
            "🌼",
            "🍀"
        ];

        const numberOfDecorations =
            window.innerWidth < 600 ? 14 : 24;

        for (let i = 0; i < numberOfDecorations; i++) {

            const item = document.createElement("span");

            item.className = "float-item";

            item.textContent =
                decorations[
                    Math.floor(Math.random() * decorations.length)
                ];

            item.style.left =
                Math.random() * 100 + "%";

            item.style.animationDuration =
                (14 + Math.random() * 18) + "s";

            item.style.animationDelay =
                (-Math.random() * 25) + "s";

            item.style.fontSize =
                (15 + Math.random() * 17) + "px";

            decorationArea.appendChild(item);
        }
    }


    /* ===================================
       2. SCROLL REVEAL ANIMATION
    =================================== */

    const revealItems =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

        revealItems.forEach(function (item) {
            observer.observe(item);
        });

    } else {

        revealItems.forEach(function (item) {
            item.classList.add("visible");
        });
    }


    /* ===================================
       3. APOLOGY RESPONSE BUTTONS
    =================================== */

    const talkButton =
        document.getElementById("talkButton");

    const upsetButton =
        document.getElementById("upsetButton");

    const responseMessage =
        document.getElementById("responseMessage");


    function showResponse(message) {

        if (!responseMessage) {
            return;
        }

        responseMessage.textContent = message;

        responseMessage.classList.remove("show");

        // Restart the entrance animation.
        void responseMessage.offsetWidth;

        responseMessage.classList.add("show");
    }


    if (talkButton) {

        talkButton.addEventListener("click", function () {

            showResponse(
                "Thank you for being willing to talk, Isabella. " +
                "I'll listen calmly, understand your side, " +
                "and respect how you feel. 🌷"
            );

        });

    }


    if (upsetButton) {

        upsetButton.addEventListener("click", function () {

            showResponse(
                "I understand, Isabella. You don't have to forgive " +
                "me right now. Take all the time you need. " +
                "I'm genuinely sorry, and I'll respect your space. 🌼"
            );

        });

    }


    /* ===================================
       4. BACKGROUND MUSIC
    =================================== */

    const music =
        document.getElementById("backgroundMusic");

    const musicButton =
        document.getElementById("musicButton");


    if (music && musicButton) {

        musicButton.addEventListener("click", async function () {

            if (music.paused) {

                try {

                    await music.play();

                    musicButton.textContent = "♫ Music On";

                    musicButton.setAttribute(
                        "aria-pressed",
                        "true"
                    );

                } catch (error) {

                    showResponse(
                        "Background music is not available yet. " +
                        "If you want music, add a music.mp3 file " +
                        "inside the static folder. 🌷"
                    );

                }

            } else {

                music.pause();

                musicButton.textContent = "♫ Music Off";

                musicButton.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }

        });

    }


    /* ===================================
       5. SMOOTH SCROLL FOR INTERNAL LINKS
    =================================== */

    document.querySelectorAll('a[href^="#"]').forEach(
        function (link) {

            link.addEventListener("click", function (event) {

                const targetId =
                    link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        }
    );


    /* ===================================
       6. PREVENT ACCIDENTAL DOUBLE CLICKS
    =================================== */

    [talkButton, upsetButton].forEach(function (button) {

        if (!button) {
            return;
        }

        button.addEventListener("click", function () {

            button.classList.add("button-clicked");

            window.setTimeout(function () {
                button.classList.remove("button-clicked");
            }, 250);

        });

    });


    console.log("Isabella's apology website is ready! 🌷");

});