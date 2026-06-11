// ಮ್ಯಾಕ್ಸ್ ಅಸಿಸ್ಟೆಂಟ್‌ನ ಸಂಪೂರ್ಣ ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್ ಕೋಡ್
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
    recognition.lang = 'kn-IN'; // ಕನ್ನಡ ಭಾಷೆ
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
        
        // ಮ್ಯಾಕ್ಸ್ ಕೊಡುವ ಉತ್ತರಗಳ ಲಾಜಿಕ್
        generateMaxResponse(mySpeech.toLowerCase());
    };

    recognition.onerror = () => {
        statusText.innerText = "ಏನೋ ಪ್ರಾಬ್ಲಮ್ ಆಯ್ತು, ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ ಬಾಸ್!";
    };
}

// ಮ್ಯಾಕ್ಸ್ ಮಾತನಾಡಲು ಮತ್ತು ಬೇಸ್ ಧ್ವನಿ ಸೆಟ್ ಮಾಡಲು ಫಂಕ್ಷನ್
function generateMaxResponse(speech) {
    let reply = "ಕ್ಷಮಿಸಿ ಬಾಸ್, ನನಗೆ ಅದು ಅರ್ಥ ಆಗಲಿಲ್ಲ.";

    // ನೀವು ಕೇಳಿದ ಖದರ್ ಡೈಲಾಗ್ ಇಲ್ಲಿದೆ ಬಾಸ್
    if (speech.includes('ಹಲೋ') || speech.includes('ನಮಸ್ಕಾರ') || speech.includes('ಮ್ಯಾಕ್ಸ್')) {
        reply = "ತ** ಮುಚ್ಕೊಂಡು ಗುಂಡಿ ತೆಗಿರೋ ತಗಡ್ಗಳ ಎಲ ಗೌತಮ ಬತ್ತಿ ಇರು ನಿನ್ನ ತಾಯ್ನಾಡ ಬಂದ್ರೆ ಇಬ್ರಿಗೂ ಕಾಚಾ ಕಾಚಾ ಅಂತ ತುಳಿತಿನಿ";
    } else if (speech.includes('ಹೇಗಿದ್ದೀಯಾ') || speech.includes('ಹೇಗಿದ್ದಿ')) {
        reply = "ನಾನು ಸೂಪರ್ ಆಗಿದ್ದೀನಿ ಬಾಸ್. ನೀವು ಹೇಗಿದ್ದೀರಾ?";
    } else if (speech.includes('ನಿಮ್ಮ ಹೆಸರೇನು') || speech.includes('ನಿನ್ನ ಹೆಸರೇನು')) {
        reply = "ನನ್ನ ಹೆಸರು ಮ್ಯಾಕ್ಸ್ ಐ ಆಲ್ ರೌಂಡರ್ ಅಸಿಸ್ಟೆಂಟ್ ಬಾಸ್!";
    } else if (speech.includes('ಬೆನ್ ಸ್ಟೋಕ್ಸ್')) {
        reply = "ಅವನು ಒಂತರ ಕ್ರೇಜಿ ವಿಲನ್ ಇದ್ದಂಗೆ ಬಾಸ್, ಸಿಕ್ಕಾಪಟ್ಟೆ ಬೆಂಕಿ ಪ್ಲೇಯರ್!";
    }

    // ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಉತ್ತರ ತೋರಿಸಲು
    responseText.innerHTML = `<b>Max:</b> ${reply}`;

    // ವಾಯ್ಸ್ ಸೆಟ್ಟಿಂಗ್ಸ್
    const speechUtterance = new SpeechSynthesisUtterance(reply);
    speechUtterance.lang = 'kn-IN';

    // ಬ್ರೌಸರ್‌ನಲ್ಲಿರೋ ವಾಯ್ಸ್ ಲಿಸ್ಟ್ ತಗೊಳ್ಳುವುದು
    const voices = window.speechSynthesis.getVoices();
    
    // ಗಂಡಸಿನ ಧ್ವನಿ ಅಥವಾ ಗೂಗಲ್ ಇಂಡಿಯನ್ ಧ್ವನಿಯನ್ನು ಹುಡುಕುವುದು
    const maleVoice = voices.find(voice => 
        (voice.lang.includes('kn') || voice.lang.includes('hi') || voice.lang.includes('en')) && 
        (voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('google') || voice.name.toLowerCase().includes('ravi'))
    );

    if (maleVoice) {
        speechUtterance.voice = maleVoice;
    }

    // ಫುಲ್ ಖದರ್ ಬೇಸ್ ವಾಯ್ಸ್ ತರಲು ಸೆಟ್ಟಿಂಗ್ಸ್
    speechUtterance.pitch = 0.65; // ಪಿಚ್ ಅನ್ನು ತುಂಬಾ ಕಮ್ಮಿ ಮಾಡಲಾಗಿದೆ, ಇದರಿಂದ ಧ್ವನಿ ಫುಲ್ ದಪ್ಪಗೆ (Heavy Bass) ಕೇಳಿಸುತ್ತೆ
    speechUtterance.rate = 0.95;  // ಧ್ವನಿ ಗಂಭೀರವಾಗಿರಲು ಸ್ಪೀಡ್ ಸ್ವಲ್ಪ ಕಮ್ಮಿ ಮಾಡಲಾಗಿದೆ

    window.speechSynthesis.speak(speechUtterance);
}

// ಬ್ಯಾಕ್‌ಗ್ರೌಂಡ್‌ನಲ್ಲಿ ವಾಯ್ಸ್‌ಗಳು ಲೋಡ್ ಆಗಲು ಸೆಟಪ್
window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};
