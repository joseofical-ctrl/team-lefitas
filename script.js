// Inicializar animaciones AOS
AOS.init({
    once: true, 
    duration: 800,
    easing: 'ease-out-cubic',
    offset: 120
});

// --- LÓGICA DE LA LINTERNA (EFECTO L4D) ---
const heroSection = document.getElementById('hero-section');
const flashlight = document.getElementById('flashlight');

heroSection.addEventListener('mousemove', (e) => {
    // Obtenemos la posición del mouse dentro del contenedor
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Movemos el degradado radial para simular el foco de la linterna
    flashlight.style.background = `radial-gradient(circle 250px at ${x}px ${y}px, transparent 0%, rgba(10,10,10,0.95) 100%)`;
});
// ------------------------------------------

// DATOS DE TU ESCUADRA
const supervivientes = [
    {
        nombre: "EL VIOLADO",
        rol: "Tanque",
        arma: "Su poto",
        salud: 30,
        foto: "img/tulio.jpeg"
    },
    {
        nombre: "EL CORRELON",
        rol: "Escapar",
        arma: "Sus piernas",
        salud: 70,
        foto: "img/jose.jpeg"
    },
    {
        nombre: "EL CUERNUDO",
        rol: "DPS",
        arma: "CUERNOS",
        salud: 55,
        foto: "img/gianper.jpeg"
    }
];

const rosterContainer = document.getElementById("roster-container");

// Generar las tarjetas de supervivientes
supervivientes.forEach((surv, index) => {
    const delay = index * 150; 
    
    const cardHTML = `
        <div class="survivor-card" data-aos="fade-up" data-aos-delay="${delay}">
            <div class="survivor-img-container">
                <img src="${surv.foto}" alt="${surv.nombre}">
            </div>
            <div class="survivor-info">
                <h3>${surv.nombre}</h3>
                <span class="survivor-role">${surv.rol}</span>
                
                <div class="stats-hud">
                    <p>Arma: ${surv.arma}</p>
                    <div style="display: flex; align-items: center; gap: 5px; margin-top: 5px;">
                        <span>Salud:</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${surv.salud}%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    rosterContainer.innerHTML += cardHTML;
});