import { styleText } from "node:util";
import { config } from "./config.js";

function getCurrentTime() {
  return new Date().toLocaleTimeString("pl-PL", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function generateNonce() {
  const min = BigInt(10) ** BigInt(18);
  const max = BigInt(10) ** BigInt(19);
  const randomBigInt =
    min + BigInt(Math.floor(Math.random() * Number(max - min)));
  return randomBigInt.toString();
}

function generateUUID() {
  return crypto.randomUUID();
}

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createDiscordHeaders(token) {
  return {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    authorization: token,
    "content-type": "application/json",
    origin: "https://discord.com",
    priority: "u=1, i",
    "sec-ch-ua":
      '"Not/A)Brand";v="8", "Chromium";v="130", "Google Chrome";v="130"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Linux"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "x-debug-options": "bugReporterEnabled",
    "x-discord-locale": "en-US",
    "x-discord-timezone": "UTC",
  };
}

async function bumper(token, guildId, channelId, serverName) {
  const payload = {
    type: 2,
    application_id: "302050872383242240",
    guild_id: guildId,
    channel_id: channelId,
    session_id: generateUUID(),
    data: {
      version: "1298024748633350295",
      id: "947088344167366698",
      name: "bump",
    },
    nonce: generateNonce(),
  };

  const response = await fetch("https://discord.com/api/v10/interactions", {
    method: "POST",
    headers: createDiscordHeaders(token),
    body: JSON.stringify(payload),
  });

  const timestamp = getCurrentTime();

  if (response.status === 204) {
    console.log(
      `${styleText("magenta", timestamp)} [${styleText(
        "green",
        "/"
      )}] ${styleText("yellow", ">>")} Used ${styleText(
        "green",
        "bump"
      )} command on ${serverName}!`
    );
  } else {
    console.log(
      `${styleText("magenta", timestamp)} [${styleText(
        "red",
        "/"
      )}] ${styleText("yellow", ">>")} Can't bump server: ${styleText(
        "red",
        serverName
      )}!`
    );
  }
}

(async () => {
  while (true) {
    const initialDelay = getRandomDelay(1000, 300000);
    await sleep(initialDelay);

    for (const server of config) {
      const { server_name, server_id, channel_id, token } = server;

      await bumper(token, server_id, channel_id, server_name);

      const serverDelay = getRandomDelay(1000, 10000);
      await sleep(serverDelay);
    }
  }
})();
