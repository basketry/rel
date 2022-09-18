import { Violation } from 'basketry';

export type Rel = {
  meta: PrimaryKey | ForeignKey | Edge | undefined;
  violations: Violation[];
};

export type PrimaryKey = { kind: 'primaryKey' };
export type ForeignKey = {
  kind: 'foreignKey';
  type: string;
  property: string;
  many: boolean;
};
export type Edge = { kind: 'edge'; types: [string, string] };
