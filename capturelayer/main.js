process.on("unhandledRejection", (reason) => {
    console.error("UNHANDLED REJECTION:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

function createWindow() {

    const win = new BrowserWindow({
        width: 600,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.loadFile("index.html");
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.handle("save-note", async (_, note) => {
    try {

        const notesFile = path.join(__dirname, "notes.json");
        console.log("FILE:", notesFile);

        let notes = [];

        if (fs.existsSync(notesFile)) {
            const content = fs.readFileSync(notesFile, "utf8");

            if (content.trim()) {
                notes = JSON.parse(content);
            }
        }

        notes.push({
            id: Date.now(),
            content: note,
            createdAt: new Date().toISOString()
        });

        fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));



        return true;

    } catch (err) {
        console.error("❌ ERROR IN SAVE:", err);
        throw err;
    }
});