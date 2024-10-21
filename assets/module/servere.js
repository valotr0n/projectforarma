//файл который отвечает за серверную часть проекта
import nidemailer from 'nodemailer'

async function  sendMail() {
    let transporter = nodemailer.createTransport({
        host: 'smpt.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user : 'stax1x@bk.ru',
            pass: 'PASSSS',
        },
    });
    let result = await transporter.sendMail({
        from : '"Node.js" <stax1x@bk.ru>',
        to : '....., ....'
        subjects : 'Test',
        text : `Имя: Email:`
    });
    console.log(result);  
}
sendMail()