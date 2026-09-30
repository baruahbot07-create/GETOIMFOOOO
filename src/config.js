/**
 * ============================================================================
 * GETO // TELEGRAM SYSTEM — MASTER CONFIGURATION (src/config.js)
 * ============================================================================
 * Edit this file to update bots, statuses, communities, social links, or music.
 * All dashboard counters and cards automatically recalculate from this file.
 */

export const CONFIG = {
  // ==========================================================================
  // 1. PROFILE & SYSTEM IDENTITY
  // ==========================================================================
  system: {
    websiteTitle: "GETO // TELEGRAM SYSTEM",
    terminalIdentity: "GETO@TELEGRAM:~$",
    systemLabel: "GETO SYSTEM",
    statusText: "● ONLINE",
  },

  profile: {
    name: "GETO",
    username: "@ll_DARK_GETO_ll",
    bioLines: [
      "#𝐃ᴏɴᴛ_𝐖ᴏʀʀʏ_𝐖ᴇ_𝐀ʀᴇ_𝐓ʜᴇ_𝐒ᴛʀᴏɴɢᴇsᴛ_",
      "#𝐃𝛆𝖋𝛂υℓ𝛕𝛆ɤ𝛅_𝛅𝛂ɤ𝛋𝛂ɤ",
    ],
    // Set to null or "" to display the custom CSS-rendered "GETO" avatar.
    // Replace with an image URL string only if you want a custom image.
    profileImage: null,
    avatarText: "GETO",
  },

  // ==========================================================================
  // 2. SOCIAL LINKS
  // -> EDIT HERE TO CHANGE SOCIAL LINKS OR USERNAMES
  // ==========================================================================
  socials: {
    telegram: {
      label: "Telegram",
      username: "@ll_DARK_GETO_ll",
      url: "https://t.me/ll_DARK_GETO_ll",
    },
    instagram: {
      label: "Instagram",
      username: "@miyamura_kun07",
      url: "https://www.instagram.com/miyamura_kun07?stkn=azUxZWR1bHlqd3J5",
    },
  },

  // ==========================================================================
  // 3. MUSIC CONFIGURATION
  // -> EDIT HERE TO ENABLE THE MUSIC PLAYER LATER
  // Change `musicEnabled: false` to `musicEnabled: true` to display the player.
  // ==========================================================================
  musicEnabled: false,
  music: {
    title: "GETO // DARK SYNTH PROTOCOL",
    artist: "@ll_DARK_GETO_ll",
    // Optional external audio stream/MP3 URL. If left empty, the built-in
    // Web Audio API dark ambient synth engine plays automatically when enabled.
    audioUrl: "",
    autoPlay: false,
  },

  // ==========================================================================
  // 4. DETAILED BOT INFORMATION (Featured Ecosystem Bots)
  // -> EDIT `status` ("active" or "deactivated") TO CHANGE BOT STATUS
  // -> ADD NEW OBJECTS TO THIS ARRAY TO ADD NEW DETAILED BOTS
  // ==========================================================================
  detailedBots: [
    {
      id: "detailed-aiko",
      name: "Aiko",
      username: "@Aiko07_bot",
      telegramUrl: "https://t.me/Aiko07_bot",
      category: "AI BOT",
      status: "active", // Change to "deactivated" to mark offline/deactivated
      description:
        "A friendly AI-powered Telegram assistant designed to interact with users and provide useful conversational assistance.",
    },
    {
      id: "detailed-group-moderation",
      name: "Group Bot",
      username: "@Groupmodertion_bot",
      telegramUrl: "https://t.me/Groupmodertion_bot",
      category: "GROUP HELP BOT",
      status: "active",
      description:
        "A Telegram group assistance bot designed to help communities with moderation and group-management tasks.",
    },
    {
      id: "detailed-font-bot",
      name: "Font Bot",
      username: "@CHANGE_THE_FONT_BOT",
      telegramUrl: "https://t.me/CHANGE_THE_FONT_BOT",
      category: "FONT CHANGING BOT",
      status: "active",
      description:
        "A Telegram utility bot for transforming normal text into different stylish and decorative font formats.",
    },
    {
      id: "detailed-sudo-main",
      name: "SUDO",
      username: "@ll_SUPRRME_XD_ll_BOT",
      telegramUrl: "https://t.me/ll_SUPRRME_XD_ll_BOT",
      category: "SUDO / UTILITY BOT",
      status: "active",
      description:
        "A utility-focused Telegram bot belonging to the SUDO bot ecosystem.",
    },
  ],

  // ==========================================================================
  // 5. BOT DATABASE (10 SUDO Bot Entries)
  // -> EDIT `status` ("active" or "deactivated") TO CHANGE BOT STATUS
  // -> ADD NEW OBJECTS TO THIS ARRAY TO ADD MORE SUDO / DATABASE BOTS
  // Note: Statuses reflect configured website status ("ACTIVE" / "DEACTIVATED").
  // ==========================================================================
  botDatabase: [
    {
      id: "sudo-bot-1",
      name: "SUDO BOT 1",
      telegramUrl: "https://t.me/ll_SUPRRME_XD_1_ll_BOT",
      status: "active",
    },
    {
      id: "sudo-bot-2",
      name: "SUDO BOT 2",
      telegramUrl: "https://t.me/ll_SUPRRME_XD_2_ll_BOT",
      status: "active",
    },
    {
      id: "sudo-bot-3",
      name: "SUDO BOT 3",
      telegramUrl: "https://t.me/ll_SUPRRME_XD_3_ll_BOT",
      status: "active",
    },
    {
      id: "sudo-bot-4",
      name: "SUDO BOT 4",
      telegramUrl: "https://t.me/ll_SUPRRME_XD_4_ll_BOT",
      status: "active",
    },
    {
      id: "sudo-bot-5",
      name: "SUDO BOT 5",
      telegramUrl: "https://t.me/ll_SUPRRME_XD_5_ll_BOT",
      status: "active",
    },
    {
      id: "sudo-bot-6",
      name: "SUDO BOT 6",
      telegramUrl: "https://t.me/ll_SUPRRME_XD_6_ll_BOT",
      status: "active",
    },
    {
      id: "sudo-bot-7",
      name: "SUDO BOT 7",
      telegramUrl: "https://t.me/ll_SUPRRME_XD_7_ll_BOT",
      status: "active",
    },
    {
      id: "sudo-bot-8",
      name: "SUDO BOT 8",
      telegramUrl: "https://t.me/ll_SUPRRME_XD_8_l_l_BOT",
      status: "active",
    },
    {
      id: "sudo-bot-9",
      name: "SUDO BOT 9",
      telegramUrl: "https://t.me/ll_SUPRRME_XD_9_ll_BOT",
      status: "active",
    },
    {
      id: "sudo-bot-10",
      name: "SUDO BOT 10",
      telegramUrl: "https://t.me/ll_SUPRRME_XD_10_ll_BOT",
      status: "active",
    },
  ],

  // ==========================================================================
  // 6. COMMUNITIES
  // -> ADD OR EDIT COMMUNITY ENTRIES HERE
  // If `memberCount` is not provided, the UI automatically hides the field.
  // ==========================================================================
  communities: [
    {
      id: "comm-sudo-use",
      name: "SUDO USE",
      type: "SUDO USE BOT",
      telegramUrl: "https://t.me/GETO_SUDO_USE",
      description:
        "Official SUDO ecosystem space for users and community members.",
      status: "active",
    },
    {
      id: "comm-do-not-entry",
      name: "DO NOT ENTRY",
      type: "CHATTING GROUP",
      telegramUrl: "https://t.me/+hp2bEQ4WBNBjMWQ1",
      description:
        "A Telegram chatting community for conversation and interaction.",
      status: "active",
    },
    {
      id: "comm-defaulter",
      name: "DEFAULTER",
      type: "FIGHTING GROUP AND MY COMMUNITY",
      telegramUrl: "https://t.me/+6q5QlKh32L9hNGI1",
      description: "A community space connected to the DEFAULTER group.",
      status: "active",
    },
  ],

  // ==========================================================================
  // 7. ABOUT SECTION
  // Mysterious developer-style introduction using ONLY provided information.
  // ==========================================================================
  about: {
    heading: "System Architect & Telegram Ecosystem",
    paragraphs: [
      "Operating under the handle @ll_DARK_GETO_ll, GETO architects and maintains an independent network of Telegram utility bots, automated group systems, and interconnected community spaces.",
      "Built around the SUDO bot ecosystem and specialized Telegram assistants—including conversational AI (Aiko), group moderation infrastructure, and typographic transformation utilities—every node is engineered for direct deployment across active Telegram groups and channels.",
      "From the official SUDO USE hub to the DEFAULTER and DO NOT ENTRY spaces, the GETO SYSTEM unifies bot instances and community channels under a single dark-protocol directory.",
    ],
    focusAreas: [
      {
        label: "Identity",
        value: "GETO (@ll_DARK_GETO_ll)",
      },
      {
        label: "Core Network",
        value: "Telegram Bot & Community Ecosystem",
      },
      {
        label: "Bot Architecture",
        value: "SUDO Fleet · AI Assistant · Group Moderation · Font Utility",
      },
      {
        label: "Active Spaces",
        value: "SUDO USE · DO NOT ENTRY · DEFAULTER",
      },
    ],
  },
};

export default CONFIG;
