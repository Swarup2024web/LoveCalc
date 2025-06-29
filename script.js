// Fun comments based on love percentage
const loveComments = [
    "💖 You're cosmic soulmates!",
    "💘 Love is in full bloom!",
    "😊 Strong bond with beautiful vibes.",
    "😄 Things look promising!",
    "🙂 There's potential to grow!",
    "😐 Neutral connection, needs time.",
    "😕 Bit rocky, try understanding each other.",
    "😣 Not quite aligned now.",
    "😢 Stars seem against this match.",
    "💔 Tough pairing... Stay friends maybe!"
];

// Zodiac compatibility chart (simplified for fun)
const zodiacCompatibility = {
    Aries: 1,
    Taurus: 2,
    Gemini: 3,
    Cancer: 4,
    Leo: 5,
    Virgo: 6,
    Libra: 7,
    Scorpio: 8,
    Sagittarius: 9,
    Capricorn: 10,
    Aquarius: 11,
    Pisces: 12
};

// Get zodiac sign from month and day
function getZodiac(month, day) {
    const zodiac = [
        ["Capricorn", 19], ["Aquarius", 18], ["Pisces", 20],
        ["Aries", 19], ["Taurus", 20], ["Gemini", 20],
        ["Cancer", 22], ["Leo", 22], ["Virgo", 22],
        ["Libra", 22], ["Scorpio", 21], ["Sagittarius", 21], ["Capricorn", 31]
    ];
    return day > zodiac[month][1] ? zodiac[month + 1][0] : zodiac[month][0];
}

// Convert name to numeric value
function nameValue(name) {
    return name
        .toUpperCase()
        .replace(/[^A-Z]/g, '')
        .split('')
        .reduce((sum, char) => sum + char.charCodeAt(0) - 64, 0);
}

// Calculate love percentage
function calculateLove(name1, dob1, name2, dob2) {
    const n1 = nameValue(name1);
    const n2 = nameValue(name2);

    const date1 = new Date(dob1);
    const date2 = new Date(dob2);

    const dobTotal = date1.getDate() + date1.getMonth() + date1.getFullYear()
        + date2.getDate() + date2.getMonth() + date2.getFullYear();

    const zodiac1 = getZodiac(date1.getMonth(), date1.getDate());
    const zodiac2 = getZodiac(date2.getMonth(), date2.getDate());

    const zodiacScore = Math.abs(zodiacCompatibility[zodiac1] - zodiacCompatibility[zodiac2]);

    let base = n1 + n2 + dobTotal;
    let love = 100 - (zodiacScore * 2) + (base % 50);

    if (love > 100) love = 100;
    if (love < 1) love = 1;

    return {
        percent: Math.round(love),
        zodiacs: [zodiac1, zodiac2]
    };
}

// Get fun comment
function getComment(percent) {
    if (percent >= 90) return loveComments[0];
    if (percent >= 80) return loveComments[1];
    if (percent >= 70) return loveComments[2];
    if (percent >= 60) return loveComments[3];
    if (percent >= 50) return loveComments[4];
    if (percent >= 40) return loveComments[5];
    if (percent >= 30) return loveComments[6];
    if (percent >= 20) return loveComments[7];
    if (percent >= 10) return loveComments[8];
    return loveComments[9];
}

// Handle form submission
document.getElementById("loveForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name1 = document.getElementById("name1").value.trim();
    const dob1 = document.getElementById("dob1").value;
    const name2 = document.getElementById("name2").value.trim();
    const dob2 = document.getElementById("dob2").value;
    const resultDiv = document.getElementById("result");

    if (!name1 || !name2 || !dob1 || !dob2) {
        resultDiv.innerHTML = "<p style='color:red;'>Please fill all fields.</p>";
        resultDiv.classList.remove("hidden");
        return;
    }

    const { percent, zodiacs } = calculateLove(name1, dob1, name2, dob2);
    const comment = getComment(percent);

    resultDiv.innerHTML = `
        <h2>❤️ Love Match: ${percent}%</h2>
        <p><strong>${name1}</strong> is a <strong>${zodiacs[0]}</strong></p>
        <p><strong>${name2}</strong> is a <strong>${zodiacs[1]}</strong></p>
        <p>${comment}</p>
    `;
    resultDiv.classList.remove("hidden");
});
