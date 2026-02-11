const app = {
    templates: [],
    currentTemplate: null,

    async init() {
        const res = await fetch('data/templates.json');
        const data = await res.json();
        this.templates = data.templates;

        const selector = document.getElementById('templateSelector');
        this.templates.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t.id;
            opt.textContent = t.name;
            selector.appendChild(opt);
        });

        selector.addEventListener('change', (e) => this.loadTemplate(e.target.value));
        document.getElementById('btnAutoFormat').addEventListener('click', () => this.autoFormat());
    },

    loadTemplate(id) {
        this.currentTemplate = this.templates.find(t => t.id === id);
        UI.renderForm(this.currentTemplate);
    },

    triggerValidation() {
        if (!this.currentTemplate) return;
        const form = document.getElementById('activeForm');
        const data = Object.fromEntries(new FormData(form));
        const results = RuleEngine.validate(this.currentTemplate, data);
        UI.updateResults(results);
    },

    autoFormat() {
        const form = document.getElementById('activeForm');
        const inputs = form.querySelectorAll('input[type="text"]');
        inputs.forEach(input => {
            let val = input.value.trim();
            if (input.name.includes('name')) val = val.replace(/\b\w/g, l => l.toUpperCase());
            input.value = val;
        });
        this.triggerValidation();
    }
};

app.init();