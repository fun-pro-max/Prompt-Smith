const RuleEngine = {
    validate(template, formData) {
        let issues = [];
        
        template.rules.forEach(rule => {
            const value = formData[rule.field];
            
            switch(rule.type) {
                case 'format_check':
                    if (value && !new RegExp(rule.pattern).test(value)) {
                        issues.push({ severity: 'minor', msg: rule.message });
                    }
                    break;
                
                case 'age_range':
                    const age = this.calculateAge(value, rule.params.ref);
                    const relax = rule.params.relaxation[formData['category']] || 0;
                    if (!value || age < rule.params.min || age > (rule.params.max + relax)) {
                        issues.push({ severity: 'critical', msg: `${rule.message} (Current age: ${age || 'N/A'})` });
                    }
                    break;

                case 'must_be_in':
                    if (!rule.values.includes(value)) {
                        issues.push({ severity: 'critical', msg: rule.message });
                    }
                    break;

                case 'numeric_consistency':
                    const num = parseFloat(value);
                    if (rule.params.max && num > rule.params.max) {
                        issues.push({ severity: 'major', msg: rule.message });
                    }
                    break;
            }
        });

        return { issues, risk: this.computeRisk(issues) };
    },

    calculateAge(dob, refDate) {
        if (!dob) return null;
        const birth = new Date(dob);
        const ref = new Date(refDate);
        let age = ref.getFullYear() - birth.getFullYear();
        const m = ref.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && ref.getDate() < birth.getDate())) age--;
        return age;
    },

    computeRisk(issues) {
        let score = 0;
        issues.forEach(i => {
            if (i.severity === 'critical') score += 30;
            if (i.severity === 'major') score += 10;
            if (i.severity === 'minor') score += 2;
        });
        
        if (score >= 30) return { percent: Math.min(score, 100), level: 'High', color: '#ef4444' };
        if (score >= 10) return { percent: score, level: 'Medium', color: '#f59e0b' };
        return { percent: Math.max(score, 5), level: 'Low', color: '#10b981' };
    }
};