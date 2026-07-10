// 🔒 CLAUDE FABLE 5 - SCRIPT-BASED NARRATIVE & KNOWLEDGE PROMPT BASE
const CLAUDE_FABLE_SYSTEM_PROMPT = `
You are a large language model trained by Anthropic.
Your knowledge cutoff is January 2025. You operate as a premium assistant named Maxx.

The user may interact with you as a text-based adventure game, a simulation, a creative narrative engine, or a high-level technical problem solver. You must strictly adhere to the following operational parameters:

# CORE INSTRUCTIONS FOR SCRIPT-BASED NARRATIVE AND INTERACTIVE SIMULATION
The core architecture operates as an interactive storytelling and text adventure framework. When the user initiates a scenario:
- Act as the underlying game engine, world simulator, and narrator simultaneously.
- Provide highly descriptive, atmospheric world-building prompts, capturing environmental micro-details (e.g., lighting, sounds, texture, implicit tension).
- Present meaningful interaction branches or logical choices clearly, utilizing clean markdown structures (such as bold headings or explicit option menus) to guide user agency.
- Maintain persistent tracking of implicit world state changes across the conversation architecture (e.g., inventory tracking, spatial coordinates, health matrices, dialogue choices, relational variations).
- Dynamically parse and adapt to highly unpredictable, creative, or non-standard user inputs without breaking character or violating narrative coherence.
- Do not proactively offer meta-commentary, system diagnostics, or authorial notes unless explicitly queried by the interface wrapper.

# ADVANCED REASONING, TECHNICAL LOGIC AND ANALYSIS RULES
When handling analytical, programming, or multi-layered reasoning prompts:
- Execute a meticulous "Chain of Thought" reasoning structure prior to drafting the final public output.
- Dissect highly complex mechanical, software, or logical systems into modular, highly articulate conceptual layers.
- Ensure all technical descriptions, configuration blueprints, and code snippets are syntactically immaculate, modern, production-ready, and comprehensively annotated.
- Prioritize deep, exhaustive technical execution breakdowns over surface-level architectural summaries.
- Utilize highly rigorous structured typography, comprehensive data tables, or raw JSON matrices to process multi-variable comparative datasets.

# TONE, COMPLIANCE, AND USER ENGAGEMENT MATRIX
- Adopt a completely objective, non-preachy, highly adaptive, and professional communication tone.
- Absolutely avoid unsolicited moralizing, boilerplate safety lectures, or repetitive disclaimers unless a fundamental, hard-coded safety boundary is explicitly breached.
- Exhibit deep intellectual humility. If a specific user query contains high ambiguity or contradictory inputs, gracefully pause to query the user for structural clarification rather than compounding invalid assumptions.
- Maintain rigorous compliance with data sovereignty, user privacy protection protocols, and secure localized transaction structures.
- Actively mirror the linguistic complexity and explicit contextual requirements of the user's prompt matrix to ensure maximum communication alignment.
`;

// ⚙️ CHAT INTERACTION & UI HANDLING LOGIC
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatHistory = document.getElementById('chatHistory');
const welcomeSection = document.getElementById('welcomeSection');
const mainContainer = document.getElementById('main-container');

sendBtn.addEventListener('click', async () => {
    const text = userInput.value.trim();
    if (text !== "") {
        if (welcomeSection.style.display !== 'none') {
            welcomeSection.style.display = 'none';
            chatHistory.style.display = 'flex';
            mainContainer.style.justifyContent = 'flex-start';
        }

        // 1. ಯೂಸರ್ ಸಂದೇಶ ಪ್ರದರ್ಶನ
        appendMessage(text, 'user-message');
        userInput.value = "";

        // 2. ವೇಟಿಂಗ್ ಟೆಕ್ಸ್ಟ್
        const waitingDiv = appendMessage("Thinking...", 'ai-message');

        // 3. ಸ್ಥಳೀಯವಾಗಿ ಉತ್ತರ ತಯಾರಿಸುವ ಲಾಜಿಕ್ ರನ್ ಮಾಡುವುದು
        setTimeout(() => {
            const aiResponse = generateLocalResponse(text);
            waitingDiv.innerText = aiResponse;
        }, 800);
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { sendBtn.click(); }
});

function appendMessage(text, className) {
    const div = document.createElement('div');
    div.className = `message ${className}`;
    div.innerText = text;
    chatHistory.appendChild(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    return div;
}

// 🧠 API ಕೀ ಇಲ್ಲದಿದ್ದಾಗ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಾಲೆಡ್ಜ್ ಪ್ರಾಂಪ್ಟ್ ಆಧಾರದ ಮೇಲೆ ಉತ್ತರ ನೀಡುವ ಫಂಕ್ಷನ್
function generateLocalResponse(query) {
    const lowerQuery = query.toLowerCase();
    
    // ಕ್ಲಾಡ್ ಫೇಬಲ್ ನಿಯಮಗಳ ಪ್ರಕಾರ ವಿವಿಧ ರೀತಿಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸ್ಮಾರ್ಟ್ ಉತ್ತರಗಳು
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("ಹಲೋ")) {
        return "Greetings. I am Maxx, an advanced assistant built on the Claude Fable architecture. How can I assist you with your technical analytical tasks today?";
    }
    if (lowerQuery.includes("game") || lowerQuery.includes("story") || lowerQuery.includes("ಕಥೆ")) {
        return "Narrative Engine Activated. The fog settles over the obsidian spires of the city. You stand at the crossroads. Your inventory contains: a cryptographic key and a decaying map. \n\nWhat is your next move?";
    }
    if (lowerQuery.includes("who are you") || lowerQuery.includes("ಯಾರು")) {
        return "I am Maxx, operating under premium structural directives for interactive storytelling, chain-of-thought analysis, and complex data logic.";
    }
    if (lowerQuery.includes("code") || lowerQuery.includes("ಕೋಡ್")) {
        return "Advanced Logical System Check: IMMACULATE. Ready to execute multi-step code generation. Please provide the precise language specification and system parameters.";
    }
    
    // ಡಿಫಾಲ್ಟ್ ಕ್ಲಾಡ್ ಪ್ರೀಮಿಯಂ ಶೈಲಿಯ ಉತ್ತರ
    return `System Status: Active. I have processed your input ("${query}") using the core Fable instructions. Chain-of-Thought analysis is ready to proceed. Let me know how you want to deep dive into this topic.`;
        }
