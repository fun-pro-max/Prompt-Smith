const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        const selectedType = card.getAttribute("data-type");

        // Save selection in browser
        localStorage.setItem("promptCategory", selectedType);

        // Move to style selection page (next step)
        window.location.href = "style.html";
    });
});
