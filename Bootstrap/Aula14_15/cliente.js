const link = 'https://67d0b74b825945773eb1b9fe.mockapi.io/cliente'
let clientes = []

function carregar(status){
    let divTabela = document.getElementById('tabela-clientes');
    let divLoading = document.getElementById('carregando');
    if (status == true) {
        divTabela.style.visibility = 'hidden';
        divLoading.style.visibility = 'visible';
    }
    else {
        divTabela.style.visibility = 'visible';
        divLoading.style.visibility = 'hidden';
    }
}

function carregarClientes(){
    carregar(true);
    fetch(link)
        .then(response => response.json())
        .then(cli => {
            debugger
            clientes = cli
            montarTabela(cli)
            carregar(false);
        })
        .catch(error => {
            console.error('Erro ao carregar clientes:', error);
            alert('Erro ao carregar clientes. Tente novamente mais tarde.');
            carregar(false);
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
            <td><button class="btn btn-primary" onclick="editarCliente(${cliente.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button></td>
            <td><button class="btn btn-danger" onclick="deletarCliente(${cliente.id})">Excluir</button></td>
        `;
        tabela.appendChild(tr);
    });
}
function editarCliente(id) {
    debugger;
    const cliente = clientes.find(c => c.id == id);
    document.getElementById('cadid').value = cliente.id;
    document.getElementById('cadnome').value = cliente.nome;
    document.getElementById('cademail').value = cliente.email;
    document.getElementById('cadtelefone').value = cliente.telefone;
}
function limparCampos(event){
    event.preventDefault();
    document.getElementById('cadid').value = '';
    document.getElementById('cadnome').value = '';
    document.getElementById('cademail').value = '';
    document.getElementById('cadtelefone').value = '';
}
function salvarCliente(event) {
    event.preventDefault();
    const id = document.getElementById('cadid').value;
    const nome = document.getElementById('cadnome').value;
    const email = document.getElementById('cademail').value;
    const telefone = document.getElementById('cadtelefone').value;
    if(id == ''){
        // Criar novo cliente
        const novoCliente = {
            nome: nome,
            email: email,
            telefone: telefone
        };
        fetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoCliente)
        })
        .then(response => response.json())
        .then(cliente => {
            //alert('Cliente cadastrado com sucesso!');
            appendAlert('Cliente cadastrado com sucesso!', 'success')
            carregarClientes();
            limparCampos(event);
        })
        .catch(error => {
            console.error('Erro ao cadastrar cliente:', error);
            alert('Erro ao cadastrar cliente. Tente novamente mais tarde.');
        });
    }
    else{
        // Atualizar cliente existente
        const clienteAtualizado = {
            id: id,
            nome: nome,
            email: email,
            telefone: telefone
        };
        fetch(`${link}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteAtualizado)
        })
        .then(response => response.json())
        .then(cliente => {
            //alert('Cliente atualizado com sucesso!');
            appendAlert('Cliente atualizado com sucesso!', 'success')
            carregarClientes();
            limparCampos(event);
        })
        .catch(error => {
            console.error('Erro ao atualizar cliente:', error);
            alert('Erro ao atualizar cliente. Tente novamente mais tarde.');
        });
    }
}

function deletarCliente(id) {
    if (confirm('Deseja realmente excluir este cliente?')) {
        fetch(`${link}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                //alert('Cliente excluído com sucesso!');
                appendAlert('Cliente excluído com sucesso!', 'info')
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

const alertPlaceholder = document.getElementById('mensagens')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')
  
  alertPlaceholder.append(wrapper)
}