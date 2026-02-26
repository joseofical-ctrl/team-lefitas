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
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    flashlight.style.background = `radial-gradient(circle 250px at ${x}px ${y}px, transparent 0%, rgba(10,10,10,0.95) 100%)`;
});

// --- DATOS DE TU ESCUADRA (ESTADÍSTICAS REALES DE STEAM) ---
const supervivientes = [
    {
        nombre: "Julio",
        rol: "Tanque",
        arma: "Melee",
        salud: 30,
        foto: "img/tulio.jpeg",
        // ¡Datos sacados de tu captura de pantalla!
        logros: 7,            
        infectados: 1201,     
        horas: 4,             
        trabajoEquipo: 24     // Récord de compañeros protegidos
    },
    {
        nombre: "Jose",
        rol: "Carry",
        arma: "AK-47",
        salud: 70,
        foto: "img/jose.jpeg",
        // Datos de ejemplo para el segundo jugador:
        logros: 66,
        infectados: 124071,
        horas: 688,
        trabajoEquipo: 92
    },
    {
        nombre: "Gianper",
        rol: "Control",
        arma: "CUERNOS",
        salud: 55,
        foto: "img/gianper.jpeg",
        // Datos de ejemplo para el tercer jugador:
        logros: 13,
        infectados: 3331,
        horas: 12,           
        trabajoEquipo: 28
    },
    {
        nombre: "Miguel",
        rol: "Support",
        arma: "FRANCOTIRADOR",
        salud: 55,
        foto: "img/miguel.jpeg",
        // Datos de ejemplo para el tercer jugador:
        logros: 74,
        infectados: 152892,
        horas: 544,           
        trabajoEquipo: 121
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
                    <div style="display: flex; align-items: center; gap: 5px; margin-top: 2px;">
                        <span>Salud:</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${surv.salud}%;"></div>
                        </div>
                    </div>
                </div>

                <div class="survivor-stats-mini">
                    <div class="mini-stat">
                        <span>Logros</span>
                        <span class="stat-num" data-target="${surv.logros}">0</span>
                    </div>
                    <div class="mini-stat">
                        <span>Infectados</span>
                        <span class="stat-num" data-target="${surv.infectados}">0</span>
                    </div>
                    <div class="mini-stat">
                        <span>Horas</span>
                        <span class="stat-num" data-target="${surv.horas}">0</span>
                    </div>
                    <div class="mini-stat">
                        <span>T. Equipo</span>
                        <span class="stat-num" data-target="${surv.trabajoEquipo}">0</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    rosterContainer.innerHTML += cardHTML;
});

// --- ANIMACIÓN DE CONTADOR DE ESTADÍSTICAS ---
setTimeout(() => {
    const statNumbers = document.querySelectorAll('.stat-num');
    let animated = false; 

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // La animación dura 2 segundos
            const increment = target / (duration / 16); 

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target.toLocaleString();
                }
            };
            updateCounter();
        });
    };

    // Detectar cuando el usuario llega a las tarjetas
    window.addEventListener('scroll', () => {
        const rosterSection = document.getElementById('roster');
        if (!rosterSection) return;
        
        const sectionPos = rosterSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        // Si la sección de las tarjetas es visible, arranca la animación
        if (sectionPos < screenPos - 100 && !animated) {
            animateStats();
            animated = true;
        }
    });
}, 100);

// --- LÓGICA DEL BOTÓN DE READY ---
const readyButton = document.getElementById('ready-button');

if (readyButton) {
    readyButton.addEventListener('click', function(e) {
        // Si no tienes un enlace puesto en el HTML, evitamos que la página salte hacia arriba
        if (this.getAttribute('href') === '#') {
            e.preventDefault(); 
        }

        // Cambiamos el texto y lo ponemos en "verde tóxico" simulando que ya aceptó
        this.innerText = "INICIANDO...";
        this.style.borderColor = "var(--toxic-green)";
        this.style.color = "var(--toxic-green)";
        this.style.textShadow = "0 0 10px var(--toxic-green)";
        this.style.boxShadow = "0 0 30px rgba(92, 122, 41, 0.6), inset 0 0 15px rgba(92, 122, 41, 0.4)";
        
        // Lo regresamos a la normalidad después de 3 segundos
        setTimeout(() => {
            this.innerText = "ESTOY LISTO";
            this.style = ""; // Limpia los estilos aplicados por JS
        }, 3000);
    });
}

// --- LÓGICA DEL AUDIO INMERSIVO ---
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');
const audioWidget = document.getElementById('audio-widget');

if (musicBtn && bgMusic) {
    // Configura el volumen al 30% (música de fondo suave)
    bgMusic.volume = 0.3;

    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicIcon.innerText = "🔊";
            audioWidget.classList.add('playing');
        } else {
            bgMusic.pause();
            musicIcon.innerText = "🔇";
            audioWidget.classList.remove('playing');
        }
    });
}