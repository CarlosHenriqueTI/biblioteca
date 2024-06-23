import Emprestimo from './Emprestimo';
import Pessoa from './Pessoa';

export default class Membro extends Pessoa {
    private _emprestimos: Emprestimo[] = [];

    constructor(nome: string, numeroMatricula: string, endereco: string, telefone: string) {
        super(nome, numeroMatricula, endereco, telefone);
    }

    adicionarEmprestimo(emprestimo: Emprestimo): void {
        this._emprestimos.push(emprestimo);
    }

    listarEmprestimos(): Emprestimo[] {
        return this._emprestimos;
    }

    temEmprestimoAtivo(): boolean {
        return this._emprestimos.some(emprestimo => !emprestimo.dataDevolucao);
    }

    calcularMulta(): number {
        const multaPorDia = 1.0; // valor da multa por dia de atraso
        let multaTotal = 0;

        this._emprestimos.forEach(emprestimo => {
            if (emprestimo.dataDevolucao && emprestimo.dataDevolucao < new Date()) {
                const diasAtraso = Math.ceil((new Date().getTime() - emprestimo.dataDevolucao.getTime()) / (1000 * 3600 * 24));
                multaTotal += diasAtraso * multaPorDia;
            }
        });

        return multaTotal;
    }
}