export enum Type {
  Role = 'Role',
  Level = 'Level',
  Language = 'Language',
  Filtered = 'Filtered'
};

export interface Response {
  label: string;
  type: Type;
}