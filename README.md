# AutoBumper

A basic auto-bumper designed for Discord servers using [DISBOARD](https://disboard.org/). \
This project uses the built-in Node.js APIs, so there’s **no need to install additional npm packages**.

## Usage

You need to have the following dependencies installed:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download)

```sh
git clone https://github.com/lajczi/AutoBumper
cd AutoBumper
node index.js
```

> [!TIP]
> It's recommended to use `pm2` to keep the bumper running 24/7.

```sh
npm i -g pm2
cd ~/Coding/AutoBumper # change the path if yours is different
pm2 start index.js --name AutoBump
```

## Configuration

Edit the `config.js` file by filling in the required IDs and your **Discord account token**.

Using an alt account is strongly recommended to avoid any risk of getting banned.
