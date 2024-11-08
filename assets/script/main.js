document.addEventListener('DOMContentLoaded', function() {
    // Общие обработчики для всех страниц
    const links = document.querySelectorAll('a');
    const fadeElements = document.querySelectorAll('.fade-in');

    // Анимация для элементов при прокрутке
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => observer.observe(element));

    
    const currentPage = window.location.pathname;

    // Обработчики только для главной страницы (main.html)
    if (currentPage.includes('main.html') || currentPage === '/') {
        // Обработчик для прокрутки к новостям
        const scrollToNewsButton = document.querySelector('.scroll-to-news');
        if (scrollToNewsButton) {
            scrollToNewsButton.addEventListener('click', function() {
                const newsSection = document.querySelector('.news-section');
                newsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }

        // Обработчик для перехода на страницу "О нас"
        const redirectButtons = document.querySelectorAll('.redirect-to-about');
        redirectButtons.forEach(button => {
            button.addEventListener('click', function() {
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = 'aboutus.html';
                }, 600);
            });
        });

        // Фильтрация новостей
        const newsItems = document.querySelectorAll('.news-item');
        document.querySelectorAll('.news-filter button').forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-filter');
                newsItems.forEach(item => {
                    item.style.display = (category === 'all' || item.getAttribute('data-category') === category) ? 'flex' : 'none';
                });
            });
        });
    }

    // Обработчики только для страницы "О нас" (aboutus.html)
    if (currentPage.includes('aboutus.html')) {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            //Проверка таймера при отправке сообщения
            const submitButton = document.querySelector('.button_submit');
            const cooldownEndTime = localStorage.getItem('cooldownEndTime');
            
            if (cooldownEndTime && Date.now() < parseInt(cooldownEndTime)) {
                const remainingTime = Math.ceil((parseInt(cooldownEndTime) - Date.now()) / 1000);
                submitButton.disabled = true;
                submitButton.textContent = `Подождите ${remainingTime} секунд...`;
                
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Отправить';
                    localStorage.removeItem('cooldownEndTime');
                }, remainingTime * 1000);
            }

            contactForm.addEventListener('submit', async function(event) {
                event.preventDefault();

                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                const submitButton = document.querySelector('.button_submit');
                
                // Проверка email на допустимые домены
                const emailPattern = /^[a-zA-Z0-9._%+-]+@(mail\.ru|yandex\.ru|rambler\.ru)$/;
                if (!emailPattern.test(email)) {
                    alert('Пожалуйста, используйте почту mail.ru, yandex.ru или rambler.ru');
                    return;
                }
                
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

                        submitButton.disabled = true;
                        submitButton.textContent = 'Подождите 90 секунд...';
                        
                        // Сохраняем время окончания таймера
                        const cooldownEndTime = Date.now() + 90000;
                        localStorage.setItem('cooldownEndTime', cooldownEndTime.toString());

                        setTimeout(() => {
                            submitButton.disabled = false;
                            submitButton.textContent = 'Отправить';
                            localStorage.removeItem('cooldownEndTime');
                        }, 90000);
                    } else {
                        throw new Error('Ошибка при отправке сообщения');
                    }
                } catch (error) {
                    console.error('Ошибка:', error);
                    alert('Ошибка при отправке сообщения');
                }
            });
            
            const emailInput = document.getElementById('email');

            if (emailInput) {
                emailInput.addEventListener('input', function(event) {
                    const inputField = event.target;
                    const cursorPosition = inputField.selectionStart;
            // Проверка на правильность email
                    const emailPattern = /^[a-zA-Z0-9._%+-]+@(yandex|mail|rambler|gmail)\.com$/;
                    const errorMessage = document.getElementById('email-error-message');
            
                    // Если поле уже есть для вывода ошибок, иначе создаем
                    if (!errorMessage) {
                        const newErrorMessage = document.createElement('span');
                        newErrorMessage.id = 'email-error-message';
                        newErrorMessage.style.color = 'red';
                        newErrorMessage.style.fontSize = '12px';
                        inputField.parentNode.insertBefore(newErrorMessage, inputField.nextSibling);
                    }
            
                    // Проверка соответствия шаблону
                    if (!emailPattern.test(inputField.value) && inputField.value !== "") {
                        document.getElementById('email-error-message').textContent = 'Введите корректный email с доменом yandex, mail, rambler или gmail';
                    } else {
                        document.getElementById('email-error-message').textContent = '';
                    }
                });
            }
            
            const messageInput = document.getElementById('message');
            if (messageInput) {
                messageInput.addEventListener('input', function(event) {
                    const inputField = event.target;
                    const cursorPosition = inputField.selectionStart;
                    inputField.value = inputField.value.replace(/[^а-яА-ЯёЁ0-9.,?\s]/g, '');
                    inputField.setSelectionRange(cursorPosition, cursorPosition);
                });
            }
        }
    }

    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
