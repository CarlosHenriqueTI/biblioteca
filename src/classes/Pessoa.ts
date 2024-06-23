export default class Pessoa {
    private _nome: string;
    private _numeroMatricula: string;
    private _endereco: string;
    private _telefone: string;

    constructor(nome: string, numeroMatricula: string, endereco: string, telefone: string) {
        this._nome = nome;
        this._numeroMatricula = numeroMatricula;
        this._endereco = endereco;
        this._telefone = telefone;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(novoNome: string) {
        this._nome = novoNome;
    }

    get numeroMatricula(): string {
        return this._numeroMatricula;
    }

    set numeroMatricula(novoNumeroMatricula: string) {
        this._numeroMatricula = novoNumeroMatricula;
    }

    get endereco(): string {
        return this._endereco;
    }

    set endereco(novoEndereco: string) {
        this._endereco = novoEndereco;
    }

    get telefone(): string {
        return this._telefone;
    }

    set telefone(novoTelefone: string) {
        this._telefone = novoTelefone;
    }
}
