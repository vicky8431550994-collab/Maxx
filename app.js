const API_KEY = "AIzaSyA4fU4FVcG1nkFFblHmafpNX06SxvmgttI";
const startBtn = document.getElementById('start-btn');
const textInput = document.getElementById('text-input');
const sendBtn = document.getElementById('send-btn');
const responseDiv = document.getElementById('response');

// ಸೈಟ್ ಅಪ್‌ಡೇಟ್ ಆಗಿದೆಯೇ ಎಂದು ತಿಳಿಯಲು ಈ ಟೈಟಲ್ ಬದಲಾಯಿಸಿ
document.querySelector('h1').innerText = "MAX AI V4";

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

async function askMax(question) {
    responseDiv.innerHTML = "Max v4 ಯೋಚಿಸುತ್ತಿದ್ದಾನೆ...";
    try {
        // v1beta ಮತ್ತು flash ಮಾಡೆಲ್ - ಇದು ಸರಿಯಾದ ಕಾಂಬಿನೇಷನ್
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: question }] }] })
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error.message);

        const answer = data.candidates[0].content.parts[0].text;
        responseDiv.innerHTML = "<b>Max:</b> " + answer;
        speak(answer);
    } catch (e) {
        responseDiv.innerHTML = "<b>Error:</b> " + e.message;
    }
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

sendBtn.onclick = () => {
    const userSay = textInput.value;
    if(userSay.trim() !== "") {
        document.getElementById('transcript').innerHTML = "ನೀವು: " + userSay;
        textInput.value = "";
        askMax(userSay);
    }
};

recognition.onresult = (event) => {
    const userSay = event.results[0][0].transcript;
    document.getElementById('transcript').innerHTML = "ನೀವು: " + userSay;
    askMax(userSay);
};

startBtn.onclick = () => { recognition.start(); };
