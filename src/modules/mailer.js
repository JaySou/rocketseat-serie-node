const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars'); // versão 3.0.0
const path = require('path');

const { host, port, user, pass} = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
      user: user,
      pass: pass
    }
  });

  // transport.use('compile', hbs({
  //   viewEngine: 'handlebars',
  //   viewPath: path.resolve('./src/resources/mail'),
  //   extName: '.html'
  // }));

  handlebarOptionns = {
    viewEngine: {
      extName: '.html',
      partialsDir: path.resolve('./src/resources/mail'),
      layoutDsir: path.resolve('./src/resources/mail'),
      defaultLayout: undefined
    },
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html'
  }

  transport.use('compile', hbs(handlebarOptionns));


  module.exports = transport;