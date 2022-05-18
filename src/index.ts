import { Telegraf, Scenes } from "telegraf";
import LocalSession from "telegraf-session-local";
import { getMarkup } from "./utils/utils";
import { UserContext } from "./types/types";
import { getUser } from "./data/get_user";
import { sendRequestToLog } from "./data/send_request_to_log";

const main = async () => {
  // Инициализируем бота
  const bot = new Telegraf<UserContext>(process.env.BOT_TOKEN as string);
  const localSession = new LocalSession({
    database: process.env.SESSION_DB as string,
  });

  bot.use(localSession.middleware());

  // Создаем сцены
  const stage = new Scenes.Stage<UserContext>([]);

  // Подключаем сцены к боту
  bot.use(stage.middleware());

  // Определяем роли доступа пользователя
  bot.use((ctx, next) => {
    // Запись в логи
    sendRequestToLog(ctx);

    getUser(ctx.from!.id)
      .then((user) => {
        if (user) {
          ctx.session.roles = user.roles;
          next();
        } else {
          ctx.reply("У Вас нет доступа!");
        }
      })
      .catch((err) => {
        console.log(err);
        ctx.reply("Ошибка доступа!");
      });
  });

  bot.start((ctx) => {
    ctx.reply("Выберите пункт меню!", getMarkup(ctx.session.roles));
  });

  // Реакция на запрос экрана по балансу на варке
  bot.hears(/Кнопка/i, (ctx) => {
    try {
      // ctx.replyWithChatAction("upload_photo");

      // if (ctx.session.roles?.includes(ROLES.common)) {
      //   getFullScreen(pages["BALANCE"].page)
      //     .then((image64) =>
      //       replyWithPhotoFile(
      //         ctx,
      //         image64,
      //         "Баланс",
      //         getMarkup(ctx.session.roles)
      //       )
      //     )
      //     .catch((err) => replyError(ctx, err, getMarkup(ctx.session.roles)));
      // } else {
      //   replyUnaccess(ctx, getMarkup(ctx.session.roles));
      // }

      ctx.reply("Данных пока нет", getMarkup(ctx.session.roles));
    } catch (err) {
      console.log(err);
    }
  });

  // Проверка пользователем на работоспособность
  bot.on("text", (ctx) => {
    ctx.reply("Неизвестная команда", getMarkup(ctx.session.roles));
  });

  bot.launch();
  console.log(`Started ${process.env.BOT_NAME} :: ${new Date()}`);
};

main();
