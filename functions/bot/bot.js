const { Telegraf } = require("telegraf");
// const session = require('telegraf/session');
// const questionsPotter = require("../../questions");
const bot = new Telegraf(process.env.BOT_TOKEN);


const questions = [
  {
    question: "13 ½ дюйма, тис, перо феникса - чья палочка?",
    answer: "Волан-де-Морт",
  },
  {
    question: "12¾ дюйма, грецкий орех, сердечная жила дракона - чья палочка?",
    answer: "Беллатриса Лестрейндж",
  },
  {
    question: "9¼ дюйма, каштан, сердечная жила дракона - чья палочка?",
    answer: "Питер Петтигрю",
  },
  {
    question: "10 дюймов, боярышник, волос единорога - чья палочка?",
    answer: "Драко Малфой",
  },
  {
    question:
      "Расположите заклинания Гарри Поттера из сцены атаки Пожирателей смерти (из книги) в правильном порядке (цифрами, без пробелов): 1. акцио; 2. вингардиум левиоса; 3. вспыхни (конфринго); 4. импедимента; 5. отключись; 6. экспелиармус",
    answer: "524361",
  },
  {
    question:
      "Операция “Семь Поттеров”: с кем летел Джордж? (напишите имя и фамилию в именительном падеже)",
    answer: "Римус Люпин",
  },
  {
    question:
      "Операция “Семь Поттеров”: с кем летела Гермиона? (напишите имя и фамилию в именительном падеже)",
    answer: "Кингсли Бруствер",
  },
  {
    question:
      "Операция “Семь Поттеров”: с кем летел Фред? (напишите имя и фамилию в именительном падеже)",
    answer: "Артур Уизли",
  },
  {
    question:
      "Битва за Хогвартс: против кого сражался Хагрид? (имя и фамилия в именительном падеже)",
    answer: "Уолден Макнейр",
  },
  {
    question:
      "Битва за Хогвартс: против кого сражался Флитвик (имя и фамилия в именительном падеже)",
    answer: "Антонин Долохов",
  },
  {
    question:
      "Битва за Хогвартс: против кого сражался Аберфорт (имя и фамилия в именительном падеже)",
    answer: "Август Руквуд",
  },
  {
    question:
      "Битва за Хогвартс: против кого сражались Перси и Артур (имя и фамилия в именительном падеже)",
    answer: "Пий Толстоватый",
  },
  {
    question:
      "С какими пожирателями смерти сражались Гарри, Рон и Гермиона в кафе в Лондоне? (имя и фамилия в именительном падеже, в алфавитном порядке)",
    answer: "Антонин Долохов, Торфин Роули",
  },
  {
    question:
      "Какой сюрприз Дадли приготовил для Гарри и поставил за дверью его комнаты? Ответьте двумя словами на одну и ту же букву, в именительном падеже.",
    answer: "Чашка чая",
  },
  {
    question:
      "С чем Рита Скиттер сравнила информацию о дуэли Дамблдора с Грин-де-Вальдом? Ответьте тремя словами, два из которых начинаются на соседние согласные буквы; главное слово в именительном падеже",
    answer: "Взрыв навозной бомбы",
  },
  // {
  //   question:
  //     "",
  //   answer: "",
  // },
  // {
  //   question:
  //     "",
  //   answer: "",
  // },
  // {
  //   question:
  //     "",
  //   answer: "",
  // },
  // {
  //   question:
  //     "",
  //   answer: "",
  // },
  // {
  //   question:
  //     "",
  //   answer: "",
  // },
  // {
  //   question:
  //     "",
  //   answer: "",
  // },
  // {
  //   question:
  //     "",
  //   answer: "",
  // },
];

let randomElement;
let questionsPotter = questions.slice(0);

function generateQuestion() {
  randomElement = questionsPotter.map((element) => element)[
    Math.floor(Math.random() * questionsPotter.length)
  ];
  return randomElement;
}

bot.start((ctx) => {
  console.log("It's not working the way I need :");
  try {
    return ctx.reply("Hello there");
  } catch (e) {
    console.error("error in start action:", e);
    return ctx.reply("Error occurred");
  }
});

randomElement = generateQuestion();

bot.command("question", (ctx) => {
  ctx.reply(randomElement.question);
});

bot.on("message", (ctx) => {
  if (
    questionsPotter.length == 1 &&
    ctx.message.text.trim().toLowerCase() === randomElement.answer.trim().toLowerCase()
  ) {
    questionsPotter.splice(questionsPotter.indexOf(randomElement), 1);
    randomElement = generateQuestion();
    questionsPotter = questions.slice(0);
    console.log("Осталось вопросов:" + questionsPotter.length);
    ctx.reply("Верно! \n\n Это был последний вопрос.");
    randomElement = generateQuestion();
  }
  else if (questionsPotter.length > 1 && ctx.message.text.trim().toLowerCase() === randomElement.answer.trim().toLowerCase()) {
    questionsPotter.splice(questionsPotter.indexOf(randomElement), 1);
    randomElement = generateQuestion();
    console.log("Осталось вопросов:" + questionsPotter.length);
    ctx.reply("Верно!");
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
