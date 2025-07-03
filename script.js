function calculateLove() {
    const dob1 = document.getElementById("dob1").value;
    const dob2 = document.getElementById("dob2").value;
    const resultBox = document.getElementById("result");

    // Reset styles before calculation
    resultBox.style.opacity = "0";
    resultBox.style.transition = "opacity 0.8s ease-in-out";
    resultBox.innerHTML = "";

    if (!dob1 || !dob2) {
        resultBox.innerHTML = `<span style="color: crimson;">❗ Please enter both dates!</span>`;
        resultBox.style.opacity = "1";
        return;
    }

    // Convert DOBs to numbers
    const num1 = Number(dob1.replace(/-/g, ""));
    const num2 = Number(dob2.replace(/-/g, ""));

    const sumDigits = (n) => n.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    let loveScore = sumDigits(num1) + sumDigits(num2);
    loveScore = (loveScore * 7) % 101;

    // Messages and colors
    let message = "", color = "";
    if (loveScore > 90) {
        message = "💘 Made for each other!";
        color = "#ff4d6d";
    } else if (loveScore > 75) {
        message = "😍 Strong connection!";
        color = "#ff85a2";
    } else if (loveScore > 50) {
        message = "😊 Good vibes!";
        color = "#ffaa66";
    } else if (loveScore > 30) {
        message = "🙂 Worth knowing each other!";
        color = "#f7b731";
    } else {
        message = "😅 Friendship may be a better option!";
        color = "#888";
    }

    // Render result with styling
    resultBox.innerHTML = `
        <div style="color: ${color}; font-size: 1.4rem;">
            ❤️ Love Compatibility: <strong>${loveScore}%</strong><br>
            <span style="font-size: 1.1rem;">${message}</span>
        </div>
    `;

    // Show result with fade-in
    setTimeout(() => {
        resultBox.style.opacity = "1";
    }, 100);
}
