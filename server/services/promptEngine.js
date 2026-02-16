function detectDomain(category) {
    const map = {
        coding: "Software Engineering",
        assignment: "Academic Development",
        image: "Creative Production",
        resume: "Career Development",
        research: "Analytical Research",
        automation: "Process Automation",
        custom: "General Problem Solving"
    };

    return map[category] || "General Domain";
}

module.exports = async function buildPrompt({
    idea,
    category,
    style,
    deliverable
})
 {
    const outputInstruction = deliverable && deliverable.trim().length
        ? `FINAL OUTPUT FORMAT:
The result must be delivered as: ${deliverable}.`
        : `FINAL OUTPUT FORMAT:
Choose the most appropriate professional format automatically.`;

    const domain = detectDomain(category);

    // -------------------------
    // ENGINEERING MODE
    // -------------------------
    if (style === "anatomy") {

        return `
You are operating as a professional ${domain} engineer.

PROJECT BRIEF:
${idea}

ENGINEERING OBJECTIVE:
Translate this concept into a production-ready solution.
Assume this will be built and deployed in a real environment.

REQUIRED APPROACH:
• Think like a system designer, not an assistant.
• Convert the idea into architecture and implementation logic.
• Make concrete technical decisions where details are missing.
• Prioritize scalability, maintainability, and usability.
• Avoid generic explanations. Focus on building.

DELIVERABLE STRUCTURE:

1. System Overview  
   Describe what is being built and why.

2. Core Features  
   Define functional capabilities clearly.

3. Technical Design  
   Suggest stack, components, and structure.

4. Implementation Plan  
   Step-by-step development outline.

5. Data / Logic Considerations  
   Explain how the system behaves internally.

6. Practical Output  
   Provide usable results (code structure, workflow, etc.)
${outputInstruction}
QUALITY STANDARD:
This should read like documentation prepared before real development begins.
Avoid fluff. Be precise and implementation-focused.
`.trim();
    }

    // -------------------------
    // STRUCTURED MODE
    // -------------------------
    else {

        return `
You are acting as an experienced ${domain} professional delivering a refined solution.

TASK CONTEXT:
${idea}

GOAL:
Turn this concept into a clear, usable outcome for practical execution.
Assume the reader wants clarity and results, not technical deep-dives.

WORKING PRINCIPLES:
• Interpret intent and organize it professionally.
• Expand the idea into something complete and easy to follow.
• Focus on usefulness and readability.
• Remove ambiguity by making smart assumptions.
• Keep tone professional but accessible.

OUTPUT FORMAT:

— Overview  
Explain the purpose and value of the solution.

— Key Elements  
Break down the important parts or functions involved.

— How It Works  
Describe the flow or logic in an understandable way.

— Practical Steps / Usage  
Show how someone would apply or execute this.

— Optional Enhancements  
Suggest improvements or extensions if relevant.
${outputInstruction}
EXPECTATION:
Deliver something that feels like a polished professional brief,
ready to act on immediately.
`.trim();
    }
};
