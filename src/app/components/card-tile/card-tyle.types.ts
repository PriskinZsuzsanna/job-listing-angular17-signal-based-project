export enum Type {
  Role = 'Role',
  Level = 'Level',
  Language = 'Language',
  Filtered = 'Filtered'
};

export interface TyleData {
  label: string;
  type: Type;
}