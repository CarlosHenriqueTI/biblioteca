import Livro from './Livro';
import Membro from './Membro';

export default class Emprestimo {
    private _livro: Livro;
    private _membro: Membro;
    private _dataEmprestimo: Date;
    private _dataDevolucao: Date | null;

    constructor(livro: Livro, membro: Membro, dataEmprestimo: Date, dataDevolucao: Date | null = null) {
        this._livro = livro;
        this._membro = membro;
        this._dataEmprestimo = dataEmprestimo;
        this._dataDevolucao = dataDevolucao;
    }

    get livro(): Livro {
        return this._livro;
    }

    set livro(novoLivro: Livro) {
        this._livro = novoLivro;
    }

    get membro(): Membro {
        return this._membro;
    }

    set membro(novoMembro: Membro) {
        this._membro = novoMembro;
    }

    get dataEmprestimo(): Date {
        return this._dataEmprestimo;
    }

    set dataEmprestimo(novaDataEmprestimo: Date) {
        this._dataEmprestimo = novaDataEmprestimo;
    }

    get dataDevolucao(): Date | null {
        return this._dataDevolucao;
    }

    set dataDevolucao(novaDataDevolucao: Date | null) {
        this._dataDevolucao = novaDataDevolucao;
    }

    // Método para realizar o empréstimo
    realizarEmprestimo(dataEmprestimo: Date): void {
        this._dataEmprestimo = dataEmprestimo;
        this._dataDevolucao = null; // Define a devolução como null, indicando que ainda não foi devolvido
        this._membro.adicionarEmprestimo(this); // Adiciona este empréstimo à lista de empréstimos do membro
    }

    // Método para registrar a devolução do livro
    registrarDevolucao(dataDevolucao: Date): void {
        this._dataDevolucao = dataDevolucao;
    }

    // Método para verificar se o empréstimo está ativo
    isAtivo(): boolean {
        return this._dataDevolucao === null || this._dataDevolucao > new Date();
    }

    // Método estático para listar todos os empréstimos ativos
    static listarEmprestimosAtivos(emprestimos: Emprestimo[]): Emprestimo[] {
        return emprestimos.filter(emprestimo => emprestimo.isAtivo());
    }

    // Método estático para listar o histórico de empréstimos
    static listarHistoricoEmprestimos(emprestimos: Emprestimo[]): Emprestimo[] {
        return emprestimos.filter(emprestimo => emprestimo.dataDevolucao !== null);
    }
}
