// script/script.js - Lógica geral e carregamento de eventos

// Mock de dados de eventos (substituir por dados de backend/Firebase no futuro)
const mockEvents = [
  {
    id: 'e1',
    title: 'Workshop de Produtividade',
    date: '15/07/2025',
    time: '14:00 - 17:00',
    location: 'Online (Zoom)',
    description: 'Aprenda técnicas e ferramentas para otimizar seu tempo e aumentar sua produtividade no dia a dia. Ideal para profissionais e estudantes.',
    image: 'https://via.placeholder.com/600x400/87CEEB/FFFFFF?text=Workshop+Produtividade' // Imagem placeholder
  },
  {
    id: 'e2',
    title: 'Palestra: Futuro da IA',
    date: '20/07/2025',
    time: '19:00 - 21:00',
    location: 'Centro de Convenções, Recife-PE',
    description: 'Discussão sobre as últimas tendências e impactos da Inteligência Artificial na sociedade e nos negócios. Com especialistas da área.',
    image: 'https://via.placeholder.com/600x400/FFD700/FFFFFF?text=Palestra+IA'
  },
  {
    id: 'e3',
    title: 'Feira de Carreiras 2025',
    date: '05/08/2025',
    time: '09:00 - 18:00',
    location: 'Parque de Exposições, Olinda-PE',
    description: 'Oportunidades de networking, palestras inspiradoras e contato com empresas de diversos setores. Traga seu currículo!',
    image: 'https://via.placeholder.com/600x400/90EE90/FFFFFF?text=Feira+Carreiras'
  },
  {
    id: 'e4',
    title: 'Curso de Fotografia Básica',
    date: '10/08/2025',
    time: '10:00 - 12:00 (Sábados)',
    location: 'Estúdio Urbano, Boa Vista, Recife-PE',
    description: 'Aprenda os fundamentos da fotografia: composição, iluminação e manuseio da câmera. Para iniciantes e entusiastas.',
    image: 'https://via.placeholder.com/600x400/ADD8E6/FFFFFF?text=Curso+Fotografia'
  }
];

// Mock de agendamentos do usuário (associado ao ID do usuário do Firebase)
// Em um sistema real, isso viria de um banco de dados
let userBookings = [];

// Função para obter agendamentos mock para um usuário (apenas um exemplo simples)
function getUserBookings(userId) {
    // Em um sistema real, você faria uma requisição ao backend
    // para buscar os agendamentos do userId
    if (userId) {
        // Simula alguns agendamentos para um usuário fictício
        if (userId === 'mockUser123') { // Supondo um ID de usuário de teste
            return [
                {
                    bookingId: 'b1',
                    eventId: 'e1',
                    title: 'Workshop de Produtividade',
                    date: '15/07/2025',
                    location: 'Online (Zoom)',
                    status: 'Confirmado'
                },
                {
                    bookingId: 'b2',
                    eventId: 'e3',
                    title: 'Feira de Carreiras 2025',
                    date: '05/08/2025',
                    location: 'Parque de Exposições, Olinda-PE',
                    status: 'Confirmado'
                }
            ];
        }
    }
    return []; // Retorna array vazio se não houver agendamentos
}

// Função para renderizar eventos na página
function renderEvents(events, containerId, isAuthenticated = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ''; // Limpa o container antes de adicionar eventos

  if (events.length === 0) {
    container.innerHTML = '<p>Nenhum evento disponível no momento.</p>';
    return;
  }

  events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');
    eventCard.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <div class="event-card-content">
        <h3>${event.title}</h3>
        <p class="event-date"><strong>Data:</strong> ${event.date}</p>
        <p class="event-location"><strong>Local:</strong> ${event.location}</p>
        <p>${event.description.substring(0, 100)}...</p>
        <a href="detalhes-evento.html?id=${event.id}" class="btn btn-primary">Ver Detalhes</a>
      </div>
    `;
    container.appendChild(eventCard);
  });
}

// Função para renderizar agendamentos do usuário na página
function renderUserBookings(bookings, containerId) {
    const container = document.getElementById(containerId);
    const noBookingsMessage = document.getElementById('no-bookings-message');
    if (!container) return;

    container.innerHTML = ''; // Limpa o container antes de adicionar agendamentos

    if (bookings.length === 0) {
        if (noBookingsMessage) noBookingsMessage.style.display = 'block';
        return;
    } else {
        if (noBookingsMessage) noBookingsMessage.style.display = 'none';
    }

    bookings.forEach(booking => {
        const bookingItem = document.createElement('div');
        bookingItem.classList.add('booking-item');
        bookingItem.innerHTML = `
            <div class="booking-details">
                <h3>${booking.title}</h3>
                <p><strong>Data:</strong> ${booking.date}</p>
                <p><strong>Local:</strong> ${booking.location}</p>
                <p><strong>Status:</strong> <span class="status-${booking.status.toLowerCase()}">${booking.status}</span></p>
            </div>
            <div class="booking-actions">
                <a href="detalhes-evento.html?id=${booking.eventId}" class="btn btn-secondary">Ver Detalhes</a>
                <button class="btn btn-danger cancel-booking-btn" data-booking-id="${booking.bookingId}">Cancelar</button>
            </div>
        `;
        container.appendChild(bookingItem);
    });

    // Adicionar listeners para botões de cancelar
    container.querySelectorAll('.cancel-booking-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const bookingId = e.target.dataset.bookingId;
            if (confirm(`Tem certeza que deseja cancelar o agendamento ${bookingId}?`)) {
                // Lógica para cancelar agendamento (em um sistema real, enviar para o backend)
                console.log('Cancelar agendamento:', bookingId);
                alert('Agendamento cancelado com sucesso! (Funcionalidade de backend simulada)');
                // Atualizar a lista (apenas para o mock)
                userBookings = userBookings.filter(b => b.bookingId !== bookingId);
                renderUserBookings(userBookings, 'lista-meus-agendamentos');
            }
        });
    });
}

// Função para carregar detalhes de um evento específico
function loadEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    const eventDetailContent = document.getElementById('event-detail-content');
    const agendarBtn = document.getElementById('agendar-btn');

    if (!eventId || !eventDetailContent) {
        if(eventDetailContent) eventDetailContent.innerHTML = '<p class="message-error">Evento não encontrado.</p>';
        if(agendarBtn) agendarBtn.style.display = 'none';
        return;
    }

    const event = mockEvents.find(e => e.id === eventId);

    if (event) {
        eventDetailContent.innerHTML = `
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
            </div>
            <div class="event-info">
                <h2>${event.title}</h2>
                <p><strong>Descrição:</strong> ${event.description}</p>
                <ul class="details-list">
                    <li><strong>Data:</strong> ${event.date}</li>
                    <li><strong>Hora:</strong> ${event.time}</li>
                    <li><strong>Local:</strong> ${event.location}</li>
                </ul>
            </div>
        `;
        if (agendarBtn) {
            agendarBtn.onclick = () => {
                window.location.href = `formulario.html?eventId=${event.id}&eventTitle=${encodeURIComponent(event.title)}`;
            };
        }
    } else {
        eventDetailContent.innerHTML = '<p class="message-error">Evento não encontrado.</p>';
        if(agendarBtn) agendarBtn.style.display = 'none';
    }
}


// Event Listeners para carregar conteúdo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('agendamento.html')) {
    renderEvents(mockEvents, 'lista-eventos-publico');
  } else if (window.location.pathname.includes('eventos.html')) {
    // Em eventos.html, verificamos se o usuário está logado e carregamos eventos
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        document.getElementById('user-display-name').textContent = user.displayName || user.email;
        renderEvents(mockEvents, 'lista-eventos-logado', true); // Passa true para indicar que é usuário logado
      } else {
        window.location.href = 'login.html'; // Redireciona se não estiver logado
      }
    });
  } else if (window.location.pathname.includes('detalhes-evento.html')) {
    loadEventDetails();
  } else if (window.location.pathname.includes('meus-agendamentos.html')) {
      firebase.auth().onAuthStateChanged(user => {
          if (user) {
              // Em um sistema real, buscaria agendamentos do backend para este usuário
              userBookings = getUserBookings(user.uid); // Exemplo de uso de mock data
              renderUserBookings(userBookings, 'lista-meus-agendamentos');
          } else {
              window.location.href = 'login.html';
          }
      });
  }
});