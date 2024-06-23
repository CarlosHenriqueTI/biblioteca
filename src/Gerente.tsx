// Gerente.tsx

import React, { useState, useEffect, ChangeEvent } from 'react';
import Membro from './classes/Membro';
import StorageService from './service/StorageService';

const Gerente: React.FC = () => {
    const [membros, setMembros] = useState<Membro[]>([]);
    const [novoMembro, setNovoMembro] = useState<Membro>(new Membro('', '', '', ''));
    const [membroSelecionado, setMembroSelecionado] = useState<Membro | null>(null);
    const [edicaoAtivada, setEdicaoAtivada] = useState(false);

    useEffect(() => {
        const membrosCarregados = StorageService.loadData<Membro[]>('membros') || [];
        setMembros(membrosCarregados);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (membroSelecionado) {
            const membroAtualizado = { ...membroSelecionado, [name]: value };
            setMembroSelecionado(membroAtualizado as Membro);
        } else {
            const novoMembroAtualizado = { ...novoMembro, [name]: value };
            setNovoMembro(novoMembroAtualizado as Membro);
        }
    };

    const adicionarMembro = () => {
        if (novoMembro.nome && novoMembro.numeroMatricula && novoMembro.endereco && novoMembro.telefone) {
            const novosMembros = [...membros, novoMembro];
            setMembros(novosMembros);
            StorageService.saveData('membros', novosMembros);
            setNovoMembro(new Membro('', '', '', ''));
        } else {
            alert("Todos os campos devem ser preenchidos.");
        }
    };

    const editarMembro = (membro: Membro) => {
        setMembroSelecionado(membro);
        setEdicaoAtivada(true);
    };

    const cancelarEdicao = () => {
        setMembroSelecionado(null);
        setEdicaoAtivada(false);
    };

    const atualizarMembro = () => {
        if (membroSelecionado) {
            const index = membros.findIndex(m => m.numeroMatricula === membroSelecionado.numeroMatricula);
            if (index !== -1) {
                const novosMembros = [...membros];
                novosMembros[index] = membroSelecionado;
                setMembros(novosMembros);
                StorageService.saveData('membros', novosMembros);
                setMembroSelecionado(null);
                setEdicaoAtivada(false);
            }
        }
    };

    const removerMembro = (numeroMatricula: string) => {
        const membrosAtualizados = membros.filter(membro => membro.numeroMatricula !== numeroMatricula);
        setMembros(membrosAtualizados);
        StorageService.saveData('membros', membrosAtualizados);
    };

    return (
        <div>
            <h2>Cadastro de Membros</h2>
            {edicaoAtivada && membroSelecionado ? (
                <div>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={membroSelecionado.nome}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="numeroMatricula"
                        placeholder="Número de Matrícula"
                        value={membroSelecionado.numeroMatricula}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="endereco"
                        placeholder="Endereço"
                        value={membroSelecionado.endereco}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="telefone"
                        placeholder="Telefone"
                        value={membroSelecionado.telefone}
                        onChange={handleChange}
                    />
                    <button onClick={atualizarMembro}>Salvar</button>
                    <button onClick={cancelarEdicao}>Cancelar</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={novoMembro.nome}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="numeroMatricula"
                        placeholder="Número de Matrícula"
                        value={novoMembro.numeroMatricula}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="endereco"
                        placeholder="Endereço"
                        value={novoMembro.endereco}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="telefone"
                        placeholder="Telefone"
                        value={novoMembro.telefone}
                        onChange={handleChange}
                    />
                    <button onClick={adicionarMembro}>Adicionar Membro</button>
                </div>
            )}
            <ul>
                {membros.map((membro) => (
                    <li key={membro.numeroMatricula}>
                        {`${membro.nome} - ${membro.numeroMatricula}`}
                        <button onClick={() => editarMembro(membro)}>Editar</button>
                        <button onClick={() => removerMembro(membro.numeroMatricula)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Gerente;
