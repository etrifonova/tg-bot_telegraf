const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
// const questionsGeography = require("../../questions");

const questions = [
  {question: "Столица Мадагаскара?", answer: "Антананариву"},
  {question: "В какой стране находится Петра?", answer: "Иордания"},
  {question: "На каком языке говорят в Либерии?", answer: "английский"},
  {question: "Какой горный хребет является самым высоким на Земле?", answer: "Гималаи"},
]

bot.start((ctx) => {
  console.log("It's alive!");
  try {
    return ctx.reply("Hello there");
  } catch (e) {
    console.error("error in start action:", e);
    return ctx.reply("Error occurred");
  }
});

let randomElement;
let questionsGeography = questions.slice(0);

function generateQuestion() {
  randomElement = questionsGeography.map((element) => element)[
    Math.floor(Math.random() * questionsGeography.length)
  ];
  return randomElement;
}

bot.command("geography", (ctx) => {
  randomElement = generateQuestion();
  console.log(questionsGeography.length);
  ctx.reply(randomElement.question + "\n" + questionsGeography.length);
});

// bot.command("update", (ctx) => {
//   questionsGeography = questions;
//   ctx.reply(questionsGeography.length);
// });

bot.on("message", (ctx) => {
  if (ctx.message.text === randomElement.answer) {
    questionsGeography.splice(questionsGeography.indexOf(randomElement), 1);
    randomElement = generateQuestion();
    ctx.reply("Верно!");
    if (questionsGeography.length === 0) {
      questionsGeography = questions.slice(0);
      console.log(questionsGeography.length);
      ctx.reply("Вопросы закончились");
    }
  } else {
    ctx.reply("Неверно!");
  }
});

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("error in handler:", e);
    return {
      statusCode: 400,
      body: "This endpoint is meant for bot and telegram communication",
    };
  }
};
