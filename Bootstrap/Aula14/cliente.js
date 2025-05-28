const link = 'https://67d0b74b825945773eb1b9fe.mockapi.io/cliente'
let clientes = []

function carregarClientes(){
    debugger
    fetch(link)
        .then(response => response.json())
        .then(cli => {
            debugger
            clientes = cli
            montarTabela(cli)
        })
        .catch(error => {
            console.error('Erro ao carregar clientes:', error);
            alert('Erro ao carregar clientes. Tente novamente mais tarde.');
        })
}
function montarTabela(clientes) {
    const tabela = document.getElementById('tabela-clientes');
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td><button class="btn btn-primary" onclick="editarCliente(${cliente.id})">Editar</button></td>
            <td><button class="btn btn-danger" onclick="deletarCliente(${cliente.id})">Excluir</button></td>
        `;
        tabela.appendChild(tr);
    });
}
function deletarCliente(id) {
    if (confirm('Deseja realmente excluir este cliente?')) {
        fetch(`${link}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Cliente excluído com sucesso!');
                carregarClientes();
            } else {
                throw new Error('Erro ao excluir cliente');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir cliente:', error);
            alert('Erro ao excluir cliente. Tente novamente mais tarde.');
        });
    }
}
function consultarClientes(){
    let nome = document.getElementById('nome').value;
    let filtredClientes = clientes.filter(cliente => 
        cliente.nome.toLowerCase().includes(nome.toLowerCase())
    );
    montarTabela(filtredClientes);
}