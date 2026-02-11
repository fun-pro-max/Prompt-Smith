const UI = {
    renderForm(template) {
        const container = document.getElementById('formFields');
        container.innerHTML = '';
        
        template.fields.forEach(field => {
            const div = document.createElement('div');
            div.className = 'field-group';
            div.innerHTML = `<label>${field.label} ${field.required ? '*' : ''}</label>`;
            
            let input;
            if (field.type === 'select') {
                input = document.createElement('select');
                field.options.forEach(opt => {
                    const o = document.createElement('option');
                    o.value = opt; o.textContent = opt;
                    input.appendChild(o);
                });
            } else {
                input = document.createElement('input');
                input.type = field.type;
            }
            
            input.name = field.id;
            input.id = `input_${field.id}`;
            input.addEventListener('input', () => app.triggerValidation());
            div.appendChild(input);
            container.appendChild(div);
        });

        this.renderSimulator(template);
    },

    renderSimulator(template) {
        const container = document.getElementById('simFields');
        const simSection = document.getElementById('simContainer');
        container.innerHTML = '';
        
        // Only simulate critical eligibility fields
        const crit = template.fields.filter(f => ['date', 'select'].includes(f.type));
        crit.forEach(f => {
            const div = document.createElement('div');
            div.innerHTML = `<label class="muted">${f.label}</label>`;
            const clone = document.getElementById(`input_${f.id}`).cloneNode(true);
            clone.id = `sim_${f.id}`;
            clone.addEventListener('input', (e) => {
                document.getElementById(`input_${f.id}`).value = e.target.value;
                app.triggerValidation();
            });
            div.appendChild(clone);
            container.appendChild(div);
        });
        simSection.style.display = 'block';
    },

    updateResults(data) {
        const list = document.getElementById('validationResults');
        const fill = document.getElementById('gaugeFill');
        const val = document.getElementById('riskValue');
        const lab = document.getElementById('riskLabel');

        list.innerHTML = data.issues.map(i => `
            <div class="issue-card ${i.severity}">
                <strong>${i.severity.toUpperCase()}</strong>: ${i.msg}
            </div>
        `).join('');

        const rotation = (data.risk.percent / 100) * 0.5;
        fill.style.transform = `rotate(${rotation}turn)`;
        fill.style.background = data.risk.color;
        val.textContent = `${data.risk.percent}%`;
        lab.textContent = data.risk.level;
        lab.style.color = data.risk.color;
        
        document.getElementById('actionFooter').style.display = 'flex';
    }
};