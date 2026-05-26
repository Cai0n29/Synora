

const saveBtn = document.getElementById("saveBtn");
const noteInput = document.getElementById("noteInput");
const status = document.getElementById("status");

saveBtn.addEventListener("click", async () => {
    console.log(window.electronAPI);
    const note = noteInput.value.trim();

    if (!note) {
        status.textContent = "Please enter a note.";
        return;
    }

    
    try {
    const result = await window.electronAPI.saveNote(note);
    console.log("Saved:", result);
   status.textContent = "Notes successfully saved!"
    } catch (err) {
    console.error("Save failed:", err);
}
});

