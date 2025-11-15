// ## `script.js`

// ```javascript
// Small, gentle script to control flip + edit
const card = document.getElementById("card");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const messagePane = document.getElementById("messagePane");
const messageArea = document.getElementById("messageArea");

function setAriaOpen(open) {
  openBtn.setAttribute("aria-expanded", open);
  messagePane.setAttribute("aria-hidden", !open);
}

openBtn.addEventListener("click", () => {
  card.classList.add("is-flipped");
  setAriaOpen(true);
  // move focus to message
  setTimeout(() => messageArea.focus(), 420);
});

closeBtn.addEventListener("click", () => {
  card.classList.remove("is-flipped");
  setAriaOpen(false);
  openBtn.focus();
});

editBtn.addEventListener("click", () => {
  messageArea.contentEditable = true;
  messageArea.focus();
  editBtn.hidden = true;
  saveBtn.hidden = false;
});

saveBtn.addEventListener("click", () => {
  messageArea.contentEditable = false;
  editBtn.hidden = false;
  saveBtn.hidden = true;
  // if empty, re-add placeholder text
  if (!messageArea.textContent.trim()) {
    messageArea.innerHTML =
      '<p class="placeholder">Tap edit and pour your heart. Start with: "My Lunara, six months of..."</p>';
  }
});

// keyboard accessibility: Enter key opens/closes
openBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") openBtn.click();
});
closeBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") closeBtn.click();
});

// clicking the message area when not editable toggles no-op (keeps focus)
messageArea.addEventListener("click", () => {
  if (messageArea.contentEditable === "true") return;
  // give gentle hint to click edit
  messageArea.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(0.995)" },
      { transform: "scale(1)" },
    ],
    { duration: 300, easing: "ease-out" }
  );
});

// small protective save on blur when editing
messageArea.addEventListener("blur", () => {
  if (messageArea.contentEditable === "true") {
    // auto-save behaviour: stop editing
    messageArea.contentEditable = false;
    editBtn.hidden = false;
    saveBtn.hidden = true;
  }
});
