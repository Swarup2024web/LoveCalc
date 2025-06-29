function calculateLove() {
    const dob1 = document.getElementById("dob1").value;
    const dob2 = document.getElementById("dob2").value;
    const resultBox = document.getElementById("result");

    if (!dob1 || !dob2) {
        resultBox.textContent = "Please enter both dates!";
        return;
    }

    // Convert DOBs to numbers (YYYYMMDD)
    const num1 = Number(dob1.replace(/-/g, ""));
    const num2 = Number(dob2.replace(/-/g, ""));

    // Calculate a compatibility score using numerology-like method
    const sumDigits = (n) => n.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);

    let loveScore = sumDigits(num1) + sumDigits(num2);
    loveScore = (loveScore * 7) % 101;

    // Fun messages
    let message = "";
    if (loveScore > 90) message = "💘 Made for each other!";
    else if (loveScore > 75) message = "😍 Strong connection!";
    else if (loveScore > 50) message = "😊 Good vibes!";
    else if (loveScore > 30) message = "🙂 Worth knowing each other!";
    else message = "😅 Friendship may be a better option!";

    resultBox.innerHTML = `Love Compatibility: <strong>${loveScore}%</strong><br>${message}`;
}
