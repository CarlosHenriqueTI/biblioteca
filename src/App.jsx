import Gerenciador from './Gerenciador';
import Gerente from './Gerente';
import GerenciamentoEmprestimos from './GerenciamentoEmprestimos';

function App() {

  return (
    <>
      <div>
            <h1>Sistema de Gerenciamento de Biblioteca</h1>
            <Gerenciador />
            <Gerente />
            <GerenciamentoEmprestimos />
        </div>
    </>
  )
}

export default App
