// Contador de preguntas (para IDs únicos)
let contadorPreguntas = 0;

// Función para agregar un bloque de pregunta
function agregarPregunta() {
    contadorPreguntas++;

    const preguntaHTML = `
        <div class="card mb-3 pregunta-block" id="pregunta-${contadorPreguntas}">
            <div class="card-header bg-light d-flex justify-content-between align-items-center">
                <h6 class="mb-0">Pregunta ${contadorPreguntas}</h6>
                <button type="button" class="btn btn-sm btn-danger" onclick="eliminarPregunta(${contadorPreguntas})">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="enunciado-${contadorPreguntas}" class="form-label fw-bold">Enunciado de la pregunta <span class="text-danger">*</span></label>
                    <textarea class="form-control" id="enunciado-${contadorPreguntas}" rows="3" required placeholder="Escribe aquí la pregunta..."></textarea>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="opcionA-${contadorPreguntas}" class="form-label">Opción A</label>
                        <input type="text" class="form-control" id="opcionA-${contadorPreguntas}" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="opcionB-${contadorPreguntas}" class="form-label">Opción B</label>
                        <input type="text" class="form-control" id="opcionB-${contadorPreguntas}" required>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="opcionC-${contadorPreguntas}" class="form-label">Opción C</label>
                        <input type="text" class="form-control" id="opcionC-${contadorPreguntas}">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="opcionD-${contadorPreguntas}" class="form-label">Opción D</label>
                        <input type="text" class="form-control" id="opcionD-${contadorPreguntas}">
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-bold">Opción correcta <span class="text-danger">*</span></label>
                    <select class="form-select" id="correcta-${contadorPreguntas}" required>
                        <option value="">Selecciona...</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="puntos-${contadorPreguntas}" class="form-label">Puntos de esta pregunta</label>
                    <input type="number" class="form-control" id="puntos-${contadorPreguntas}" min="1" value="10">
                </div>
            </div>
        </div>
    `;

    document.getElementById('contenedorPreguntas').insertAdjacentHTML('beforeend', preguntaHTML);
}

// Eliminar pregunta
window.eliminarPregunta = function (numero) {
    if (confirm(`¿Eliminar Pregunta ${numero}?`)) {
        const preguntaBlock = document.getElementById(`pregunta-${numero}`);
        if (preguntaBlock) preguntaBlock.remove();
    }
};

// Botón para agregar pregunta
document.getElementById('btnAgregarPregunta')?.addEventListener('click', agregarPregunta);

// Botón para guardar todo el examen
document.getElementById('btnGuardarExamen')?.addEventListener('click', () => {
    // Validar campos generales
    const titulo = document.getElementById('tituloExamen')?.value.trim();
    if (!titulo) {
        alert("El título del examen es obligatorio");
        return;
    }

    // Recopilar todas las preguntas
    const preguntas = [];
    document.querySelectorAll('.pregunta-block').forEach(block => {
        const id = block.id.split('-')[1];
        const enunciado = document.getElementById(`enunciado-${id}`)?.value.trim();
        const opcionA = document.getElementById(`opcionA-${id}`)?.value.trim();
        const opcionB = document.getElementById(`opcionB-${id}`)?.value.trim();
        const opcionC = document.getElementById(`opcionC-${id}`)?.value.trim();
        const opcionD = document.getElementById(`opcionD-${id}`)?.value.trim();
        const correcta = document.getElementById(`correcta-${id}`)?.value;
        const puntos = parseInt(document.getElementById(`puntos-${id}`)?.value) || 10;

        if (!enunciado || !opcionA || !opcionB || !correcta) {
            alert("Completa todas las preguntas obligatorias");
            return;
        }

        preguntas.push({
            enunciado,
            opciones: { A: opcionA, B: opcionB, C: opcionC || '', D: opcionD || '' },
            correcta,
            puntos
        });
    });

    if (preguntas.length === 0) {
        alert("Agrega al menos una pregunta");
        return;
    }

    // Datos del examen
    const examenData = {
        titulo,
        descripcion: document.getElementById('descripcionExamen')?.value.trim() || '',
        duracionMinutos: parseInt(document.getElementById('duracionMinutos')?.value) || 60,
        fechaCreacion: new Date().toISOString(),
        creadoPor: window.userData?.uid || 'desconocido',
        preguntas: preguntas
    };

    // Guardar en Firebase
    db.ref('examenes').push(examenData)
        .then(ref => {
            alert("Examen creado con éxito! ID: " + ref.key);
            bootstrap.Modal.getInstance(document.getElementById('modalNuevoExamen')).hide();
            // Opcional: limpiar formulario o recargar lista de exámenes
            document.querySelector('#contenedorPreguntas').innerHTML = '';
            contadorPreguntas = 0;
        })
        .catch(err => alert("Error al guardar examen: " + err.message));
});