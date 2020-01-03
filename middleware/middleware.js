const nodemailer = require("nodemailer");

module.exports = {
  pinGenerator: function() {
    let pin = Math.floor(Math.random() * 9000000000 + 1000000000).toString();
    return pin;
  },
  sendMail: async function(user) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    let info = await transporter.sendMail({
      from: `serverEmail@server.com`,
      to: `${user.email}`,
      subject: "Pincode Details",
      html: `Your pin code is <b>${user.pin}</b>`
    });

    return nodemailer.getTestMessageUrl(info);
  }
};
