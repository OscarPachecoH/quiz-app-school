function cargarAlumnos() {
    db.ref('usuarios').orderByChild('rol').equalTo('estudiante').once('value')
        .then(snapshot => {
            const tbody = document.getElementById('alumnosBody');
            tbody.innerHTML = '';

            if(!snapshot.exists()){
                tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4">No hay alumnos registrados aún</td></tr>'
                return;
            }

            var num = 0;
            console.log("Variable num fuera del forEach: " + num );

            snapshot.forEach(child => {
                const data = child.val();
                const uid = child.key;
                const num2 = num++;
                console.log("Variable num dentro del forEach: " + num2 );
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${num}</td>
                    <td>${data.nombre || 'Sin nombre'}</td>
                    <td>${data.email || 'Sin email'}</td>
                    <td>${data.fechaRegistro ? new Date(data.fechaRegistro).toLocaleString() : '-'}</td>
                    <td>
                        <span class="badge bg-success">Activo</span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="verDetalles('${uid}')">Ver</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="verDetalles('${uid}')">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(err => console.err("Error al cargar alumnos:", err));
}

document.getElementById('btnGuardarAlumno').addEventListener('click', () => {
    const nombre = document.getElementById('nombreAlumno').value.trim();
    const email = document.getElementById('emailAlumno').value.trim();
    const password = document.getElementById('passwordAlumno').value.trim();
    const confirmPass = document.getElementById('confirmPassword').value;

    if(!nombre || !email || !password){
        alert("Completa todos los campos bligatorios");
        return;
    }

    if(password !== confirmPass){
        alert("Las contraseñas no coinciden");
        return;
    }

    if(password.length < 6){
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const uid = userCredential.user.uid;

            db.ref('usuarios/' + uid).set({
                nombre,
                email, 
                rol: 'estudiante', 
                fechaRegistro: new Date().toISOString(),
                creadoPor: userData.uid
            })
            .then(() => {
                auth.signOut()
                    .then(() => {
                        alert("Alumno registrado correctamente");
                        bootstrap.Modal.getInstance(document.getElementById('modalNuevoAlumno')).hide();
                        document.getElementById('formNuevoAlumno').reset();
                        cargarAlumnos();
                    }).
                    catch(err => alert("Error al desloguear temp: " + err.message));
            })
            .catch(err => alert("Error al guardar datos: " + err.message));
        })
        .catch(error => {
            let msg = "Error al registrar alumno";
            if(error.code === 'auth/email-alredy-in-use') msg = "el email ya esta registrado";
            if(error.code === 'auth/invalid-email') msg = "Formato de email invalido";
            if(error.code === 'auth/weak-password') msg = "Contraseña muy debil";
            alert(msg + "\n" + error.message);
        });
});

function verDetalles(uid){
    alert("Ver detalles del alumno " + uid + " (proximamente)");
}

function eliminarAlumno(uid) {
    if(confirm("¿Seguro que quieres elimnar este alumno?")){
        alert("Funcion de eliminación (proximamente)")
    }
}