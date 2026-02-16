// const scripts = [
//     "https://www.gstatic.com/firebasejs/12.8.0/firebase-app-compat.js",
//     "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth-compat.js",
//     "https://www.gstatic.com/firebasejs/12.8.0/firebase-database-compat.js"
// ];

// scripts.forEach(src => {
//     const script = document.createElement('script');
//     script.src = src;
//     script.async = false;
//     document.head.appendChild(script);
// });

// window.addEventListener('load', () => {
//     if(typeof firebase === 'undefined'){
//         console.error("Firebase no cargo correctamente");
//         return;
//     }
//     firebase.initializeApp(firebaseConfig);

//     window.auth = firebase.auth();
//     window.db = firebase.database();
//     console.log("Firebase inicializado en modo compat ✓");
// });

console.log("firebase-init.js empezo a ejecutarse");

document.write('<script src="https://www.gstatic.com/firebasejs/12.8.0/firebase-app-compat.js"></script>');
document.write('<script src="https://www.gstatic.com/firebasejs/12.8.0/firebase-auth-compat.js"></script>');
document.write('<script src="https://www.gstatic.com/firebasejs/12.8.0/firebase-database-compat.js"></script>');

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded disparado");

    if(typeof firebase === 'undefined'){
        console.error("Firebase no cargo (CDNs fallido)");
        return;
    }

    if(typeof window.firebaseConfig === 'undefined'){
        console.error("window.firebaseConfig NO existe. Revisa firebase-config.js");
        return;
    }

    firebase.initializeApp(window.firebaseConfig);
    window.auth = firebase.auth();
    window.db = firebase.database();

    console.log("Firebase inicalizado en modo compat");
    console.log("auth existe?:", !!window.auth);
    console.log("db existe?:", !!window.db);
    
})