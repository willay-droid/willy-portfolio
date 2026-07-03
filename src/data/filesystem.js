export const filesystem = {
  "/": ["home/", "projects/", "contact/", "downloads/", "system.log"],
  "/home": ["willy/"],
  "/home/willy": [
    "about/",
    "skills/",
    "projects/",
    "contact/",
    "downloads/",
    "readme.txt",
  ],
  "/home/willy/about": ["profile.txt", "experience.txt", "education.txt"],
  "/home/willy/skills": ["skills.json", "tools.txt"],
  "/home/willy/projects": [
    "qr-absensi/",
    "bot-reminder/",
    "monitoring-alker/",
    "bot-datek-olt/",
  ],
  "/home/willy/contact": ["github", "whatsapp", "email"],
  "/home/willy/downloads": ["cv.pdf"],
};

export const files = {
  "/system.log": `SYSTEM LOG
[OK] Kernel initialized
[OK] Portfolio shell loaded
[OK] Visitor connected
[OK] Command parser active`,

  "/home/willy/readme.txt": `ROOT://WILLY

Interactive Portfolio Shell.
Type 'help' to see available commands.
Use 'ls', 'cd', 'pwd', and 'cat' to explore this system.`,

  "/home/willy/about/profile.txt": `Name   : Willyanto Diharjo
Role   : Automation Builder & System Developer
Status : Available

Saya lulusan IT yang fokus di pengembangan web dan automation system.
Saya sering membangun tools seperti bot Telegram, sistem monitoring,
QR system, dan automasi berbasis Google Apps Script.`,

  "/home/willy/about/experience.txt": `Current Experience:
Staff - Helpdesk Data Management

Focus:
- Data validation
- Network data support
- Automation tools
- Operational reporting`,

  "/home/willy/about/education.txt": `Education:
Information Technology Graduate

Focus Area:
- Web Development
- System Automation
- Database
- Software Development`,

  "/home/willy/skills/skills.json": `{
  "Automation": 96,
  "Telegram Bot": 92,
  "Google Apps Script": 90,
  "JavaScript": 84,
  "React": 80,
  "MySQL": 78
}`,

  "/home/willy/skills/tools.txt": `Tools:
- React
- JavaScript
- Google Apps Script
- Telegram API
- Google Sheets
- MySQL
- Supabase
- Excel`,

  "/home/willy/contact/github": `GitHub:
https://github.com/willay-droid`,

  "/home/willy/contact/whatsapp": `WhatsApp:
+6282218937297`,

  "/home/willy/contact/email": `Email:
w.diharjo7@gmail.com`,
};
