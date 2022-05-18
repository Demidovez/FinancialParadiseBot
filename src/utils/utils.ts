import { Markup } from "telegraf";
import {
  InlineKeyboardMarkup,
  Message,
  ReplyKeyboardMarkup,
} from "telegraf/typings/core/types/typegram";
import { CTX, ROLES } from "../types/types";
import MARKUPS from "../markups/markups";

export const replyWithPhoto = (
  ctx: CTX,
  image64: string,
  markup?: Markup.Markup<ReplyKeyboardMarkup | InlineKeyboardMarkup>
): Promise<Message.PhotoMessage> => {
  return ctx.replyWithPhoto(
    {
      source: Buffer.from(image64, "base64"),
    },
    {
      reply_markup: markup?.reply_markup,
    }
  );
};

export const replyWithPhotoFile = (
  ctx: CTX,
  image64: string,
  caption: string,
  markup?: Markup.Markup<ReplyKeyboardMarkup | InlineKeyboardMarkup>
): Promise<Message.DocumentMessage> => {
  return ctx.replyWithDocument(
    {
      source: Buffer.from(image64, "base64"),
      filename: "image.jpg",
    },
    {
      reply_markup: markup?.reply_markup,
      caption: caption,
    }
  );
};

export const replyError = (
  ctx: CTX,
  err: any,
  markup?: Markup.Markup<ReplyKeyboardMarkup | InlineKeyboardMarkup>
) => {
  console.log(err);

  ctx.reply(`Ошибка`, markup);
};

export const replyUnaccess = (
  ctx: CTX,
  markup?: Markup.Markup<ReplyKeyboardMarkup | InlineKeyboardMarkup>
) => {
  ctx.reply(`У вас нет доступа!`, markup);
};

export const getMarkup = (
  roles?: string[]
): Markup.Markup<ReplyKeyboardMarkup | InlineKeyboardMarkup> => {
  if (roles && roles.includes(ROLES.common)) {
    return MARKUPS.COMMON;
  } else {
    return MARKUPS.COMMON;
  }
};
