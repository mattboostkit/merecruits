/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as aiCVParser from "../aiCVParser.js";
import type * as cleanupTeam from "../cleanupTeam.js";
import type * as contact from "../contact.js";
import type * as cvAnalysis from "../cvAnalysis.js";
import type * as cvUploads from "../cvUploads.js";
import type * as jobs from "../jobs.js";
import type * as migrate from "../migrate.js";
import type * as news from "../news.js";
import type * as seed from "../seed.js";
import type * as seedWithTenant from "../seedWithTenant.js";
import type * as team from "../team.js";
import type * as teamPhotos from "../teamPhotos.js";
import type * as tenants from "../tenants.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

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
  cvAnalysis: typeof cvAnalysis;
  cvUploads: typeof cvUploads;
  jobs: typeof jobs;
  migrate: typeof migrate;
  news: typeof news;
  seed: typeof seed;
  seedWithTenant: typeof seedWithTenant;
  team: typeof team;
  teamPhotos: typeof teamPhotos;
  tenants: typeof tenants;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
