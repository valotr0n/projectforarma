const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); //Cross-origin resource sharing


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors({
    origin: 'http://127.0.0.1:5500', 
    methods: ['GET', 'POST'],        
    allowedHeaders: ['Content-Type'] 
}));
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',  
    port: 465,  
    secure: true, 
    auth: {
        user: 'beloshnez98@bk.ru',//почта должна быть той же что с примера сниuзу (from: ...) 
        pass: 'r8dhfpscfQAJdy1zYyVS',  
    }
});

// Обработка формы
app.post('/send-email', (req, res) => {
    const { email, message } = req.body;

    const mailOptions = {
        from: 'beloshnez98@bk.ru', //почта откуда будут приходить сообщения
        to: 'stax1x@bk.ru', //почта куда будут приходить сообщения 
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


app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
