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
    do {
      try {
        let text = msg.text.startsWith("@randomagebot ");
        text = remove_first_occurrence(msg.text, "@randomagebot ");
        const images = await google.image(text, { safe: true });
        const titulo =
          images[Math.floor(Math.random() * images.length)].origin.title;
        const imagesTitulo = await google.image(titulo, { safe: true });
        let imagesTituloArray = string.split(" ");
        imagesTituloArray = imagesTituloArray.sort(() => 0.5 - Math.random());
        imagesTituloArray = shuffled.slice(
          0,
          Math.floor(Math.random() * images.length)
        );
        const resultado =
          imagesTitulo[Math.floor(Math.random() * imagesTitulo.length)];

        return msg.reply.photo(
          images[Math.floor(Math.random() * images.length)].url,
          { asReply: true }
        );
      } catch (err) {
        console.log(err);
        await sleep(1000);
        continue;
      }
      break;
    } while (true);
  }
});

bot.start();
