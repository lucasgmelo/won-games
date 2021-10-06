/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_GAME_RATING } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryGameBySlug
// ====================================================

export interface QueryGameBySlug_games_galery {
  __typename: "UploadFile";
  src: string;
  label: string | null;
}

export interface QueryGameBySlug_games_cover {
  __typename: "UploadFile";
  src: string;
}

export interface QueryGameBySlug_games_developers {
  __typename: "Developers";
  name: string;
}

export interface QueryGameBySlug_games_publisher {
  __typename: "Publisher";
  name: string;
}

export interface QueryGameBySlug_games_categories {
  __typename: "Category";
  name: string;
}

export interface QueryGameBySlug_games_plataforms {
  __typename: "Plataform";
  name: string;
}

export interface QueryGameBySlug_games {
  __typename: "Game";
  id: string;
  name: string;
  short_description: string;
  description: string;
  price: number;
  rating: ENUM_GAME_RATING | null;
  release_date: any | null;
  galery: QueryGameBySlug_games_galery[];
  cover: QueryGameBySlug_games_cover | null;
  developers: QueryGameBySlug_games_developers[];
  publisher: QueryGameBySlug_games_publisher | null;
  categories: QueryGameBySlug_games_categories[];
  plataforms: QueryGameBySlug_games_plataforms[];
}

export interface QueryGameBySlug {
  games: QueryGameBySlug_games[];
}

export interface QueryGameBySlugVariables {
  slug: string;
}
