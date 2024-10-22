const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');  // Подключаем cors


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors({
    origin: 'http://127.0.0.1:5500', // Разрешаем только этот источник
    methods: ['GET', 'POST'],        // Разрешаем только GET и POST методы
    allowedHeaders: ['Content-Type'] // Разрешаем заголовки Content-Type
}));
// Настройки для Nodemailer (укажите свои данные)
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',  // правильный SMTP хост для Mail.ru
    port: 465,  // используйте порт 465 для SSL-соединений
    secure: true, // true для порта 465, false для других портов
    auth: {
        user: 'mail new', // ваша почта
        pass: '_______',  // пароль или app password
    }
});
// app.get('/', (req, res) => {
//     //ТУТ НАДО НАПИСАТЬ file.send(index.html ) или как-то так
// })
// Обработка формы
app.post('/send-email', (req, res) => {
    const { email, message } = req.body;

    const mailOptions = {
        from: '__________', //почта с которой приходит сообщение 
        to: '________', // почта администратора
        subject: 'Сообщение от пользователя сайта',
        text: `Сообщение от: ${email}\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Ошибка при отправке сообщения');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Сообщение успешно отправлено');
        }
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
