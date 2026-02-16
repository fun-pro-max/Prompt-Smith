const cards = document.querySelectorAll(".style-card");

// Check if category exists
const category = localStorage.getItem("promptCategory");

if (!category) {
    alert("No category selected. Redirecting...");
    window.location.href = "dashboard.html";
}

cards.forEach(card => {
    card.addEventListener("click", () => {
        const selectedStyle = card.getAttribute("data-style");

        localStorage.setItem("promptStyle", selectedStyle);

        // Move to builder (Step 3)
        window.location.href = "builder.html";
    });
});
