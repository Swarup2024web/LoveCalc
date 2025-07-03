function LoveCalc() {
  const dob1 = document.getElementById("dob1").value;
  const dob2 = document.getElementById("dob2").value;
  const resultBox = document.getElementById("result");

  // Reset result styling
  resultBox.innerHTML = "";
  resultBox.style.opacity = "0";
  resultBox.style.transition = "opacity 1s ease";

  if (!dob1 || !dob2) {
    resultBox.innerHTML = `<span style="color: crimson;">❗ Please enter both birth dates!</span>`;
    resultBox.style.opacity = "1";
    return;
  }

  // Helper: Zodiac based on month & day
  const getZodiac = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const mmdd = month * 100 + day;

    if (mmdd >= 321 && mmdd <= 419) return "Aries ♈";
    if (mmdd >= 420 && mmdd <= 520) return "Taurus ♉";
    if (mmdd >= 521 && mmdd <= 620) return "Gemini ♊";
    if (mmdd >= 621 && mmdd <= 722) return "Cancer ♋";
    if (mmdd >= 723 && mmdd <= 822) return "Leo ♌";
    if (mmdd >= 823 && mmdd <= 922) return "Virgo ♍";
    if (mmdd >= 923 && mmdd <= 1022) return "Libra ♎";
    if (mmdd >= 1023 && mmdd <= 1121) return "Scorpio ♏";
    if (mmdd >= 1122 && mmdd <= 1221) return "Sagittarius ♐";
    if (mmdd >= 1222 || mmdd <= 119) return "Capricorn ♑";
    if (mmdd >= 120 && mmdd <= 218) return "Aquarius ♒";
    if (mmdd >= 219 && mmdd <= 320) return "Pisces ♓";
  };

  // Compatibility scores between zodiacs (simplified)
  const isHighlyCompatible = (z1, z2) => {
    const pairs = [
      ["Aries ♈", "Leo ♌"], ["Taurus ♉", "Virgo ♍"],
      ["Gemini ♊", "Libra ♎"], ["Cancer ♋", "Pisces ♓"],
      ["Leo ♌", "Sagittarius ♐"], ["Virgo ♍", "Taurus ♉"],
      ["Libra ♎", "Aquarius ♒"], ["Scorpio ♏", "Cancer ♋"],
      ["Sagittarius ♐", "Aries ♈"], ["Capricorn ♑", "Taurus ♉"],
      ["Aquarius ♒", "Gemini ♊"], ["Pisces ♓", "Scorpio ♏"]
    ];
    return pairs.some(
      ([a, b]) => (a === z1 && b === z2) || (a === z2 && b === z1)
    );
  };

  // Numerology-style score
  const num1 = Number(dob1.replace(/-/g, ""));
  const num2 = Number(dob2.replace(/-/g, ""));
  const sumDigits = (n) =>
    n
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  let score = (sumDigits(num1) + sumDigits(num2)) * 7;
  score = score % 101;

  // Zodiac signs
  const zodiac1 = getZodiac(dob1);
  const zodiac2 = getZodiac(dob2);

  let finalScore = score;
  let compatibilityNote = "";

  if (isHighlyCompatible(zodiac1, zodiac2)) {
    finalScore = Math.min(100, finalScore + 10);
    compatibilityNote = "🌟 Your stars align beautifully!";
  } else {
    compatibilityNote = "🔭 Stars show mixed signals.";
  }

  // Generate result message
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

  // Final HTML
  resultBox.innerHTML = `
    <div style="color: ${color}; font-size: 1.3rem; animation: ${animation} 1.2s ease;">
      🔐 Compatibility Score: <strong>${finalScore}%</strong><br/>
      <div style="margin: 0.4rem 0;">${message}</div>
      <small>🧿 ${zodiac1} + ${zodiac2}</small><br/>
      <em>${compatibilityNote}</em>
    </div>
  `;

  resultBox.style.opacity = "1";

  // Optional floating hearts animation
  if (animation === "hearts") {
    createHearts();
  }
}

// 💫 Floating hearts animation
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
