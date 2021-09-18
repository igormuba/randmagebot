const TeleBot = require("telebot");
const google = require("googlethis");
require("dotenv").config();

const bot = new TeleBot(process.env.token);

function remove_first_occurrence(str, searchstr) {
  var index = str.indexOf(searchstr);
  if (index === -1) {
    return str;
  }
  return str.slice(0, index) + str.slice(index + searchstr.length);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
bot.on("text", async (msg) => {
  if (msg.text.startsWith("@randomagebot ")) {
    for (let tries = 0; tries < 5; tries++) {
      try {
        let text = msg.text.startsWith("@randomagebot ");
        text = remove_first_occurrence(msg.text, "@randomagebot ");
        const images = await google.image(text, { safe: true });
        const titulo =
          images[Math.floor(Math.random() * images.length)].origin.title;
        let imagesTituloArray = titulo.split(" ");
        imagesTituloArray = imagesTituloArray.sort(() => 0.5 - Math.random());
        imagesTituloArray = imagesTituloArray.slice(
          0,
          Math.floor(Math.random() * images.length)
        );
        await sleep(30000);
        const imagesTitulo = await google.image(imagesTituloArray.join(" "), {
          safe: true,
        });
        let random = Math.floor(Math.random() * imagesTitulo.length);
        const resultado =
          imagesTitulo[Math.floor(Math.random() * imagesTitulo.length)];
        tries = 5;
        return msg.reply.photo(resultado.url, { asReply: true });
      } catch (err) {
        console.log(err);
        await sleep(30000);
        continue;
      }
    }
  }
});

bot.start();
