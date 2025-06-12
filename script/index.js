// public/script/index.js - Lógica simplificada para o formulário de contato
    function chamandoalert(){
        alert("Seu E-mail foii enviado com sucesso!");
        setTimeout(() => {
            location.reload();
        }, 3000); // Recarrega após 5 segundos

    };


document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const contactFormMessage = document.getElementById('contact-form-message');



    if (contactForm) {
        contactForm.addEventListener('submit', (e) => { // Removido 'async' pois não há 'await'
            e.preventDefault(); // Impede o envio padrão do formulário

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            // Loga os dados no console (para fins de desenvolvimento)
            console.log("Dados do formulário de contato (não enviados para e-mail):", {
                name: name,
                email: email,
                message: message
            });

            // Exibe a mensagem de sucesso para o usuário
            contactFormMessage.classList.remove('message-error', 'message-info'); // Remove outras classes de estilo
            contactFormMessage.classList.add('message-success'); // Adiciona a classe de sucesso
            contactFormMessage.innerHTML = '<p>✅ Sua mensagem foi enviada com sucesso! Obrigado pelo contato.</p>';
            contactFormMessage.style.display = 'block'; // Garante que a mensagem seja visível

            contactForm.reset(); // Limpa os campos do formulário

            // Opcional: Ocultar a mensagem após alguns segundos
            setTimeout(() => {
                contactFormMessage.style.display = 'none';
            }, 5000); // Oculta após 5 segundos
        });
    }
});