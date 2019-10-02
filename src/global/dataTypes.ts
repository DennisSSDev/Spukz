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

// global data type from which to access anything,
// that the server needs to deliver to the client
export interface Global {
  store: Store;
  iconMap: IconMap;
  userDB: UserDB;
}
