document.addEventListener('DOMContentLoaded', function() {
    // Обработчик кликов по ссылкам
    const links = document.querySelectorAll('a');
    const fadeElements = document.querySelectorAll('.fade-in');
    const newsItems = document.querySelectorAll('.news-item');

    // Оптимизация: объединение всех операций после загрузки страницы
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetUrl = link.getAttribute('href');

            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600);
        });
    });

    // Анимация для элементов при прокрутке
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => observer.observe(element));

    // Дебаунс для прокрутки
    let scrollTimeout;
    document.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
            newsItems.forEach(item => {
                if (item.getBoundingClientRect().top < window.innerHeight) {
                    item.classList.add('visible');
                }
            });
        }, 100); 
    });

    // Фильтрация новостей
    document.querySelectorAll('.news-filter button').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-filter');
            newsItems.forEach(item => {
                item.style.display = (category === 'all' || item.getAttribute('data-category') === category) ? 'flex' : 'none';
            });
        });
    });

    // Форма отправки сообщения с async/await
    document.getElementById('contact-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const submitButton = document.querySelector('.button_submit');
        
        try {
            const response = await fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, message })
            });

            if (response.ok) {
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
                alert('Ваше сообщение было отправлено');

                // Блокируем кнопку
                submitButton.disabled = true;
                submitButton.textContent = 'Подождите 90 секунд...';

                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Отправить';
                }, 90000);
            } else {
                throw new Error('Ошибка при отправке сообщения');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при отправке сообщения');
        }
    });
});

document.getElementById("message").addEventListener("input", function (event) {
    const inputField = event.target;
    const cursorPosition = inputField.selectionStart;
    inputField.value = inputField.value.replace(/[^а-яА-ЯёЁ\s]/g, '');
    inputField.setSelectionRange(cursorPosition, cursorPosition);
});


document.getElementById("contact-form").addEventListener("submit", function (event) {
    const emailInput = document.getElementById("email");
    const allowedDomains = ["mail.ru", "yandex.ru", "gmail.com"];
    const emailDomain = emailInput.value.split("@")[1];

    if (!allowedDomains.includes(emailDomain)) {
        event.preventDefault();
        alert("Пожалуйста, используйте почту с доменом mail.ru, yandex.ru или gmail.com");
    }
});