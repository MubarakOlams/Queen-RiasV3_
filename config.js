const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0pld3EvaXlkVmNveE9Dam1TeVErUjMrYndlZWtXZWpHVElQdm42YWszOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGM2azNvWTRsbkhFWTNwSlJRNCtjNTdmUzJ4TzV4dG0yOHh3T3pIQkV3OD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjSmNaKys0a0xraEI0aHNYdkE2VWY1RU8zK3BIYVB4bG9FZjEwODZ5ZmtZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2cEdhS1RST09hMFdRamNyWWtQWVliM3hPRnRyemt6ZHVUdllMNEFDZzAwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhHemwzejNpRElFS3Q0dXVGQ2ZiWVY4NVRwUDBEem5Eb0NOaFNQZjJ4M0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBKTTVPV3BERnBkYWl6TnQzVVp1NjRxcjhEb05MY0ZWRUYxTlZ3MHZSU009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU9ncHlWTXArK3FCcGR2S1lwY3BRQ1FiU2NsaVpVVkdmOHdBZVFZY0xucz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWis1QmdvZWxzOXpCWkZKR2tLMjFIOEZvUHpvNW51UzN0UXoyK2w3cjZ3WT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik4vYzZsYzVnV29ORWpDVlI0K3VVNHBCS1pYRTJRMkY4SkVPMGF0dFh4VHBNN1lhOCtkYVpTdlB0Z1RZcnpDYVRxbzdQUEZ6elZEQXJkRFZpY1pnYUNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTYsImFkdlNlY3JldEtleSI6IjNpdkxYUWNROXg4SFphWnd6RGlJaUdURWptUW12M1czZlB0ck0xaTNPZ1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IllaNlFQMlJFIiwibWUiOnsiaWQiOiIyMzQ4MTEyMzc1MzA0OjgwQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjM4NDg3MDE4MTc2NjY0OjgwQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS09YazAwUXVwT092Z1lZQ3lBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVHpaM1JHNmNoK2Q3cjlPYVFHWmdtMkF4R0JRZFZFZUZGb1cwNjJMaGd4TT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNUdQTnlGb0w3c0ZpaC9PMnIyc1JQQW16L0g1Qlh1aGxJTE5WY0FxZ3Q2VGtVY0dwMitTQTFKUnlmWGtyMmZhM2tXaEw1d0dwVDNRNGM3bVdTUnNyQlE9PSIsImRldmljZVNpZ25hdHVyZSI6ImpzNWllRE42ckk1V2tmOXhFWXV4NDR0QzQ0OG1QU3o1aWc0dEhtUGd3TzZrMGFoUjMxTUduTkhkZVhaOU1EdnlHNXM4MVdVeXlzTWhjSGFMUWV2R0F3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODExMjM3NTMwNDo4MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVODJkMFJ1bklmbmU2L1Rta0JtWUp0Z01SZ1VIVlJIaFJhRnRPdGk0WU1UIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDA4NjgwMzksImxhc3RQcm9wSGFzaCI6IjJQMVloZiJ9.",
    ownerName: process.env.OWNER_NAME || "Mubarak-Olams",
    ownerNumber: process.env.OWNER_NUMBER || "2348112375304",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
