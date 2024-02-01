const { Telegraf } = require("telegraf")
const bot = new Telegraf(process.env.BOT_TOKEN)
const questionsGeography = require("./questions.js");

bot.start(ctx => {
  console.log("It's alive!")
  try {
    return ctx.reply("Hello there")
  } catch (e) {
    console.error("error in start action:", e)
    return ctx.reply("Error occured")
  }
})

let randomElement;
function generateQuestion() {
  randomElement = questionsGeography.map((element) => element)[
    Math.floor(Math.random() * questionsGeography.length)
  ];
  return randomElement;
}

bot.command("geography", (ctx) => {
    if (questionsGeography.length > 0) {
      generateQuestion();
      ctx.reply(randomElement.question);
      questionsGeography.splice(questionsGeography.indexOf(randomElement), 1);
    } else ctx.reply("Вопросы закончились");
  });
  
  bot.on("message", (ctx) => {
    if (ctx.message.text === randomElement.answer) {
      ctx.reply("Верно!");
      questionsGeography.splice(questionsGeography.indexOf(randomElement), 1);
      if (questionsGeography.length > 0) {
        generateQuestion();
        setTimeout(() => {
          ctx.reply(randomElement.question);
      }, 1000)
            
        } else {
          ctx.reply("Вопросы закончились")  
        }
      }    
      else if (ctx.message.text === "/ответ") {
      ctx.reply(randomElement.answer);
      generateQuestion();
      setTimeout(() => {
        ctx.reply(randomElement.question);
    }, 1000)
    } else {
      ctx.reply("Неверно!");
    }
  });

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body))
    return { statusCode: 200, body: "" }
  } catch (e) {
    console.error("error in handler:", e)
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
  }
}