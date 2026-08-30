// ============================================
// MENU MOBILE (HAMBURGER)
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('ativo');
});

// Fecha o menu ao clicar num link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('ativo');
    });
});


// ============================================
// ⚠️ CONFIGURAÇÃO — PREENCHA O SEU NÚMERO
// Formato: código do país + número (sem espaços)
// Exemplo Angola: 244900000000
// Exemplo Brasil: 5511999999999
// ============================================
const NUMERO_WHATSAPP = '972338343'; // ⚠️ MUDE AQUI


// ============================================
// ABRIR PEDIDO (botões dos serviços)
// ============================================
function abrirPedido(servico) {
    const mensagem = encodeURIComponent(
        `Olá! Gostaria de fazer um pedido:\n\n` +
        `🛠️ Serviço: ${servico}\n\n` +
        `Por favor, enviem-me mais informações.`
    );
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`, '_blank');
}


// ============================================
// FORMULÁRIO DE PEDIDO — envia para WhatsApp
// ============================================
const formPedido = document.getElementById('formPedido');

formPedido.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !telefone || !servico || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const texto =
        `*NOVO PEDIDO — ML-TECNOLOGIA*\n\n` +
        `👤 *Nome:* ${nome}\n` +
        `📞 *Telefone:* ${telefone}\n` +
        (email ? `📧 *Email:* ${email}\n` : '') +
        `🛠️ *Serviço:* ${servico}\n\n` +
        `📝 *Descrição:*\n${mensagem}`;

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');

    // Limpa o formulário
    formPedido.reset();
});


// ============================================
// FAQ ACCORDION
// ============================================
document.querySelectorAll('.faq-pergunta').forEach(pergunta => {
    pergunta.addEventListener('click', () => {
        const item = pergunta.parentElement;
        const resposta = item.querySelector('.faq-resposta');
        const estaAtivo = item.classList.contains('ativo');

        // Fecha todos
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('ativo');
            i.querySelector('.faq-resposta').style.maxHeight = null;
        });

        // Abre o clicado (se não estava aberto)
        if (!estaAtivo) {
            item.classList.add('ativo');
            resposta.style.maxHeight = resposta.scrollHeight + 'px';
        }
    });
});


// ============================================
// BOTÃO VOLTAR AO TOPO
// ============================================
const btnVoltar = document.getElementById('voltarTopo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        btnVoltar.classList.add('visivel');
    } else {
        btnVoltar.classList.remove('visivel');
    }
});

btnVoltar.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ============================================
// ANIMAÇÃO AO SCROLL (IntersectionObserver)
// ============================================
const elementosAnimar = document.querySelectorAll(
    '.card, .video-card, .passo, .depoimento-card, .numero-item, .faq-item'
);

elementosAnimar.forEach(el => el.classList.add('animar'));

const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
            observador.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

elementosAnimar.forEach(el => observador.observe(el));

// ============================================
// REGISTRA O SERVICE WORKER (PWA)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((reg) => console.log('✅ PWA registrado'))
            .catch((err) => console.log('❌ Erro:', err));
    });
}