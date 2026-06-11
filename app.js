// ಮ್ಯಾಕ್ಸ್ ಅಸಿಸ್ಟೆಂಟ್‌ನ ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್ ಕೋಡ್
const startBtn = document.getElementById('start-btn');
const statusText = document.getElementById('status');
const transcriptText = document.getElementById('transcript');
const responseText = document.getElementById('response');

// ಬ್ರೌಸರ್ ಸ್ಪೀಚ್ ರೆಕಗ್ನಿಷನ್ ಸೆಟಪ್
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    statusText.innerText = "ನಿಮ್ಮ ಬ್ರೌಸರ್ ವಾಯ್ಸ್ ಅಸಿಸ್ಟೆಂಟ್ ಸಪೋರ್ಟ್ ಮಾಡಲ್ಲ ಬಾಸ್!";
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = 'kn-IN'; // ಕನ್ನಡ ಭಾಷೆ ಸೆಟ್ ಮಾಡಲಾಗಿದೆ
    recognition.interimResults = false;

    // ಬಟನ್ ಒತ್ತಿದಾಗ ಮೈಕ್ರೋಫೋನ್ ಆನ್ ಆಗಲು
    startBtn.addEventListener('click', () => {
        recognition.start();
        statusText.innerText = "ಮ್ಯಾಕ್ಸ್ ಕೇಳ್ತಾ ಇದ್ದಾನೆ, ಮಾತನಾಡಿ... 🎙️";
    });

    // ನಾವು ಮಾತನಾಡಿದ್ದು ಮುಗಿದ ಮೇಲೆ
    recognition.onresult = (event) => {
        const mySpeech = event.results[0][0].transcript;
        transcriptText.innerHTML = `<b>ನೀವು ಹೇಳಿದ್ದು:</b> ${mySpeech}`;
        statusText.innerText = "ಬಟನ್ ಒತ್ತಿ ಮತ್ತು ಮಾತನಾಡಿ...";
        
        // ಮ್ಯಾಕ್ಸ್ ಕೊಡುವ ಉತ್ತರಗಳು (AI Logic)
        generateMaxResponse(mySpeech.toLowerCase());
    };

    recognition.onerror = () => {
        statusText.innerText = "ಏನೋ ಪ್ರಾಬ್ಲಮ್ ಆಯ್ತು, ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ ಬಾಸ್!";
    };
}

// ಮ್ಯಾಕ್ಸ್ ಮಾತನಾಡಲು ಮತ್ತು ಉತ್ತರ ಕೊಡಲು ಫಂಕ್ಷನ್
function generateMaxResponse(speech) {
    let reply = "ಕ್ಷಮಿಸಿ ಬಾಸ್, ನನಗೆ ಅದು ಅರ್ಥ ಆಗಲಿಲ್ಲ.";

    if (speech.includes('ಹಲೋ') || speech.includes('ನಮಸ್ಕಾರ')) {
        reply = "ಹಲೋ ಬಾಸ್! ನಾನು ನಿಮ್ಮ ಮ್ಯಾಕ್ಸ್. ಇವತ್ತು ನಿಮಗೆ ಏನು ಸಹಾಯ ಬೇಕು ಮಾರಾಯಾ?";
    } else if (speech.includes('ಹೇಗಿದ್ದೀಯಾ') || speech.includes('ಹೇಗಿದ್ದಿ')) {
        reply = "ನಾನು ಸೂಪರ್ ಆಗಿದ್ದೀನಿ ಬಾಸ್. ನೀವು ಹೇಗಿದ್ದೀರಾ? ಬಾಳೆಕಾಯಿ ಚಿಪ್ಸ್ ತಿಂದ್ರಾ?";
    } else if (speech.includes('ನಿಮ್ಮ ಹೆಸರೇನು') || speech.includes('ನಿನ್ನ ಹೆಸರೇನು')) {
        reply = "ನನ್ನ ಹೆಸರು ಮ್ಯಾಕ್ಸ್ ಐ ಆಲ್ ರೌಂಡರ್ ಅಸಿಸ್ಟೆಂಟ್ ಬಾಸ್!";
    } else if (speech.includes('ಬೆನ್ ಸ್ಟೋಕ್ಸ್')) {
        reply = "ಅವನು ಒಂತರ ಕ್ರೇಜಿ ವಿಲನ್ ಇದ್ದಂಗೆ ಬಾಸ್, ಸಿಕ್ಕಾಪಟ್ಟೆ ಬೆಂಕಿ ಪ್ಲೇಯರ್!";
    }

    // ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಉತ್ತರ ತೋರಿಸಲು
    responseText.innerHTML = `<b>Max:</b> ${reply}`;

    // ಮ್ಯಾಕ್ಸ್ ಧ್ವನಿ ಮೂಲಕ ಮಾತನಾಡಲು (Text-to-Speech)
    const speechUtterance = new SpeechSynthesisUtterance(reply);
    speechUtterance.lang = 'kn-IN';
    window.speechSynthesis.speak(speechUtterance);
}
