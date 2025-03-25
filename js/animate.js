document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".home-banner-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            } else {
                entry.target.classList.remove("in-view");
            }
        });
    }, { threshold: 0.3 }); 

    cards.forEach((card) => observer.observe(card));
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".brand-title").style.opacity = "1";
    document.querySelector(".brand-logo-area").style.opacity = "1";
});

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".home-banner-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            } else {
                entry.target.classList.remove("in-view");
            }
        });
    }, { threshold: 0.3 });

    cards.forEach((card) => observer.observe(card));
});


document.addEventListener("DOMContentLoaded", function () {
    const serviceGrid = document.querySelector(".service-grid");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                serviceGrid.classList.add("in-view");
                serviceGrid.classList.remove("out-view");
            } else {
                serviceGrid.classList.add("out-view");
                serviceGrid.classList.remove("in-view");
            }
        });
    }, { threshold: 0.5 }); // Aktif saat 50% section terlihat

    observer.observe(serviceGrid);
});

// Animasi acak huruf untuk banyak ID dengan pola "studio-"
const shuffleTexts = document.querySelectorAll('[id^="studio"]');
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

shuffleTexts.forEach((element) => {
    const originalText = element.innerText;

    element.addEventListener("mouseenter", function () {
        let iteration = 0;
        const interval = setInterval(() => {
            element.innerText = originalText.split("")
                .map((char, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 30);
    });
});

/* preloader */
document.addEventListener("DOMContentLoaded", function () {
    let preloader = document.querySelector(".preloader-wrap");
    let percentage = document.querySelector(".percentage");
    let percentageFirst = document.querySelector(".percentage-first span");
    let percentageLast = document.querySelector(".percentage-last span");

    let counter = { value: 0 };

   
    document.body.style.overflow = "hidden";

    gsap.to(counter, {
        value: 99,
        duration: 3,
        ease: "power2.out",
        onUpdate: function () {
            let val = Math.floor(counter.value);
            percentage.innerHTML = `
                <span class="number number_2"><span>${Math.floor(val / 10)}</span></span>
                <span class="number number_3"><span>${val % 10}</span></span>
            `;
        },
        onComplete: function () {
            percentageFirst.style.opacity = "1";
            percentageFirst.style.transform = "translateY(0)";
            setTimeout(() => {
                gsap.to(counter, {
                    value: 100,
                    duration: 1,
                    ease: "power2.out",
                    onUpdate: function () {
                        let val = Math.floor(counter.value);
                        percentage.innerHTML = `
                            <span class="number number_2"><span>${Math.floor(val / 10)}</span></span>
                            <span class="number number_3"><span>${val % 10}</span></span>
                        `;
                    },
                    onComplete: function () {
                        percentageFirst.style.opacity = "0";
                        percentageLast.style.opacity = "1";
                        percentageLast.style.transform = "translateY(0)";
                        setTimeout(() => {
                            gsap.to(preloader, {
                                opacity: 0,
                                duration: 0.5,
                                onComplete: function () {
                                    preloader.style.display = "none";
                                    
                                    
                                    document.body.style.overflow = "auto";
                                }
                            });
                        }, 1000);
                    }
                });
            }, 1000);
        }
    });
});
