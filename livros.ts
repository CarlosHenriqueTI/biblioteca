export class livro {
    id: number;
    titulo: string;
    autor: string;
    editora: string;
    ano: number;
    genero: string;
    sinopse: string;
    imagem: string;
    disponivel: boolean;
    dataDevolucao: string;
    dataEmprestimo: string;
    idUsuario: number;
    idBibliotecario: number;
    idEmprestimo: number;

constructor (id: number, titulo: string, autor: string, editora: string, ano: number, genero: string, sinopse: string, imagem: string, disponivel: boolean, dataDevolucao: string, dataEmprestimo: string, idUsuario: number, idBibliotecario: number, idEmprestimo: number){
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.editora = editora;
    this.ano = ano;
    this.genero = genero;
    this.sinopse = sinopse;
    this.imagem = imagem;
    this.disponivel = disponivel;
    this.dataDevolucao = dataDevolucao;
    this.dataEmprestimo = dataEmprestimo;
    this.idUsuario = idUsuario;
    this.idBibliotecario = idBibliotecario;
    this.idEmprestimo = idEmprestimo;
}
}