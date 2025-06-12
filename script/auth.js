// script/auth.js - Lógica de autenticação com Firebase

// Configuração do Firebase (SUBSTITUA PELAS SUAS CHAVES REAIS DO FIREBASE)
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_MESSAGING_ID",
    appId: "SEU_APP_ID"
  };
  
  // Inicializa o Firebase
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
  const auth = firebase.auth();
  
  // Lógica de Login
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
  
      try {
        await auth.signInWithEmailAndPassword(email, senha);
        alert('✅ Login realizado com sucesso!');
        window.location.href = 'eventos.html'; // Redireciona para a página de eventos logado
      } catch (error) {
        console.error('Erro no login:', error.message);
        alert('❌ Erro no login: ' + error.message);
      }
    });
  }
  
  // Lógica de Criar Conta
  const formCriarConta = document.getElementById('form-criar-conta');
  if (formCriarConta) {
    formCriarConta.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value; // Nome não é armazenado diretamente pelo Auth
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
  
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
        await userCredential.user.updateProfile({ displayName: nome }); // Define o nome de exibição
        alert('✅ Conta criada com sucesso! Redirecionando para login...');
        window.location.href = 'login.html';
      } catch (error) {
        console.error('Erro ao criar conta:', error.message);
        alert('❌ Erro ao criar conta: ' + error.message);
      }
    });
  }
  
  // Lógica de Login com Google
  const googleLoginBtn = document.getElementById('google-login-btn');
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        await auth.signInWithPopup(provider);
        alert('✅ Login com Google realizado com sucesso!');
        window.location.href = 'eventos.html';
      } catch (error) {
        console.error('Erro ao fazer login com Google:', error.message);
        alert('❌ Erro ao fazer login com Google: ' + error.message);
      }
    });
  }
  
  // Lógica de Login com Microsoft (apenas placeholder, requer configuração no Firebase Auth)
  const microsoftLoginBtn = document.getElementById('microsoft-login-btn');
  if (microsoftLoginBtn) {
      microsoftLoginBtn.addEventListener('click', () => {
          alert('Funcionalidade de login com Microsoft em desenvolvimento! Configure o Firebase Auth para provedores da Microsoft.');
          // Para implementar:
          // const provider = new firebase.auth.OAuthProvider('microsoft.com');
          // auth.signInWithPopup(provider)
          //     .then((result) => { /* Handle result */ })
          //     .catch((error) => { /* Handle error */ });
      });
  }
  
  
  // Lógica de Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await auth.signOut();
        alert('Deslogado com sucesso!');
        window.location.href = 'index.html'; // Redireciona para a página inicial
      } catch (error) {
        console.error('Erro ao deslogar:', error.message);
        alert('Erro ao deslogar: ' + error.message);
      }
    });
  }
  
  // Lógica de Logout para a página meus-agendamentos.html
  const logoutBtnBookings = document.getElementById('logout-btn-bookings');
  if (logoutBtnBookings) {
    logoutBtnBookings.addEventListener('click', async () => {
      try {
        await auth.signOut();
        alert('Deslogado com sucesso!');
        window.location.href = 'index.html'; // Redireciona para a página inicial
      } catch (error) {
        console.error('Erro ao deslogar:', error.message);
        alert('Erro ao deslogar: ' + error.message);
      }
    });
  }
  
  
  // Lógica de Redefinir Senha
  const formRedefinirSenha = document.getElementById('form-redefinir-senha');
  if (formRedefinirSenha) {
    formRedefinirSenha.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email-reset').value;
      const mensagemReset = document.getElementById('mensagem-reset-senha');
  
      try {
        await auth.sendPasswordResetEmail(email);
        mensagemReset.classList.remove('message-error');
        mensagemReset.classList.add('message-success');
        mensagemReset.innerHTML = `✅ Link de redefinição enviado para <strong>${email}</strong>. Verifique sua caixa de entrada (e spam)!`;
      } catch (error) {
        console.error('Erro ao enviar link de redefinição:', error.message);
        mensagemReset.classList.remove('message-success');
        mensagemReset.classList.add('message-error');
        mensagemReset.innerHTML = `❌ Erro: ${error.message}`;
      }
    });
  }
  
  // Verifica o estado de autenticação ao carregar a página "eventos.html"
  // (Já está em script.js, mas mantemos aqui para referência de Auth)
  // firebase.auth().onAuthStateChanged(user => {
  //     if (window.location.pathname.includes('eventos.html') || window.location.pathname.includes('meus-agendamentos.html')) {
  //         if (!user) {
  //             window.location.href = 'login.html';
  //         }
  //     }
  // });