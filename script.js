/* Archivo script.js corregido */

// Código de desplazamiento suave (smooth scroll)
// Se mantiene, ya que es la funcionalidad principal y no causa el error.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ¡IMPORTANTE! Se eliminó el código de inicialización de Tooltips y Popovers.
// Este código causaba el error `Cannot read properties of null (reading 'appendChild')`
// en bootstrap.js al intentar crear elementos dinámicos que no eran necesarios.