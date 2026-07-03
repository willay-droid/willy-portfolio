export const fileSystem = {
  "/": {
    type: "dir",
    children: {
      home: {
        type: "dir",
        children: {
          willy: {
            type: "dir",
            children: {
              "about.txt": {
                type: "file",
                content: `Hi, I'm Willy.

IT Graduate
Network Engineer
Automation Developer
React Developer
Google Apps Script Enthusiast`,
              },

              "skills.txt": {
                type: "file",
                content: `Technical Skills:

- React JS
- JavaScript
- Google Apps Script
- Telegram Bot Automation
- Google Sheets Automation
- Networking
- Web Development`,
              },

              "contact.txt": {
                type: "file",
                content: `Contact:

Email    : your-email@gmail.com
WhatsApp : 08xxxxxxxxxx
Location : Indonesia`,
              },

              projects: {
                type: "dir",
                children: {
                  portfolio: {
                    type: "dir",
                    children: {
                      "readme.txt": {
                        type: "file",
                        content:
                          "Personal portfolio website with terminal-style interface.",
                      },
                    },
                  },

                  "telegram-bots": {
                    type: "dir",
                    children: {
                      "readme.txt": {
                        type: "file",
                        content:
                          "Telegram bots for schedule reminders, finance tracking, and daily reports.",
                      },
                    },
                  },

                  "qr-attendance": {
                    type: "dir",
                    children: {
                      "readme.txt": {
                        type: "file",
                        content:
                          "QR-based attendance system using Google Apps Script and Google Sheets.",
                      },
                    },
                  },
                },
              },

              certificates: {
                type: "dir",
                children: {},
              },
            },
          },
        },
      },

      etc: {
        type: "dir",
        children: {},
      },

      var: {
        type: "dir",
        children: {},
      },
    },
  },
};
