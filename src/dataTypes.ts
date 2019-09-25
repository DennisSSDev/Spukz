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

// Every stored and requested item is considered a resource (besides companies)
export interface Resource {
  type: Type;
  title: string;
  link: string;
  icon?: string;
  description: string;
  tags: Tag[];
}

export type IconMap = Record<Type, string>;

// will store all of the available resources
export interface Store {
  resources: Resource[];
}

// global data type from which to access anything,
// that the server needs to deliver to the client
export interface Global {
  store: Store;
  iconMap: IconMap;
}
