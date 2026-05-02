const API_KEY = "ಇಲ್ಲಿ_ನಿಮ್ಮ_ಹೊಸ_API_KEY_ಹಾಕಿ"; 

const startBtn = document.getElementById('start-btn');
const textInput = document.getElementById('text-input');
const sendBtn = document.getElementById('send-btn');
const responseDiv = document.getElementById('response');

// ಹೆಸರನ್ನು 'MAX' ಎಂದು ಬದಲಾಯಿಸಲಾಗಿದೆ
document.querySelector('h1').innerText = "MAX";

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

async function askMax(question) {
    responseDiv.innerHTML = "Max is thinking...";
    try {
        // ಅತ್ಯಂತ ಸ್ಥಿರವಾದ ಲಿಂಕ್ ಬಳಸಲಾಗಿದೆ
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: question }] }] })
        });

        const data = await res.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        const answer = data.candidates[0].content.parts[0].text;
        responseDiv.innerHTML = "<b>Max:</b> " + answer;
        speak(answer);
    } catch (e) {
        // ಎರರ್ ಬಂದರೆ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ
        responseDiv.innerHTML = "<b>Error:</b> " + e.message;
    }
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

sendBtn.onclick = () => {
    const val = textInput.value;
    if(val.trim()) {
        document.getElementById('transcript').innerHTML = "You: " + val;
        textInput.value = "";
        askMax(val);
    }
};

recognition.onresult = (event) => {
    const val = event.results[0][0].transcript;
    document.getElementById('transcript').innerHTML = "You: " + val;
    askMax(val);
};

startBtn.onclick = () => { recognition.start(); };
