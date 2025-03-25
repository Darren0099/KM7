document.addEventListener("DOMContentLoaded", function () {
    const ball = document.getElementById("ball");
    let cursorTimer, scrollTimer;

    function hideCursor() {
        ball.style.opacity = 0;
    }

    function showCursor() {
        ball.style.opacity = 1;
        clearTimeout(cursorTimer);
        cursorTimer = setTimeout(hideCursor, 2000);
    }

    document.addEventListener("mousemove", function (e) {
        requestAnimationFrame(() => {
            const x = e.clientX - ball.offsetWidth / 2;
            const y = e.clientY - ball.offsetHeight / 2;
            ball.style.transform = `translate(${x}px, ${y}px)`;
            showCursor();
        });
    });

    document.querySelectorAll("a, button, .hover-target").forEach((element) => {
        element.addEventListener("mouseenter", () => {
            ball.classList.add("hover-target");
        });
        element.addEventListener("mouseleave", () => {
            ball.classList.remove("hover-target");
        });
    });

    document.addEventListener("mousedown", () => {
        ball.classList.add("click-effect");
    });

    document.addEventListener("mouseup", () => {
        ball.classList.remove("click-effect");
    });

    document.addEventListener("dragstart", () => {
        ball.classList.add("dragging");
    });

    document.addEventListener("dragend", () => {
        ball.classList.remove("dragging");
    });

    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);

    function hideScrollbar() {
        document.body.classList.add("hidden-scrollbar");
    }

    function showScrollbar() {
        document.body.classList.remove("hidden-scrollbar");
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(hideScrollbar, 2000);
    }

    document.addEventListener("mousemove", showScrollbar);
    document.addEventListener("scroll", showScrollbar);
});


document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".tab").forEach(tab => {
        let text = tab.textContent.trim();
        tab.innerHTML = ""; // Kosongkan isi tab
        text.split('').forEach(letter => {
            let span = document.createElement("span");
            span.textContent = letter;
            tab.appendChild(span);
        });
    });
});


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
