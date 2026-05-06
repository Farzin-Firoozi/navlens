export type { NavEntry, NavHistoryConfig, RouterAdapter } from "./core/types";
export {
  getNavHistory,
  getPreviousPath,
  getCurrentPath,
  clearNavHistory,
} from "./core/helpers";
export { pushEntry, readHistory, writeHistory } from "./core/storage";
