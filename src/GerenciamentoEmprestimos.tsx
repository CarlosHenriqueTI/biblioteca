import React, { useState, useEffect} from 'react';
import Livro from './classes/Livro';
import Membro from './classes/Membro';
import Emprestimo from './classes/Emprestimo';
import StorageService from './service/StorageService';

const GerenciamentoEmprestimos: React.FC = () => {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [membros, setMembros] = useState<Membro[]>([]);
    const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
    const [livroSelecionado, setLivroSelecionado] = useState<string>('');
    const [membroSelecionado, setMembroSelecionado] = useState<string>('');
    const [dataEmprestimo, setDataEmprestimo] = useState<string>('');

    useEffect(() => {
        const livrosCarregados = StorageService.loadData<Livro[]>('livros') || [];
        const membrosCarregados = StorageService.loadData<Membro[]>('membros') || [];
        const emprestimosCarregados = StorageService.loadData<Emprestimo[]>('emprestimos') || [];

        setLivros(livrosCarregados);
        setMembros(membrosCarregados);
        setEmprestimos(emprestimosCarregados);
    }, []);

    const adicionarEmprestimo = () => {
        const livro = livros.find(l => l.isbn === livroSelecionado);
        const membro = membros.find(m => m.numeroMatricula === membroSelecionado);

        if (livro && membro && dataEmprestimo) {
            const novoEmprestimo = new Emprestimo(livro, membro, new Date(dataEmprestimo));
            novoEmprestimo.realizarEmprestimo(new Date(dataEmprestimo));
            const novosEmprestimos = [...emprestimos, novoEmprestimo];
            setEmprestimos(novosEmprestimos);
            StorageService.saveData('emprestimos', novosEmprestimos);
            setLivroSelecionado('');
            setMembroSelecionado('');
            setDataEmprestimo('');
        } else {
            alert("Todos os campos devem ser preenchidos.");
        }
    };

    const registrarDevolucao = (emprestimo: Emprestimo) => {
        const dataDevolucao = new Date();
        emprestimo.registrarDevolucao(dataDevolucao);
        const index = emprestimos.findIndex(e => e === emprestimo);
        if (index !== -1) {
            const novosEmprestimos = [...emprestimos];
            novosEmprestimos[index] = emprestimo;
            setEmprestimos(novosEmprestimos);
            StorageService.saveData('emprestimos', novosEmprestimos);
        }
    };

    return (
        <div>
            <h2>Gerenciamento de Empréstimos</h2>
            <select value={livroSelecionado} onChange={(e) => setLivroSelecionado(e.target.value)}>
                <option value="">Selecione um livro</option>
                {livros.map((livro) => (
                    <option key={livro.isbn} value={livro.isbn}>{livro.titulo}</option>
                ))}
            </select>
            <select value={membroSelecionado} onChange={(e) => setMembroSelecionado(e.target.value)}>
                <option value="">Selecione um membro</option>
                {membros.map((membro) => (
                    <option key={membro.numeroMatricula} value={membro.numeroMatricula}>{membro.nome}</option>
                ))}
            </select>
            <input
                type="date"
                value={dataEmprestimo}
                onChange={(e) => setDataEmprestimo(e.target.value)}
            />
            <button onClick={adicionarEmprestimo}>Adicionar Empréstimo</button>
            <h3>Empréstimos Ativos</h3>
            <ul>
                {emprestimos.filter(emprestimo => emprestimo.isAtivo()).map((emprestimo, index) => (
                    <li key={index}>
                        {`${emprestimo.livro.titulo} emprestado para ${emprestimo.membro.nome} em ${emprestimo.dataEmprestimo.toLocaleDateString()}`}
                        <button onClick={() => registrarDevolucao(emprestimo)}>Registrar Devolução</button>
                    </li>
                ))}
            </ul>
            <h3>Histórico de Empréstimos</h3>
            <ul>
                {emprestimos.map((emprestimo, index) => (
                    <li key={index}>
                        {`${emprestimo.livro.titulo} emprestado para ${emprestimo.membro.nome}, devolvido em ${emprestimo.dataDevolucao?.toLocaleDateString()}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GerenciamentoEmprestimos;
