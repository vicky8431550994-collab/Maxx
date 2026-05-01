const API_KEY = "AIzaSyATvSLjd0bv0sDuFJ9K7v1MxLsRMoZCnb4"; 

const startBtn = document.getElementById('start-btn');
const textInput = document.getElementById('text-input');
const sendBtn = document.getElementById('send-btn');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

// ಮ್ಯಾಕ್ಸ್‌ಗೆ ಪ್ರಶ್ನೆ ಕಳುಹಿಸುವ ಫಂಕ್ಷನ್
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
        speak(answer); // ಮ್ಯಾಕ್ಸ್ ಮಾತನಾಡಲು
    } catch (e) {
        document.getElementById('response').innerHTML = "<b>Max:</b> Error connecting!";
        console.error(e);
    }
}

// ಮಾತನಾಡುವ ಫಂಕ್ಷನ್
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

// 1. ಟೈಪ್ ಮಾಡಿ ಕಳುಹಿಸಿದಾಗ ಆಗಬೇಕಾದದ್ದು (Text Input Logic)
sendBtn.onclick = () => {
    const userSay = textInput.value;
    if(userSay.trim() !== "") {
        document.getElementById('transcript').innerHTML = "<i>ನೀವು (Type): " + userSay + "</i>";
        textInput.value = ""; // ಬಾಕ್ಸ್ ಖಾಲಿ ಮಾಡಲು
        askMax(userSay);
    }
};

// 2. ಮೈಕ್ ಮೂಲಕ ಮಾತನಾಡಿದಾಗ ಆಗಬೇಕಾದದ್ದು (Voice Logic)
recognition.onresult = (event) => {
    const userSay = event.results[0][0].transcript;
    document.getElementById('transcript').innerHTML = "<i>ನೀವು (Voice): " + userSay + "</i>";
    document.getElementById('status').innerText = "ಬಟನ್ ಒತ್ತಿ ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ...";
    askMax(userSay);
};

// ಮೈಕ್ ಸಮಸ್ಯೆ ಇದ್ದರೆ ತೋರಿಸಲು
recognition.onerror = function(event) {
    document.getElementById('status').innerText = "ಮೈಕ್ ಆನ್ ಆಗಿಲ್ಲ, ಟೈಪ್ ಮಾಡಿ ಕಳುಹಿಸಿ!";
};

// ಮೈಕ್ ಬಟನ್ ಒತ್ತಿದಾಗ
startBtn.onclick = () => {
    document.getElementById('status').innerText = "ಮೈಕ್ ಆನ್ ಆಗುತ್ತಿದೆ... ದಯವಿಟ್ಟು ಮಾತನಾಡಿ!";
    recognition.start();
};
