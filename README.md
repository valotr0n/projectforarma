Введение
Проект представляет собой информационный сайт для сообщества игры ARMA 3 — популярного военного симулятора. Сайт направлен на поддержку и объединение участников сообщества, предоставляя актуальные данные о событиях, миссиях, и активности игроков. Сайт также позволяет пользователям следить за новостями, связываться с администрацией, и участвовать в общении через социальные платформы.

1.	Цели проекта
1.1	 Создать информационный хаб для сообщества ARMA 3.
1.2	Обеспечить актуальные новости и анонсы предстоящих миссий и событий.
1.3	Облегчить взаимодействие пользователей с администрацией сайта и сообщества через интеграцию социальных платформ и контактные формы.
1.4	Поддерживать легкий доступ к профилям участников и их игровым статусам с использованием таблиц, импортируемых через API Google Sheets.





2.	Основные компоненты и функционал
2.1	Главная страница (main.html)
o	Содержит основную информацию о сообществе и ключевых событиях.
o	Секции:
	Hero Section: Заголовок сообщества, краткое описание и счетчик текущих игроков.
	Upcoming Games: Блок с анонсами предстоящих миссий, включая дату, описание, количество участников и кнопку для записи на миссию.
	News Section: Новости о сервере с фильтром по категориям, где отображаются обновления, ивенты и объявления.
2.2 Страница "О нас" (aboutus.html)
o	Описание проекта и доступные социальные ссылки.
o	Секции:
	Social Links: Карточки для быстрой ссылки на сервер Discord, группу ВКонтакте и форум проекта.
	Contact Section: Форма для отправки сообщений администраторам. Содержит проверку на допустимые домены электронной почты (mail.ru, yandex.ru, gmail.com) и таймер на повторное отправление сообщений.
2.3 Страница "Информация о пользователях" (info.html)
o	Список и информация об участниках проекта.
o	Функционал:
	Импорт таблицы с помощью Google Sheets API.
	Поиск по позывному для удобной навигации по таблице.
	Прелоадер для отображения статуса загрузки данных таблицы.
2.4	Серверная часть (server.js)
o	Серверная логика написана на Node.js и отвечает за обработку формы обратной связи.
o	Основные функции:
	Подключение к почтовому серверу через nodemailer для отправки писем с поддержкой безопасного соединения.
	Обработка запроса от формы, отправка сообщений на почту администратора, а также управление таймером отправки сообщений для предотвращения спама.
2.5 Клиентские скрипты
o	main.js: Реализация интерактивных элементов сайта, включая анимацию прокрутки, обработчики для кнопок на главной странице, фильтрацию новостей, и форму на странице "О нас".
o	table.js: Логика работы с таблицей Google Sheets, загрузка данных, рендеринг таблицы и реализация поиска.
3. Стек технологий
•	HTML и CSS: Визуальное оформление и структура сайта.
•	JavaScript: Реализация интерактивных элементов и работы с API.
•	Google Sheets API: Подключение и динамическая подгрузка данных таблицы игроков.
•	Node.js и Express: Обработка запросов на сервере, отправка сообщений с использованием nodemailer.
•	Nodemailer: Подключение к SMTP-серверу для отправки почты.
4.	Детали кода
4.1	HTML-страницы:
o	Содержат базовую структуру сайта и ссылки на общие CSS-файлы.
o	Реализуют навигационное меню, переходы между страницами, а также подключают нужные скрипты и шрифты.
4.2 Скрипты:
o	main.js: Управляет поведением всех страниц, включая прокрутку к определенным секциям и фильтрацию новостей. Включает таймер на отправку сообщений в форме, а также подсказки и валидацию полей.
o	table.js: Обрабатывает данные с Google Sheets, проверяет наличие ошибок и рендерит таблицу с пользователями и заголовками "Отделений".
4.3 Серверный код:
o	Обработка отправки форм: Сервер на Express принимает данные от формы на странице "О нас" и отправляет их на указанную почту администратора, обрабатывая ошибки и устанавливая ограничения на частоту отправки сообщений.


Заключение
Проект охватывает всю необходимую функциональность для активного сообщества ARMA 3. Включает продуманную структуру, адаптивный дизайн и интуитивно понятный интерфейс, облегчая доступ к информации о событиях и участниках сервера.
