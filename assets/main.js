document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a');

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(event) {
            event.preventDefault();
            const targetUrl = this.getAttribute('href');

            document.body.classList.add('fade-out');

            setTimeout(function() {
                window.location.href = targetUrl;
            }, 500); // Тайм-аут для завершения анимации перед переходом
        });
    }
});
