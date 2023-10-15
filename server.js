// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const api_key = 'key-46f40d334023c89603612dcccb495f66';
const domain = 'sandbox5f61c96513ff4c5a9f37c034be2df31d.mailgun.org';
const mailgunInstance = mailgun({ apiKey: api_key, domain: domain });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app.js');
});

app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    const mailData = {
        from: '<moksh4814.be22@chitkara.edu.in>',
        to: 'moksh4814.be22@chitkara.edu.in',
        subject: 'Welcome',
        text: 'Thanks for subscribing the newsletter now you will get all the updates form the Dev@Deakin2023',
    };

    mailgunInstance.messages().send(mailData, function (error, body) {
        if (error) {
            console.log("Error sending email:", error);
            return res.status(500).send("Error sending email");
        } else {
            console.log("Email sent successfully:", body);
            res.json({ message: 'Email sent successfully' });
        }
    });
});

app.listen(3000, () => {
    console.log("The Server is running at port 3000!");
});
