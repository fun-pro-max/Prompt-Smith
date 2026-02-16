function loadDashboardHistory() {
    const container = document.getElementById("dashboardHistory");
    const history = JSON.parse(localStorage.getItem("promptHistory") || "[]");

    container.innerHTML = "";

    history.slice(0, 5).forEach((item) => {
        const div = document.createElement("div");
        div.className = "historyCard";

        div.innerHTML = `
            <div>${item.date}</div>
            <button onclick='copyPrompt(${JSON.stringify(item.prompt)})'>Copy</button>
        `;

        container.appendChild(div);
    });
}

window.copyPrompt = function(prompt) {
    navigator.clipboard.writeText(prompt);
};

loadDashboardHistory();
