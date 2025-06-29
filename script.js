function calculateFriendship() {
  const name1 = document.getElementById("name1").value.trim();
  const name2 = document.getElementById("name2").value.trim();
  const resultBox = document.getElementById("resultBox");
  const display = document.getElementById("percentageDisplay");

  if (!name1 || !name2) {
    display.innerText = "Please enter both names!";
    resultBox.style.opacity = 1;
    return;
  }

  const percentage = Math.floor(Math.random() * 100) + 1;
  display.innerText = `Friendship Bond: ${percentage}% 💖`;
  resultBox.style.opacity = 1;
}
