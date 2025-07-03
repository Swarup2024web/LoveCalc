// Zodiac sign data
const zodiacData = [
  { name: "Aries", emoji: "♈", range: "Mar 21 – Apr 19", start: 321, end: 419 },
  { name: "Taurus", emoji: "♉", range: "Apr 20 – May 20", start: 420, end: 520 },
  { name: "Gemini", emoji: "♊", range: "May 21 – Jun 20", start: 521, end: 620 },
  { name: "Cancer", emoji: "♋", range: "Jun 21 – Jul 22", start: 621, end: 722 },
  { name: "Leo", emoji: "♌", range: "Jul 23 – Aug 22", start: 723, end: 822 },
  { name: "Virgo", emoji: "♍", range: "Aug 23 – Sep 22", start: 823, end: 922 },
  { name: "Libra", emoji: "♎", range: "Sep 23 – Oct 22", start: 923, end: 1022 },
  { name: "Scorpio", emoji: "♏", range: "Oct 23 – Nov 21", start: 1023, end: 1121 },
  { name: "Sagittarius", emoji: "♐", range: "Nov 22 – Dec 21", start: 1122, end: 1221 },
  { name: "Capricorn", emoji: "♑", range: "Dec 22 – Jan 19", start: 1222, end: 119 },
  { name: "Aquarius", emoji: "♒", range: "Jan 20 – Feb 18", start: 120, end: 218 },
  { name: "Pisces", emoji: "♓", range: "Feb 19 – Mar 20", start: 219, end: 320 }
];

// Get zodiac sign from date
function getZodiacData(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const mmdd = month * 100 + day;
  return zodiacData.find(z =>
    z.start <= z.end ? mmdd >= z.start && mmdd <= z.end : mmdd >= z.start || mmdd <= z.end
  );
}

// Zodiac compatibility pairs
function isHighlyCompatible(z1, z2) {
  const pairs = [
    ["Aries", "Leo"], ["Taurus", "Virgo"], ["Gemini", "Libra"], ["Cancer", "Pisces"],
    ["Leo", "Sagittarius"], ["Virgo", "Taurus"], ["Libra", "Aquarius"], ["Scorpio", "Cancer"],
    ["Sagittarius", "Aries"], ["Capricorn", "Taurus"], ["Aquarius", "Gemini"], ["Pisces", "Scorpio"]
  ];
  return pairs.some(([a, b]) => (a === z1 && b === z2) || (a === z2 && b === z1));
}

// Generate a romantic message
function generateRomanticLine(score) {
  if (score > 90) return "💞 Destiny has brought your hearts together!";
  if (score > 75) return "💕 Your connection is written in the stars.";
  if (score > 50) return "💓 A beautiful journey awaits your hearts.";
  if (score > 30) return "💗 The stars smile gently upon this bond.";
  return "💔 Love takes time. Let the stars guide you.";
}

// Main LoveCalc function
function LoveCalc() {
  const dob1 = document.getElementById("dob1").value;
  const dob2 = document.getElementById("dob2").value;
  const resultBox = document.getElementById("result");

  // Reset display
  resultBox.innerHTML = "";
  resultBox.style.opacity = "0";
  resultBox.style.transition = "opacity 1s ease";

  if (!dob1 || !dob2) {
    resultBox.innerHTML = `<span style="color: crimson;">❗ Please enter both birth dates!</span>`;
    resultBox.style.opacity = "1";
    return;
  }

  // Numerology score
  const num1 = Number(dob1.replace(/-/g, ""));
  const num2 = Number(dob2.replace(/-/g, ""));
  const sumDigits = (n) => n.toString().split('').reduce((a, d) => a + parseInt(d), 0);
  let score = (sumDigits(num1) + sumDigits(num2)) * 7 % 101;

  // Zodiac signs
  const z1 = getZodiacData(dob1);
  const z2 = getZodiacData(dob2);

  let finalScore = score;
  let compatibilityNote = isHighlyCompatible(z1.name, z2.name)
    ? "🌟 Your stars align beautifully!"
    : "🔭 Stars show mixed signals.";

  if (isHighlyCompatible(z1.name, z2.name)) {
    finalScore = Math.min(100, finalScore + 10);
  }

  // Visual message logic
  let message = "", color = "", animation = "";
  if (finalScore >= 90) {
    message = "💖 Soulmate Energy Detected!";
    color = "#ff4da6";
    animation = "hearts";
  } else if (finalScore >= 75) {
    message = "😍 Cosmic Connection!";
    color = "#ff85a2";
    animation = "glow";
  } else if (finalScore >= 50) {
    message = "😊 Compatible & Caring!";
    color = "#ffbd59";
    animation = "fade";
  } else if (finalScore >= 30) {
    message = "🙂 Worth Exploring.";
    color = "#ffa502";
    animation = "shake";
  } else {
    message = "😅 Stay Friends, Maybe?";
    color = "#a4b0be";
    animation = "shake";
  }

  // Output result
  resultBox.innerHTML = `
    <div style="color: ${color}; font-size: 1.3rem; animation: ${animation} 1.2s ease;">
      <strong>🔐 Compatibility Score: ${finalScore}%</strong><br/>
      <div style="margin: 0.4rem 0;">${message}</div>

      <div style="margin: 1rem 0;">
        <div style="background: #ddd; border-radius: 20px; overflow: hidden;">
          <div style="width: ${finalScore}%; background: ${color}; height: 16px; border-radius: 20px;"></div>
        </div>
      </div>

      <div class="zodiac-cards" style="display: flex; justify-content: space-around; margin: 1rem 0;">
        <div class="zodiac-card">
          <div style="font-size: 2rem;">${z1.emoji}</div>
          <strong>${z1.name}</strong><br/>
          <small>${z1.range}</small>
        </div>
        <div style="font-size: 1.5rem; align-self: center;">❤️</div>
        <div class="zodiac-card">
          <div style="font-size: 2rem;">${z2.emoji}</div>
          <strong>${z2.name}</strong><br/>
          <small>${z2.range}</small>
        </div>
      </div>

      <div style="margin-top: 1rem; font-style: italic; color: #555;">
        ${compatibilityNote}<br/>
        ${generateRomanticLine(finalScore)}
      </div>
    </div>
  `;

  resultBox.style.opacity = "1";

  if (animation === "hearts") {
    createHearts();
  }
}

// Floating hearts animation for high score
function createHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.textContent = "💗";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = Math.random() * 100 + "vh";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    heart.style.animation = `float ${Math.random() * 3 + 2}s ease-out forwards`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }
}

// Reset form and result
function resetCalc() {
  document.getElementById("dob1").value = "";
  document.getElementById("dob2").value = "";
  document.getElementById("result").innerHTML = "";
      }
