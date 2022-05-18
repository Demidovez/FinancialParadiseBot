import { NarrowedContext, Scenes, Types } from "telegraf";
import puppeteer from "puppeteer";

export type CTX = NarrowedContext<
  Scenes.SceneContext<Scenes.SceneSessionData> & {
    match: RegExpExecArray;
  },
  Types.MountMap["text"]
>;

export interface User {
  roles: string[];
}

export interface UserSession {
  roles?: string[];
  __scenes: any;
}

export interface UserContext extends Scenes.SceneContext {
  session: UserSession;
}

export const ROLES = {
  unregistered: "unregistered",
  common: "common",
};

export enum EMarkup {
  common,
}
