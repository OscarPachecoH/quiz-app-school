document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if(window.userData) {
            renderResultados(window.userData);
        } else {
            console.warn("userData no está disponible aún");
        }
    }, 1500);
});

function renderResultados(userData) {
    const contenedor = document.getElementById('contenidoResultados');
    if(!contenedor){
        console.error("Contenedor #contenidoResultados no encontrado");
        return;
    }
    contenedor.innerHTML = '';

    if(userData.rol === 'maestro'){
        renderResultadosMaestro(contenedor);
    } else {
        renderResultadosEstudiante(contenedor, userData.uid);
    }
}

function renderResultadosMaestro(contenedor) {
    const titulo = document.createElement('h3');
    titulo.className = 'mb-4';
    titulo.textContent = 'Resultado de mis examenes';
    contenedor.appendChild(titulo);

    const row = document.createElement('div');
    row.className = 'row g-4';
    contenedor.appendChild(row);
    db.ref('examenes').orderByChild('creadoPor').equalTo(window.userData.uid).once('value')
        .then(snapshot => {
            if(!snapshot.exists()){
                row.innerHTML = '<p class="text-center col-12 py-5 text-muted">Aún no has creado ningun examen</p>'
                return;
            }

            snapshot.forEach(child => {
                const examen = child.val();
                const examenId = child.key;

                const card = document.createElement('div');
                card.className = 'col-md-6 col-lg-4';
                card.innerHTML = `
                    <div class="card h-100 shadow-sm">
                        <div class="card-header bg-primary text-white fw-bold">
                            ${examen.titulo || 'Examen sin titulo'}
                        </div>
                        <div class="card-body">
                            <h5>${examen.nombre || examen.titulo}</h5>
                            <p class="text-muted small">Preguntas: ${examen.preguntas?.length || 0}</p>
                            <p class="text-muted small">Creado: ${new Date(examen.fechaCreacion).toLocaleDateString()}</p>
                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <button class="btn btn-primary w-100" onclick="verResultadosExamen('${examenId}')">
                                Ver calificaciones de alumnos
                            </button>
                        </div>
                    </div>
                `;
                row.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Error al cargar examenes del maestro:", err);
            contenedor.innerHTML += '<p class="text-denger text-center py-5">Error al cargar resultados. Intenta recargar</p>'
        });
}

window.verResultadosExamen = function(examenId) {
    alert(`Ver resultados detallados del examen ${examenId} (proximamente)`);
}

function renderResultadosEstudiante(contenedor, uid) {
    const titulo = document.createElement('h3');
    titulo.className = 'mb-4';
    titulo.textContent = 'Mis resultados';
    contenedor.appendChild(titulo);

    const row = document.createElement('div');
    row.className = 'row g-4';
    contenedor.appendChild(row);

    db.ref(`usuarios/${uid}/resultados`).once('value')
        .then(snapshot => {
            if(!snapshot.exists()){
                row.innerHTML = '<p class="text-center col-12 py-5 text-muted">Aun no has tomado ningun examen</p>';
                return;
            }

            snapshot.forEach(child => {
                const res = child.val();
                const examenId = child.key;

                const estadoClass = res.aprobado ? 'bg-success' : 'bg-danger';
                const estadoTexto = res.aprobado ? 'Aprobado' : 'Reprobado';

                const card = document.createElement('div');
                card.className = 'col-md-6 rol-lg-4';
                card.innerHTML = `
                    <div class="card h-100 shadow-sm">
                        <div class="card-header ${estadoClass} text-white fw-bold">
                            ${res.nombreExamen || 'Examen compleeto'}
                        </div>
                        <div class="card-body">
                            <h5>Calificación: ${res.calificacion} / ${res.puntajeMaximo}</h5>
                            <p class="mb-1">Porcentaje: ${Math.round((res.calificacion / res.puntajeMaximo) * 100)}%</p>
                            <span class="badge ${estadoClass}">${estadoTexto}</span>
                            <p class="text-muted small mt-2">Realizado el ${new Date(res.fechaRealizacion).toLocaleDateString()}</p>
                        </div>
                    </div>
                `;
                row.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Error al cargar resultados del alumno:", err);
            contenedor.innerHTML += '<p class="text-danger text-center py-5">Error al cargar tus resultados.</p>';
        })
}