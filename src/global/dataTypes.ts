// every resource must have a type identifier to easily sort them
export enum Type {
  GitHub = 'GitHub',
  YouTube = 'YouTube',
  GDCVault = 'GDCVault'
}

// used to sort items by
export enum Tag {
  GitHub = 'GitHub',
  'C++' = 'C++',
  Vault = 'GDCVault',
  Unreal = 'Unreal',
  Unity = 'Unity'
}

// how well is the company rated
export interface CompanyRatio {
  like: number;
  dislike: number;
}

export type CompanyID = string;

// company representation
export interface Company {
  name: CompanyID;
  link: string; // each company should have web presence
  icon: string;
  meta: { ratio: CompanyRatio }; // meta could involve many different types of data, but for the purposes of the app, we only care about like / dislike ratio for now
}

// Every stored and requested item is considered a resource (besides companies)
export interface Resource {
  type: Type;
  title: string;
  link: string;
  icon?: string;
  description: string;
  tags: Tag[];
}

// type of actions users can do
export interface UserActions {
  votes: CompanyVotes;
}

export type IconMap = Record<Type, string>;

export type User = string;

export type UserDB = Record<User, UserActions>;

export type Vote = boolean; // true - Like, false - dislike

export type CompanyVotes = Record<CompanyID, Vote>;

// will store all of the available resources
export interface Store {
  resources: Resource[];
  companies: Company[];
}

export interface Repo {
  name: string;
  html_url: string;
  description: string;
  language: string; // what programming language?
  fork: boolean; // is it a fork?
  stargazers_count: number; // starts
  pushed_at: Date; // last commit
  score: number; // score represents the "good stuff" about the repo, ie do you even have a readme?
}

export interface GithubRepos {
  total_count: number;
  items: Repo[];
}

// global data type from which to access anything,
// that the server needs to deliver to the client
export interface Global {
  store: Store;
  iconMap: IconMap;
  userDB: UserDB;
  githubStore: GithubRepos;
  gdcTalkStore: GDCTalks;
}

export interface GDCTalk {
  title: string;
  track: string;
  description: string;
  speakers: string;
}

export type GDCTalks = Record<number, GDCTalk>;
