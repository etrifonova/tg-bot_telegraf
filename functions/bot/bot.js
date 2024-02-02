const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
// const questionsGeography = require("../../questions");

// const questions = [
//   { question: "Столица Мадагаскара?", answer: "Антананариву" },
//   { question: "В какой стране находится Петра?", answer: "Иордания" },
//   { question: "На каком языке говорят в Либерии?", answer: "английский" },
//   {
//     question: "Какой горный хребет является самым высоким на Земле?",
//     answer: "Гималаи",
//   },
//   {
//     question: "В какой стране находится большая часть пустыни Сахара?",
//     answer: "Алжир",
//   },
//   {
//     question: "Какое море омывает северную часть Африки?",
//     answer: "Средиземное",
//   },
//   {
//     question: "Какая страна занимает большую часть скандинавского полуострова?",
//     answer: "Норвегия",
//   },
//   {
//     question: "Какой город считается самым населенным в мире?",
//     answer: "Токио",
//   },
//   { question: "Какая река является самой длинной в мире?", answer: "Амазонка" },
//   {
//     question: "Какое государство является крупнейшим по площади в Африке?",
//     answer: "Алжир",
//   },
//   {
//     question:
//       "Какое озеро является самым крупным по площади в Северной Америке?",
//     answer: "Супериор",
//   },
//   { question: "В какой стране находятся Гималаи?", answer: "Непал" },
//   {
//     question:
//       "Какое море отделяет Аравийский полуостров от Индийского субконтинента?",
//     answer: "Аравийское",
//   },
//   {
//     question:
//       "Какой из островов Карибского бассейна является наименьшим по площади?",
//     answer: "Сент-Китс",
//   },
//   {
//     question: "Какой город является самым северным столичным городом в мире?",
//     answer: "Рейкьявик",
//   },
//   {
//     question: "В какой стране находится самый высокогорный город планеты?",
//     answer: "Боливия",
//   },
//   {
//     question:
//       "В какой стране находится самый глубокий каньон в мире, Котауаси (глубина 3535 метров)?",
//     answer: "Перу",
//   },
//   { question: "Какое море отделяет Сицилию от Италии?", answer: "Тирренское" },
//   {
//     question:
//       "Где находится Гринвичская часовня, определяющая нулевой меридиан?",
//     answer: "Лондон",
//   },
//   {
//     question: "Какое государство считается самым малонаселенным в мире?",
//     answer: "Ватикан",
//   },
//   {
//     question:
//       "Какой водный путь соединяет Атлантический и Тихий океаны через Центральную Америку?",
//     answer: "Панамский канал",
//   },
//   {
//     question:
//       "В какой стране находится самое высокое поселение на планете, Ла Ринконада?",
//     answer: "Перу",
//   },
//   {
//     question:
//       "На границе каких двух стран находится самый высокий вулкан в мире Охос-дель-Саладо, расположенный на высоте 6893 метров? Указывайте страны подряд, в алфавитном порядке, без запятой.",
//     answer: "Аргентина Чили",
//   },
//   {
//     question:
//       "Какое озеро считается самым глубоким в Африке (макс. глубина: 1471 метр)?",
//     answer: "Танганьика",
//   },
//   {
//     question:
//       "Бассейн какой реки считается самым крупным в мире по площади водосбора?",
//     answer: "Амазонка",
//   },
// ];

// let questionsGeography = questions;
// let randomElement;

// bot.start((ctx) => {
//   console.log("It's alive!");
//   try {
//     return ctx.reply("Hello there");
//   } catch (e) {
//     console.error("error in start action:", e);
//     return ctx.reply("Error occured");
//   }
// });

// function generateQuestion() {
//   randomElement = questionsGeography.map((element) => element)[
//     Math.floor(Math.random() * questionsGeography.length)
//   ];
//   return randomElement;
// }

// randomElement = generateQuestion();

// bot.command("geography", (ctx) => {
//   console.log(randomElement);
//   ctx.reply(randomElement.question + "\n" + questionsGeography.length);
// });

// bot.command("update", (ctx) => {
//   questionsGeography = questions;
//   ctx.reply(questionsGeography.length);
// });

// bot.on("message", (ctx) => {
//   if (ctx.message.text === randomElement.answer) {
//     questionsGeography.splice(questionsGeography.indexOf(randomElement), 1);
//     randomElement = generateQuestion();
//     ctx.reply("Верно!");
//     if (questionsGeography.length === 0) {
//       ctx.reply("Вопросы закончились");
//     }
//   } else {
//     ctx.reply("Неверно!");
//   }
// });

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'I\'m going to come up with a random number from 0 to 9, and you must guess it.');
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Guess the number!', gameOptions)

}

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "начальное приветствие" },
    { command: "/info", description: "получить информацию о пользователе" },
    { command: "/game", description: "игра \"Угадай число\"" }
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/455/d46/455d4651-c341-424d-a9cb-be16e8f0b345/10.jpg"
      );
      return bot.sendMessage(chatId, `Welcome!`);
    }
    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Your name is ${msg.from.first_name} ${msg.from.last_name}`
      );
    }
    if (text === '/game') {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, 'I don\'t understand you');
  });

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data === '/again') {
      return startGame(chatId);
    }
    if (data == JSON.stringify(chats[chatId])) {
      return await bot.sendMessage(chatId, `Верно, это цифра ${chats[chatId]}`, againOptions )
    } else {
      return await bot.sendMessage(chatId, `К сожалению, бот загадал цифру ${chats[chatId]}`, againOptions)
    }
  })
};

start();

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
