export interface UfProps{
    id?: number;
    sigla: string;
    nome: string;
}

export interface ContextProps {
    ufs: UfProps[];
}
