const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const { info } = require('console');

const app = express();


// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static middleware Folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('contact');
})

app.get('/about', (req, res) => {
    res.render('about');
})

// When Contact Form Submitted
app.post('/send', (req, res) => {
    //console.log(req.body);
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Company: ${req.body.company}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    //Sending email ...
    // create reusable transporter object using the default SMTP transport
    let transpoter = nodemailer.createTransport({
        host: 'mail.serhat.org.tr',
        port: 465,
        secure: true,
        auth: {
            user: 'kadirkaya@serhat.org.tr',
            pass: 'K.k19951995'
        }
    })

    let mailOptions = {
        from: '"Nodemailer Contact" <kadirkaya@serhat.org.tr>', // sender address
        to: "kdrky57@gmail.com, kadir.kaya@hisarmail.com", // list of receivers
        subject: "NodeJs Contact Form Requests", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    }

   
    transpoter.sendMail(mailOptions, (err, res) => {
        if (err) console.log(err);
        console.log(res)

    })

    res.render('contact', {msg: 'Message has been sent!'});

})


app.listen(8080, (err) => {
    if(err) throw err;
    console.log('Server created succesfully');
})

