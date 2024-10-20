document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a');

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(event) {
            event.preventDefault();
            const targetUrl = this.getAttribute('href');

            document.body.classList.add('fade-out');

            setTimeout(function() {
                window.location.href = targetUrl;
            }, 600); // Тайм-аут для завершения анимации перед переходом
        });
    }
});
// Анимация при прокрутке для плавного появления секций
document.addEventListener('DOMContentLoaded', function () {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

