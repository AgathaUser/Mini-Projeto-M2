
class Usuario {
    constructor(email, senha) {
        this.email = email;
        this.senha = senha;
    }
}

const usuarios = [];
let editIndex = null;

const form = document.querySelector("form");
const emailInput = form.querySelector("input[type='email']");
const senhaInput = form.querySelector("input[type='password']");
const submitButton = form.querySelector(".submit");
const userListDiv = document.getElementById("userList");

function renderUsuarios() {
    userListDiv.innerHTML = "<h3>Usuários cadastrados:</h3>";
    usuarios.forEach((usuario, index) => {
        const userItem = document.createElement("div");
        userItem.style.marginBottom = "10px";
        userItem.innerHTML = `
            <strong>Email:</strong> ${usuario.email} |
            <strong>Senha:</strong> ${usuario.senha}
            <button onclick="editarUsuario(${index})" style="margin-left:10px">Editar</button>
            <button onclick="deletarUsuario(${index})" style="margin-left:5px">Deletar</button>
        `;
        userListDiv.appendChild(userItem);
    });
}

window.editarUsuario = function (index) {
    const usuario = usuarios[index];
    emailInput.value = usuario.email;
    senhaInput.value = usuario.senha;
    editIndex = index;
    submitButton.textContent = "Salvar";
}

window.deletarUsuario = function (index) {
    usuarios.splice(index, 1);
    renderUsuarios();
    form.reset();
    submitButton.textContent = "Entrar";
    editIndex = null;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (email && senha) {
        if (editIndex !== null) {
            usuarios[editIndex].email = email;
            usuarios[editIndex].senha = senha;
            editIndex = null;
            submitButton.textContent = "Entrar";
        } else {
            const novoUsuario = new Usuario(email, senha);
            usuarios.push(novoUsuario);
        }

        renderUsuarios();
        form.reset();
    }
});
