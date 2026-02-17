function renderNavbar(userData) {
    if (!userData || !userData.loggedIn) {
        window.location.href = "/index.html";
        return;
    }

    const { nombre, rol } = userData;

    const bgColor = rol === 'maestro' ? 'nav-maestro' : 'nav-alumno';

    const navbarHTML = `
        <nav class="navbar navbar-expand-lg ${bgColor} fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Quiz Escuela</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="#navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        ${rol === 'maestro' ? `
                            <li class="nav-item">
                                <a class="nav-link" href="/pages/maestro/dashboard.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/pages/maestro/lista_estudiantes.html">Alumnos</a>
                            </li>
                        ` : `
                            <li class="nav-item">
                                <a class="nav-link" href="/pages/estudiante/dashboard.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/pages/estudiante/resultados.html">Mis Resultados</a>
                            </li>
                        `}
                    </ul>
                    <ul class="navbar-nav ms-auto aling-items-center">
                        <li class="nav-item">
                            <span class="nav-link">Hola, ${nombre || 'Usuario'}</span>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-danger fw-bold" href="#" onclick="logout(); return false;">
                                Cerrar sesión
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
}

window.renderNavbar = renderNavbar;