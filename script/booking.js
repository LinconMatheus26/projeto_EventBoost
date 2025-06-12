formAgendamento.addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita o envio tradicional do formulário

    // Coleta os dados do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const eventId = urlParams.get('eventId');

    // Validação do CPF
    if (!validarCPF(cpf)) {
        mensagemSucesso.classList.remove('message-success');
        mensagemSucesso.classList.add('message-error');
        mensagemSucesso.innerHTML = "<p>❌ CPF inválido. Por favor, insira um CPF válido.</p>";
        return;
    }

    try {
        // Envio dos dados para o backend
        const response = await fetch('http://localhost:3000/agendar-evento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventId: eventId,
                nome: nome,
                email: email,
                cpf: cpf,
                eventTitle: decodeURIComponent(eventTitle || '')
            }),
        });

        const data = await response.json();

        // Resposta do backend
        if (data.success) {
            mensagemSucesso.classList.remove('message-error');
            mensagemSucesso.classList.add('message-success');
            mensagemSucesso.innerHTML = "<p>✅ Agendamento realizado com sucesso!</p><p>Você receberá uma confirmação em breve.</p>";
            formAgendamento.reset();
        } else {
            mensagemSucesso.classList.remove('message-success');
            mensagemSucesso.classList.add('message-error');
            mensagemSucesso.innerHTML = `<p>❌ Erro ao agendar: ${data.message}</p>`;
        }
    } catch (error) {
        console.error('Erro ao enviar agendamento para o backend:', error);
        mensagemSucesso.classList.remove('message-success');
        mensagemSucesso.classList.add('message-error');
        mensagemSucesso.innerHTML = "<p>❌ Houve um problema na conexão. Tente novamente mais tarde.</p>";
    }
});
