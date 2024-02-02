const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
// const questionsGeography = require("../../questions");

const questions = [
  { question: "Столица Мадагаскара?", answer: "Антананариву" },
  { question: "В какой стране находится Петра?", answer: "Иордания" },
  { question: "На каком языке говорят в Либерии?", answer: "английский" },
  {
    question: "Какой горный хребет является самым высоким на Земле?",
    answer: "Гималаи",
  },
  {
    question: "В какой стране находится Сахара, крупнейшая пустыня в мире?",
    answer: "Алжир",
  },
  {
    question: "Какое море омывает северную часть Африки?",
    answer: "Средиземное",
  },
  {
    question: "Какая страна занимает большую часть скандинавского полуострова?",
    answer: "Норвегия",
  },
  {
    question: "Какой город считается самым населенным в мире?",
    answer: "Токио",
  },
  { question: "Какая река является самой длинной в мире?", answer: "Амазонка" },
  {
    question: "Какое государство является крупнейшим по площади в Африке?",
    answer: "Алжир",
  },
  {
    question:
      "Какое озеро является самым крупным по площади в Северной Америке?",
    answer: "Супериор",
  },
  { question: "В какой стране находятся Гималаи?", answer: "Непал" },
  {
    question:
      "Какое море отделяет Аравийский полуостров от Индийского субконтинента?",
    answer: "Аравийское",
  },
  {
    question:
      "Какой из островов Карибского бассейна является наименьшим по площади?",
    answer: "Сент-Китс",
  },
  {
    question: "Какой город является самым северным столичным городом в мире?",
    answer: "Рейкьявик",
  },
  {
    question: "В какой стране находится самый высокогорный город планеты?",
    answer: "Боливия",
  },
  {
    question:
      "В какой стране находится самый глубокий каньон в мире, Котауаси (глубина 3535 метров)?",
    answer: "Перу",
  },
  { question: "Какое море отделяет Сицилию от Италии?", answer: "Тирренское" },
  {
    question:
      "Где находится Гринвичская часовня, определяющая нулевой меридиан?",
    answer: "Лондон",
  },
  {
    question: "Какое государство считается самым малонаселенным в мире?",
    answer: "Ватикан",
  },
  {
    question:
      "Какой водный путь соединяет Атлантический и Тихий океаны через Центральную Америку?",
    answer: "Панамский канал",
  },
  {
    question:
      "В какой стране находится самое высокое поселение на планете, Ла Ринконада?",
    answer: "Перу",
  },
  {
    question:
      "На границе каких двух стран находится самый высокий вулкан в мире Охос-дель-Саладо, расположенный на высоте 6893 метров? Указывайте страны подряд, в алфавитном порядке, без запятой.",
    answer: "Аргентина Чили",
  },
  {
    question:
      "Какое озеро считается самым глубоким в Африке (макс. глубина: 1471 метр)?",
    answer: "Танганьика",
  },
  {
    question:
      "Бассейн какой реки считается самым крупным в мире по площади водосбора?",
    answer: "Амазонка",
  },
];

let questionsGeography = questions;
let randomElement;
let answer;

bot.start((ctx) => {
  questionsGeography = questions;
  console.log("It's alive!");
  try {
    return ctx.reply("Hello there");
  } catch (e) {
    console.error("error in start action:", e);
    return ctx.reply("Error occured");
  }
});


function generateQuestion() {
  randomElement = questionsGeography.map((element) => element)[
    Math.floor(Math.random() * questionsGeography.length)
  ];
  return randomElement;
}

bot.command("geography", (ctx) => {
  if (questionsGeography.length > 0) {
    randomElement = generateQuestion();
    console.log(randomElement)
    ctx.reply(randomElement.question);
  } else ctx.reply("Вопросы закончились");
});

// bot.on("message", (ctx) => {
//   if (ctx.message.text === answer) {
//     questionsGeography.splice(questionsGeography.indexOf(randomElement), 1);
//     ctx.reply("Верно! \n \n " + randomElement.question + " \n \n " + questionsGeography.length);
//     } else {
//     ctx.reply("Неверно!");
//   }
// });

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
