//анимация перехода секциями страницы (скролл)
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

document.addEventListener('scroll', function() {
    let newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        if (item.getBoundingClientRect().top < window.innerHeight) {
            item.classList.add('visible');
        }
    });
});

// Фильтрация новостей
document.querySelectorAll('.news-filter button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-filter');
        document.querySelectorAll('.news-item').forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

