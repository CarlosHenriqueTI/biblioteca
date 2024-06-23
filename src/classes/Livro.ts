// classes/Livro.ts

export default class Livro {
    private _titulo: string;
    private _autor: string;
    private _isbn: string;
    private _anoPublicacao: string;

    constructor(titulo: string, autor: string, isbn: string, anoPublicacao: string) {
        this._titulo = titulo;
        this._autor = autor;
        this._isbn = isbn;
        this._anoPublicacao = anoPublicacao;
    }

    get titulo(): string {
        return this._titulo;
    }

    set titulo(novoTitulo: string) {
        this._titulo = novoTitulo;
    }

    get autor(): string {
        return this._autor;
    }

    set autor(novoAutor: string) {
        this._autor = novoAutor;
    }

    get isbn(): string {
        return this._isbn;
    }

    set isbn(novoIsbn: string) {
        this._isbn = novoIsbn;
    }

    get anoPublicacao(): string {
        return this._anoPublicacao;
    }

    set anoPublicacao(novoAnoPublicacao: string) {
        this._anoPublicacao = novoAnoPublicacao;
    }

    // Método para atualizar o título do livro
    updateTitulo(novoTitulo: string): void {
        this._titulo = novoTitulo;
    }

    // Método para atualizar o autor do livro
    updateAutor(novoAutor: string): void {
        this._autor = novoAutor;
    }

    // Método para atualizar o ISBN do livro
    updateISBN(novoISBN: string): void {
        this._isbn = novoISBN;
    }

    // Método para atualizar o ano de publicação do livro
    updateAnoPublicacao(novoAnoPublicacao: string): void {
        this._anoPublicacao = novoAnoPublicacao;
    }
}
