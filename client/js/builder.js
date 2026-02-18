// Handle Generate Button Click
document.getElementById("generate").addEventListener("click", async () => {

    const idea = document.getElementById("idea").value;
    const points = document.getElementById("points").value;
    const deliverable = document.getElementById("deliverable").value;

    const category = localStorage.getItem("promptCategory");
    const style = localStorage.getItem("promptStyle");

    const button = document.getElementById("generate");
    const loader = document.getElementById("loadingIndicator");

    // 🟢 Show Loading State
    loader.classList.remove("loading-hidden");
    loader.classList.add("loading-visible");

    button.disabled = true;
    button.textContent = "Working...";

    try {
        const res = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idea,
                points,
                deliverable,
                category,
                style
            })
        });

        const data = await res.json();

        document.getElementById("result").textContent = data.prompt;

    } catch (err) {
        console.error("Frontend Error:", err);
        alert("Something went wrong while generating the prompt.");
    }

    // 🔴 Reset Loading State (runs whether success or error)
    loader.classList.remove("loading-visible");
    loader.classList.add("loading-hidden");

    button.disabled = false;
    button.textContent = "Generate Prompt";
});



// Handle Copy Button
document.getElementById("copyPrompt").addEventListener("click", () => {
    const text = document.getElementById("result").textContent;

    if (!text.trim()) return;

    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.getElementById("copyPrompt");
        copyBtn.textContent = "Copied!";

        setTimeout(() => {
            copyBtn.textContent = "Copy Prompt";
        }, 1500);
    });
});
