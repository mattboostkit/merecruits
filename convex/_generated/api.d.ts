/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as aiCVParser from "../aiCVParser.js";
import type * as cleanupTeam from "../cleanupTeam.js";
import type * as contact from "../contact.js";
import type * as cvUploads from "../cvUploads.js";
import type * as jobs from "../jobs.js";
import type * as news from "../news.js";
import type * as seed from "../seed.js";
import type * as team from "../team.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  aiCVParser: typeof aiCVParser;
  cleanupTeam: typeof cleanupTeam;
  contact: typeof contact;
  cvUploads: typeof cvUploads;
  jobs: typeof jobs;
  news: typeof news;
  seed: typeof seed;
  team: typeof team;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
