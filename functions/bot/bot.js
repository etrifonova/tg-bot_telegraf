const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
// const questionsGeography = require("../../questions");


// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async (event) => {
  const questionsPotter = [
    {question: '13 ½ дюйма, тис, перо феникса - чья палочка?', answer: 'Волан-де-Морт'},
    {question: '12¾ дюйма, грецкий орех, сердечная жила дракона - чья палочка?', answer: 'Беллатриса Лестрейндж'},
    {question: '9¼ дюйма, каштан, сердечная жила дракона - чья палочка?', answer: 'Питер Петтигрю'},
    {question: '10 дюймов, боярышник, волос единорога - чья палочка?', answer: 'Драко Малфой'},
    {question: 'Расположите заклинания Гарри Поттера из сцены атаки Пожирателей смерти (из книги) в правильном порядке (цифрами, без пробелов): 1. акцио; 2. вингардиум левиоса; 3. вспыхни (конфринго); 4. импедимента; 5. отключись; 6. экспелиармус', answer: '524361'},
    {question: 'Операция “Семь Поттеров”: с кем летел Джордж? (напишите имя и фамилию в именительном падеже', answer: 'Римус Люпин'},
    {question: 'Операция “Семь Поттеров”: с кем летела Гермиона? (напишите имя и фамилию в именительном падеже', answer: 'Кингсли Бруствер'},
    {question: 'Операция “Семь Поттеров”: с кем летел Фред? (напишите имя и фамилию в именительном падеже', answer: 'Артур Уизли'},
]

  
  let randomElement;
  let questionsGeography = questions.slice(0);
  
  function generateQuestion() {
    randomElement = questionsGeography.map((element) => element)[
      Math.floor(Math.random() * questionsGeography.length)
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
  
  bot.command("geography", (ctx) => {
    console.log(questionsGeography.length);
    ctx.reply(randomElement.question + "\n" + randomElement.answer);
  });
  
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
