export interface Filme {
  id: string;
  nome: string;
  elenco: string;
  diretor: string;
  duracao: string;
  anoDeLancamento: Date;
  sinopse: string;
  avaliacaoDosCriticos: number;
  avaliacaoDosUsuarios: number;
  tag: number;
  usuariosQueFavoritaram: any[];
  usuariosQueReagiram: any[];
  usuariosQueAvaliaram: any[] | null;
  sessoes: any[];
}
