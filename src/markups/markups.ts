import { Markup } from "telegraf";

const COMMON = [["Кнопка"]];

export default {
  COMMON: Markup.keyboard(COMMON).resize(),
};
