const API_KEY = "AIzaSyA4fU4FVcG1nkFFblHmafpNX06SxvmgttI";
const startBtn = document.getElementById('start-btn');
const textInput = document.getElementById('text-input');
const sendBtn = document.getElementById('send-btn');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
async function askMax(question) {
document.getElementById('response').innerHTML = "Max ಯೋಚಿಸುತ್ತಿದ್ದಾನೆ...";
try {
const res = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + API_KEY, {
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
