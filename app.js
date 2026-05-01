const API_KEY = "AIzaSyA4fU4FVcG1nkFFblHmafpNX06SxvmgttI";
const startBtn = document.getElementById('start-btn');
const textInput = document.getElementById('text-input');
const sendBtn = document.getElementById('send-btn');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

async function askMax(question) {
    // ಇದು ಬದಲಾಗಿದ್ದರೆ ಮಾತ್ರ ನಿಮ್ಮ ಸೈಟ್ ಅಪ್‌ಡೇಟ್ ಆಗಿದೆ ಎಂದು ಅರ್ಥ
    document.getElementById('response').innerHTML = "Max v3 ಪರೀಕ್ಷಿಸುತ್ತಿದ್ದಾನೆ...";
    try {
        // ಈ ಲಿಂಕ್ ಅನ್ನು ಅತ್ಯಂತ ಜಾಗರೂಕತೆಯಿಂದ ಬದಲಾಯಿಸಲಾಗಿದೆ
        const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY;
        
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: question }] }] })
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error.message);

        const answer = data.candidates[0].content.parts[0].text;
        document.getElementById('response').innerHTML = "<b>Max:</b> " + answer;
        speak(answer);
    } catch (e) {
        document.getElementById('response').innerHTML = "<b>Error:</b> " + e.message;
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
