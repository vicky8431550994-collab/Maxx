const API_KEY = "AIzaSyATvSLjd0bv0sDuFJ9K7v1MxLsRMoZCnb4"; 

const startBtn = document.getElementById('start-btn');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

async function askMax(question) {
    document.getElementById('response').innerText = "Max ಯೋಚಿಸುತ್ತಿದ್ದಾನೆ...";
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: question }] }] })
        });
        const data = await res.json();
        const answer = data.candidates[0].content.parts[0].text;
        document.getElementById('response').innerText = "Max: " + answer;
        speak(answer);
    } catch (e) {
        document.getElementById('response').innerText = "Max: Error connecting!";
        console.error(e);
    }
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

recognition.onresult = (event) => {
    const userSay = event.results[0][0].transcript;
    document.getElementById('transcript').innerText = "ನೀವು: " + userSay;
    askMax(userSay);
};

startBtn.onclick = () => recognition.start();
￼Enter
