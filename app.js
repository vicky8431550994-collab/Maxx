const API_KEY = "AIzaSyA4fU4FVcG1nkFFblHmafpNX06SxvmgttI"; 

const startBtn = document.getElementById('start-btn');
const textInput = document.getElementById('text-input');
const sendBtn = document.getElementById('send-btn');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

async function askMax(question) {
    document.getElementById('response').innerHTML = "<b>Max:</b> ಯೋಚಿಸುತ್ತಿದ್ದಾನೆ...";
    try {
        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: question }] }] })
        });
        
        const data = await res.json();
        
        // ಇಲ್ಲಿ ತಪ್ಪು ಕಂಡುಹಿಡಿಯುವ ಲಾಜಿಕ್ ಇದೆ
        if (data.error) {
             throw new Error(data.error.message);
        }

        const answer = data.candidates[0].content.parts[0].text;
        document.getElementById('response').innerHTML = "<b>Max:</b> " + answer;
        speak(answer); 
    } catch (e) {
        // ಇದು ನಿಮಗೆ ನಿಜವಾದ ತಪ್ಪು ಏನೆಂದು ತೋರಿಸುತ್ತದೆ!
        document.getElementById('response').innerHTML = "<b>Max Error:</b> " + e.message;
        console.error(e);
    }
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

sendBtn.onclick = () => {
    const userSay = textInput.value;
    if(userSay.trim() !== "") {
        document.getElementById('transcript').innerHTML = "<i>ನೀವು (Type): " + userSay + "</i>";
        textInput.value = ""; 
        askMax(userSay);
    }
};

recognition.onresult = (event) => {
    const userSay = event.results[0][0].transcript;
    document.getElementById('transcript').innerHTML = "<i>ನೀವು (Voice): " + userSay + "</i>";
    document.getElementById('status').innerText = "ಬಟನ್ ಒತ್ತಿ ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ...";
    askMax(userSay);
};

recognition.onerror = function(event) {
    document.getElementById('status').innerText = "ಮೈಕ್ ಆನ್ ಆಗಿಲ್ಲ, ಟೈಪ್ ಮಾಡಿ ಕಳುಹಿಸಿ!";
};

startBtn.onclick = () => {
    document.getElementById('status').innerText = "ಮೈಕ್ ಆನ್ ಆಗುತ್ತಿದೆ... ದಯವಿಟ್ಟು ಮಾತನಾಡಿ!";
    recognition.start();
};
