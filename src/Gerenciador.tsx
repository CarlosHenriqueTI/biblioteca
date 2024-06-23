// Gerenciador.tsx

import React, { useState, useEffect, ChangeEvent } from 'react';
import Livro from './classes/Livro';
import StorageService from './service/StorageService';

const Gerenciador: React.FC = () => {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [novoLivro, setNovoLivro] = useState<Livro>(new Livro('', '', '', ''));
    const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);
    const [edicaoAtivada, setEdicaoAtivada] = useState(false);

    useEffect(() => {
        const livrosCarregados = StorageService.loadData<Livro[]>('livros') || [];
        setLivros(livrosCarregados);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (livroSelecionado) {
            const livroAtualizado = { ...livroSelecionado, [name]: value };
            setLivroSelecionado(livroAtualizado as Livro);
        } else {
            const novoLivroAtualizado = { ...novoLivro, [name]: value };
            setNovoLivro(novoLivroAtualizado as Livro);
        }
    };

    const adicionarLivro = () => {
        if (novoLivro.titulo && novoLivro.autor && novoLivro.isbn && novoLivro.anoPublicacao) {
            const novosLivros = [...livros, novoLivro];
            setLivros(novosLivros);
            StorageService.saveData('livros', novosLivros);
            setNovoLivro(new Livro('', '', '', ''));
        } else {
            alert("Todos os campos devem ser preenchidos.");
        }
    };

    const editarLivro = (livro: Livro) => {
        setLivroSelecionado(livro);
        setEdicaoAtivada(true);
    };

    const cancelarEdicao = () => {
        setLivroSelecionado(null);
        setEdicaoAtivada(false);
    };

    const atualizarLivro = () => {
        if (livroSelecionado) {
            const index = livros.findIndex(l => l.isbn === livroSelecionado.isbn);
            if (index !== -1) {
                const novosLivros = [...livros];
                novosLivros[index] = livroSelecionado;
                setLivros(novosLivros);
                StorageService.saveData('livros', novosLivros);
                setLivroSelecionado(null);
                setEdicaoAtivada(false);
            }
        }
    };

    const removerLivro = (isbn: string) => {
        const novosLivros = livros.filter(livro => livro.isbn !== isbn);
        setLivros(novosLivros);
        StorageService.saveData('livros', novosLivros);
    };

    return (
        <div>
            <h2>Cadastro de Livros</h2>
            {edicaoAtivada && livroSelecionado ? (
                <div>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={livroSelecionado.titulo}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="autor"
                        placeholder="Autor"
                        value={livroSelecionado.autor}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="isbn"
                        placeholder="ISBN"
                        value={livroSelecionado.isbn}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="anoPublicacao"
                        placeholder="Ano de Publicação"
                        value={livroSelecionado.anoPublicacao}
                        onChange={handleChange}
                    />
                    <button onClick={atualizarLivro}>Salvar</button>
                    <button onClick={cancelarEdicao}>Cancelar</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={novoLivro.titulo}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="autor"
                        placeholder="Autor"
                        value={novoLivro.autor}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="isbn"
                        placeholder="ISBN"
                        value={novoLivro.isbn}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="anoPublicacao"
                        placeholder="Ano de Publicação"
                        value={novoLivro.anoPublicacao}
                        onChange={handleChange}
                    />
                    <button onClick={adicionarLivro}>Adicionar Livro</button>
                </div>
            )}
            <ul>
                {livros.map((livro) => (
                    <li key={livro.isbn}>
                        {`${livro.titulo} - ${livro.autor}`}
                        <button onClick={() => editarLivro(livro)}>Editar</button>
                        <button onClick={() => removerLivro(livro.isbn)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Gerenciador;
