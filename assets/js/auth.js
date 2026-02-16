function waitForFirebase(callback) {
    if(window.auth && window.db){
        callback();
    } else {
        setTimeout(() => waitForFirebase(callback), 100);
    }
}

waitForFirebase(() => {
    const auth = window.auth;
    const db = window.db;

    // Obtener rol desde Realtiem DB
    function getUserWithRole(callback) {
        auth.onAuthStateChanged((user) => {
            if(user){
                db.ref('usuarios/' + user.uid).once('value')
                .then((snapshot) => {
                    const data = snapshot.val();
                    if(data){
                        callback({
                            uid: user.uid,
                            email: user.email,
                            nombre: data.nombre || 'Usuario',
                            rol: data.rol,
                            loggedIn: true
                        });
                    } else {
                        auth.signOut();
                        callback(null);
                    }
                })
                .catch(err => {
                    console.error("Error rol:", err);
                    callback(null);
                })
            } else {
                callback(null);
            }
        });
    }

    window.login = function(email, password) {
        auth.signInWithEmailAndPassword (email, password)
        .then(() => {
            getUserWithRole((userData) => {
                if(userData && userData.rol) {
                    const folder = userData.rol === 'maestro' ? 'maestro' : 'estudiante';
                    window.location.href = `./pages/${folder}/dashboard.html`;
                } else {
                    alert("Usuario sin rol. Contacta al admin");
                }
            })
        })
        .catch(error => {
            console.error("Error completo de Firebase Auth:", error);
            console.error("Código:", error.code);
            console.error("Mensaje:", error.message);

            let msg = "Error al iniciar sesión";
            if(error.code === 'auth/wrong-password') msg = "Contraseña incorrecta";
            if(error.code === 'auth/user-hot-found') msg = "Usuario no encontrado";
            if(error.code === 'auth/invalid-email') msg = "Formato de email invalido";
            if(error.code === 'auth/too-many-requests') msg = "Demasiados intentos, espera un momento";
            if(error.code === 'auth/user-disable') msg = "Usuario desactivado";
            alert(msg + "\n\nDetalles: " + error.message + "\nCódigo: " + error.code);
        });
    };

    // Logout
    window.logout = function() {
        auth.signOut()
        .then(() => window.location.href = "../../index.html")
        .catch(err => console.error("Logout error:", err));
    };

    window.protectPageAndRenderNavbar = function(){
        auth.onAuthStateChanged((user) => {
            if(!user){
                window.location.href = "/index.html";
                return;
            }

            getUserWithRole((userData) => {
                if(!userData) {
                    window.location.href = "/index.html";
                    return;
                }

                window.userData = userData;

                if(typeof window.renderNavbar === 'function'){
                    window.renderNavbar(userData);
                } 

                if(typeof window.renderExamenesCards === 'function'){

                    window.renderExamenesCards(userData)

                }

                const loadingScreen = document.getElementById('loadingScreen');
                if(loadingScreen){
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.remove();
                    }, 500);
                }

            })
        })
    }

    console.log("protectPageAndRenderNavbar definida ✓");

})