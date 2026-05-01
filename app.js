const API_KEY = "AIzaSyA4fU4FVcG1nkFFblHmafpNX06SxvmgttI";
const startBtn = document.getElementById('start-btn');
const textInput = document.getElementById('text-input');
const sendBtn = document.getElementById('send-btn');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

async function askMax(question) {
    // ಸೈಟ್ ಅಪ್‌ಡೇಟ್ ಆಗಿದೆಯೇ ಎಂದು ತಿಳಿಯಲು ಈ ಟೆಕ್ಸ್ಟ್ ಬದಲಾಯಿಸಲಾಗಿದೆ
    document.getElementById('response').innerHTML = "Max v2.0 ಯೋಚಿಸುತ್ತಿದ್ದಾನೆ...";
    try {
        // ನಾವು ಇಲ್ಲಿ ಸ್ಟೇಬಲ್ 'v1' ಬಳಸುತ್ತಿದ್ದೇವೆ
        const url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + API_KEY;
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
