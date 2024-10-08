const users = [
    { username: 'gestor', password: 'Senha1010', role: 'gestor' },
    { username: 'funcionario', password: '12345', role: 'funcionario' },
    { username: 'bruce wayne', password: 'Batman123', role: 'admin' }
];

const resources = [
    { id: 1, name: 'Veículo Avançado', type: 'vehicle', status: 'Operacional' },
    { id: 2, name: 'Equipamento Tático', type: 'equipment', status: 'Em estoque' },
    { id: 3, name: 'Supercomputador', type: 'device', status: 'Atualização pendente' }
];

const securityCameras = [
    { id: 1, location: 'Centro da Cidade', status: 'Online', activity: 'Movimento suspeito detectado' },
    { id: 2, location: 'Porto', status: 'Online', activity: 'Nenhuma atividade suspeita' },
    { id: 3, location: 'Distrito Industrial', status: 'Offline', activity: 'Câmera em manutenção' },
    { id: 4, location: 'Parque Central', status: 'Online', activity: 'Patrulha de rotina em andamento' }
];

let currentUser = null;
let loginHistory = [];
let companyFunds = 1000000000;

function changeBackgroundImage(imageUrl) {
    document.body.style.backgroundImage = `url('${imageUrl}')`;
}

function renderLogin() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <div class="card">
            <h2>Login - Wayne Enterprises</h2>
            <form id="loginForm">
                <input type="text" id="username" placeholder="Nome de usuário" required>
                <input type="password" id="password" placeholder="Senha" required>
                <button type="submit">Entrar</button>
            </form>
        </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(username, password);
    });

    changeBackgroundImage('https://i.pinimg.com/originals/9d/f5/44/9df54459f98507ff7b94e3078b704a8b.jpg');
}

function login(username, password) {
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    if (user) {
        currentUser = user;
        const loginTime = new Date();
        loginHistory.push({ username: user.username, time: loginTime });
        updateAllData();
        renderDashboard();
    } else {
        alert('Credenciais inválidas');
    }
}

function updateAllData() {
    securityCameras.forEach(camera => {
        camera.activity = `Atividade atualizada em ${new Date().toLocaleString()}`;
    });
    
    resources.forEach(resource => {
        resource.status = ['Operacional', 'Em manutenção', 'Em uso'][Math.floor(Math.random() * 3)];
    });
}

function renderDashboard() {
    const main = document.querySelector('main');
    main.innerHTML = `
        ${renderNav()}
        <h1>Dashboard de Segurança</h1>
        <div class="grid">
            ${currentUser.role !== 'funcionario' ? `
            <div class="card">
                <h3><i class="fas fa-exclamation-triangle"></i> Alertas de Segurança</h3>
                <p>3 alertas nas últimas 24 horas</p>
                ${currentUser.role === 'admin' ? `
                    <ul>
                        <li>Tentativa de invasão no Banco Central às 22:15</li>
                        <li>Atividade suspeita no Porto às 23:45</li>
                        <li>Alarme disparado na Sede às 02:30</li>
                    </ul>
                ` : ''}
            </div>
            <div class="card">
                <h3><i class="fas fa-cogs"></i> Recursos Ativos</h3>
                <p>27 veículos em operação</p>
                <p>152 dispositivos de segurança ativos</p>
                ${currentUser.role === 'admin' ? `
                    <ul>
                        <li>5 Veículos Avançados em patrulha (Setores 2, 4, 7, 9, 12)</li>
                        <li>15 Drones de vigilância ativos (Cobertura: 75% da cidade)</li>
                        <li>7 Unidades Móveis em standby (Localizações: HQ, DPGC, Torre Central)</li>
                    </ul>
                ` : ''}
            </div>
            <div class="card">
                <h3><i class="fas fa-user-clock"></i> Acessos Recentes</h3>
                ${currentUser.role === 'gestor' || currentUser.role === 'admin' ? `
                    <p>Total de logins: ${loginHistory.length}</p>
                    <ul>
                        ${loginHistory.map(login => `
                            <li>${login.username} - ${login.time.toLocaleString()}</li>
                        `).join('')}
                    </ul>
                ` : ''}
            </div>
            ${(currentUser.role === 'gestor' || currentUser.role === 'admin') ? `
            <div class="card">
                <h3><i class="fas fa-dollar-sign"></i> Verba da Empresa</h3>
                <p>Saldo atual: $${companyFunds.toLocaleString()}</p>
            </div>
            ` : ''}
            ` : ''}
        </div>
    `;

    changeBackgroundImage('https://i.pinimg.com/originals/9d/f5/44/9df54459f98507ff7b94e3078b704a8b.jpg');
}

function renderNav() {
    return `
        <nav>
            <ul>
                <li><a href="#" onclick="renderDashboard()"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                ${currentUser.role !== 'funcionario' ? '<li><a href="#" onclick="renderAccessControl()"><i class="fas fa-users"></i> Controle de Acesso</a></li>' : ''}
                <li><a href="#" onclick="renderResourceManagement()"><i class="fas fa-boxes"></i> Gestão de Recursos</a></li>
                ${currentUser.role === 'admin' ? '<li><a href="#" onclick="renderSecurityCameras()"><i class="fas fa-video"></i> Câmeras de Segurança</a></li>' : ''}
                ${currentUser.role === 'admin' ? '<li><a href="#" onclick="renderSecurityManagement()"><i class="fas fa-shield-alt"></i> Gestão de Segurança</a></li>' : ''}
                ${(currentUser.role === 'gestor' || currentUser.role === 'admin') ? '<li><a href="#" onclick="renderEmployeeManagement()"><i class="fas fa-user-plus"></i> Gestão de Funcionários</a></li>' : ''}
                <li><a href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Sair</a></li>
            </ul>
        </nav>
    `;
}

function renderAccessControl() {
    if (currentUser.role === 'funcionario') {
        alert('Acesso não autorizado');
        renderDashboard();
        return;
    }

    const main = document.querySelector('main');
    main.innerHTML = `
        ${renderNav()}
        <h1>Controle de Acesso</h1>
        <div class="card">
            <h3><i class="fas fa-users"></i> Usuários</h3>
            <ul>
                ${users.map(user => `<li>${user.username} - ${user.role}</li>`).join('')}
            </ul>
        </div>
    `;

    changeBackgroundImage('https://i.pinimg.com/originals/9d/f5/44/9df54459f98507ff7b94e3078b704a8b.jpg');
}

function renderResourceManagement() {
    const main = document.querySelector('main');
    main.innerHTML = `
        ${renderNav()}
        <h1>Gestão de Recursos</h1>
        <div class="card">
            <h3><i class="fas fa-boxes"></i> Recursos</h3>
            <ul>
                ${resources.map(resource => `
                    <li>
                        ${resource.name} - ${resource.type}
                        ${currentUser.role !== 'funcionario' ? ` - Status:  ${resource.status}` : ''}
                        ${currentUser.role === 'admin' ? `
                            <select onchange="updateResourceStatus(${resource.id}, this.value)">
                                <option value="Operacional" ${resource.status === 'Operacional' ? 'selected' : ''}>Operacional</option>
                                <option value="Em manutenção" ${resource.status === 'Em manutenção' ? 'selected' : ''}>Em manutenção</option>
                                <option value="Em uso" ${resource.status === 'Em uso' ? 'selected' : ''}>Em uso</option>
                            </select>
                        ` : ''}
                    
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    changeBackgroundImage('https://i.pinimg.com/originals/9d/f5/44/9df54459f98507ff7b94e3078b704a8b.jpg');
}

function updateResourceStatus(resourceId, newStatus) {
    const resource = resources.find(r => r.id === resourceId);
    if (resource) {
        resource.status = newStatus;
        renderResourceManagement();
    }
}

function renderSecurityCameras() {
    if (currentUser.role !== 'admin' && currentUser.role !== 'gestor') {
        alert('Acesso não autorizado');
        renderDashboard();
        return;
    }

    const main = document.querySelector('main');
    main.innerHTML = `
        ${renderNav()}
        <h1>Câmeras de Segurança da Cidade</h1>
        <div class="grid">
            ${securityCameras.map(camera => `
                <div class="card">
                    <h3><i class="fas fa-video"></i> ${camera.location}</h3>
                    <p>Status: ${camera.status}</p>
                    <div class="camera-feed">
                        ${camera.status === 'Online' ? 'Transmitindo...' : 'Offline'}
                    </div>
                    ${currentUser.role === 'admin' ? `<p>Atividade: ${camera.activity}</p>` : ''}
                </div>
            `).join('')}
        </div>
    `;

    changeBackgroundImage('https://i.pinimg.com/originals/9d/f5/44/9df54459f98507ff7b94e3078b704a8b.jpg');
}

function renderSecurityManagement() {
    if (currentUser.role !== 'admin') {
        alert('Acesso não autorizado');
        renderDashboard();
        return;
    }

    const main = document.querySelector('main');
    main.innerHTML = `
        ${renderNav()}
        <h1>Gestão de Segurança</h1>
        <div class="card">
            <h3><i class="fas fa-shield-alt"></i> Dados de Segurança</h3>
            <p>Última atualização: ${new Date().toLocaleString()}</p>
            <ul>
                <li>Alertas ativos: 3</li>
                <li>Câmeras online: ${securityCameras.filter(c => c.status === 'Online').length}</li>
                <li>Recursos em operação: ${resources.filter(r => r.status === 'Operacional').length}</li>
            </ul>
            <button onclick="updateAllSecurityData()">Atualizar todos os dados</button>
        </div>
    `;

    changeBackgroundImage('https://i.pinimg.com/originals/9d/f5/44/9df54459f98507ff7b94e3078b704a8b.jpg');
}

function updateAllSecurityData() {
    updateAllData();
    alert('Todos os dados de segurança foram atualizados.');
    renderSecurityManagement();
}

function renderEmployeeManagement() {
    if (currentUser.role !== 'admin' && currentUser.role !== 'gestor') {
        alert('Acesso não autorizado');
        renderDashboard();
        return;
    }

    const main = document.querySelector('main');
    main.innerHTML = `
        ${renderNav()}
        <h1>Gestão de Funcionários</h1>
        <div class="card">
            <h3><i class="fas fa-user-plus"></i> Adicionar Novo Funcionário</h3>
            <form id="addEmployeeForm">
                <input type="text" id="newUsername" placeholder="Nome de usuário" required>
                <input type="password" id="newPassword" placeholder="Senha" required>
                <select id="newRole" required>
                    <option value="">Selecione o cargo</option>
                    <option value="funcionario">Funcionário</option>
                    <option value="gestor">Gestor</option>
                    ${currentUser.role === 'admin' ? '<option value="admin">Administrador</option>' : ''}
                </select>
                <button type="submit">Adicionar Funcionário</button>
            </form>
        </div>
        <div class="card">
            <h3><i class="fas fa-users"></i> Lista de Funcionários</h3>
            <ul id="employeeList">
                ${users.map(user => `<li>${user.username} - ${user.role}</li>`).join('')}
            </ul>
        </div>
    `;

    document.getElementById('addEmployeeForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        const newRole = document.getElementById('newRole').value;
        addEmployee(newUsername, newPassword, newRole);
    });

    changeBackgroundImage('https://i.pinimg.com/originals/9d/f5/44/9df54459f98507ff7b94e3078b704a8b.jpg');
}

function addEmployee(username, password, role) {
    if (users.some(u => u.username === username)) {
        alert('Nome de usuário já existe.');
        return;
    }

    users.push({ username, password, role });
    alert('Funcionário adicionado com sucesso!');
    renderEmployeeManagement();
}

function logout() {
    currentUser = null;
    renderLogin();
}

changeBackgroundImage('https://i.pinimg.com/originals/9d/f5/44/9df54459f98507ff7b94e3078b704a8b.jpg');
renderLogin();