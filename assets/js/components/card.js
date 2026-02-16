function renderExamenesCards(userData) {
    if (!userData || !userData.loggedIn) {
        window.location.href = "/index.html";
        return;
    }

    const { rol } = userData;
    const contenedor = document.createElement('div');
    contenedor.className = 'container mt-5 pt-3';
    contenedor.innerHTML = '<h2 class="mb-4 text-center">Exámenes Disponibles</h2>';

    // Mensaje temporal de carga
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'text-center py-5';
    loadingDiv.innerHTML = '<div class="spinner-border text-primary" role="status"></div><p class="mt-3">Cargando exámenes...</p>';
    contenedor.appendChild(loadingDiv);

    document.body.appendChild(contenedor);

    // Consulta a Firebase
    let query = db.ref('examenes');

    if (rol === 'maestro') {
        // Maestro solo ve los suyos
        query = query.orderByChild('creadoPor').equalTo(userData.uid);
    }
    // Estudiante ve todos (puedes filtrar después por estado/activo)

    query.once('value')
        .then(snapshot => {
            // Limpia el loading
            contenedor.innerHTML = '<h2 class="mb-4 text-center">Exámenes Disponibles</h2>';

            const row = document.createElement('div');
            row.className = 'row row-cols-1 row-cols-md-3 g-4';

            if (!snapshot.exists()) {
                const mensaje = rol === 'maestro'
                    ? '<p class="text-center text-muted py-5">No hay exámenes creados aún.</p>'
                    : '<p class="text-center text-muted py-5">No hay exámenes disponibles. Contacta a tu maestro.</p>';

                contenedor.innerHTML += mensaje;

                if (rol === 'maestro') {
                    row.innerHTML = generarCardAgregar();
                }
            } else {
                snapshot.forEach(child => {
                    const examen = child.val();
                    const examenId = child.key;

                    const card = `
                        <div class="col">
                            <div class="card h-100 shadow-sm border-0">
                                <div class="card-header bg-primary text-white fw-bold">
                                    ${examen.titulo || 'Examen sin título'}
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">${examen.nombre || examen.titulo}</h5>
                                    <p class="card-text text-muted">${examen.descripcion || 'Sin descripción'}</p>
                                    <p class="text-muted small">
                                        Duración: ${examen.duracionMinutos || '?'} min<br>
                                        Preguntas: ${examen.preguntas?.length || 0}
                                    </p>
                                </div>
                                <div class="card-footer bg-transparent border-0">
                                    ${rol === 'maestro' ? `
                                        <div class="d-flex gap-2">
                                            <button class="btn btn-outline-primary btn-sm flex-fill" onclick="editarExamen('${examenId}')">Editar</button>
                                            <button class="btn btn-outline-danger btn-sm flex-fill" onclick="eliminarExamen('${examenId}')">Eliminar</button>
                                        </div>
                                    ` : `
                                        <button class="btn btn-primary w-100" onclick="tomarExamen('${examenId}')">Tomar examen</button>
                                    `}
                                </div>
                            </div>
                        </div>
                    `;
                    row.insertAdjacentHTML('beforeend', card);
                });

                // Agregar card de crear al final (solo maestro)
                if (rol === 'maestro') {
                    row.insertAdjacentHTML('beforeend', generarCardAgregar());
                }
            }

            contenedor.appendChild(row);
        })
        .catch(err => {
            console.error("Error al cargar exámenes:", err);
            contenedor.innerHTML += '<p class="text-danger text-center py-5">Error al cargar exámenes. Intenta recargar.</p>';
        });
}

// Función auxiliar para la card de agregar
function generarCardAgregar() {
    return `
        <div class="col">
            <div class="card h-100 shadow-sm border-2 border-dashed border-success text-center d-flex align-items-center justify-content-center add-exam-card">
                <div class="card-body py-5">
                    <i class="bi bi-plus-circle-fill display-1 text-success mb-3"></i>
                    <h5 class="card-title fw-bold text-success">Agregar Nuevo Examen</h5>
                    <p class="card-text text-muted small">Crea un examen nuevo con preguntas y respuestas</p>
                    <button class="btn btn-success mt-3 px-5" data-bs-toggle="modal" data-bs-target="#modalNuevoExamen">
                        + Crear Examen
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.renderExamenesCards = renderExamenesCards;