const API_KEY = "AIzaSyATvSLjd0bv0sDuFJ9K7v1MxLsRMoZCnb4"; 

const startBtn = document.getElementById('start-btn');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

async function askMax(question) {
    document.getElementById('response').innerHTML = "<b>Max:</b> ಯೋಚಿಸುತ್ತಿದ್ದಾನೆ...";
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: question }] }] })
        });
        const data = await res.json();
        const answer = data.candidates[0].content.parts[0].text;
        document.getElementById('response').innerHTML = "<b>Max:</b> " + answer;
        speak(answer);
    } catch (e) {
        document.getElementById('response').innerHTML = "<b>Max:</b> Error connecting!";
        console.error(e);
    }
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

recognition.onresult = (event) => {
    const userSay = event.results[0][0].transcript;
    document.getElementById('transcript').innerHTML = "<i>ನೀವು: " + userSay + "</i>";
    document.getElementById('status').innerText = "ಬಟನ್ ಒತ್ತಿ ಮತ್ತು ಮಾತನಾಡಿ...";
    askMax(userSay);
};

// ಮೈಕ್ ಸಮಸ್ಯೆ ಇದ್ದರೆ ಸ್ಕ್ರೀನ್ ಮೇಲೆ ತೋರಿಸಲು ಹೊಸ ಕೋಡ್
recognition.onerror = function(event) {
    alert("ಮೈಕ್ ಸಮಸ್ಯೆ: " + event.error);
    document.getElementById('status').innerText = "ಮೈಕ್ ಆನ್ ಆಗಿಲ್ಲ, ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.";
};

startBtn.onclick = () => {
    document.getElementById('status').innerText = "ಮೈಕ್ ಆನ್ ಆಗುತ್ತಿದೆ... ದಯವಿಟ್ಟು ಮಾತನಾಡಿ!";
    recognition.start();
};
￼Enter
