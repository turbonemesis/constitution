#! /usr/bin/env node

const { join } = require('path');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fs = require('fs'), 
    filename = 'CODE OF CONDUCT.pdf',
    fileType = 'application/pdf',
    data = fs.readFileSync(join(__dirname, `assets/attachments/${filename}`));

const msg = {
    to: 'chase@rentdynamics.com',
    from: 'rd-flex@zoot.dev',
    subject: 'Constitution Changed',
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>',
    attachments: [
        {
            content: data.toString('base64'),
            filename: filename,
            type: fileType,
            disposition: 'attachment',
        },
    ],
};

sgMail
    .send(msg)
    .then(() => console.log('Mail sent successfully'))
    .catch((error: any) => console.error(error.toString()));
    