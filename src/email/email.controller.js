const nodemailer = require('nodemailer');

class EmailController {
  constructor() {
    if (process.env.NODE_ENV !== 'prod') {
      this.smtpTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'fr3yjbymylwvbkc6@ethereal.email',
          pass: 'sCvgzSPfhssNBEH3TQ',
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      })
    } else {
      this.smtpTransporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.email_username,
          pass: process.env.email_password,
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });
    }
  }

  /**
   * Send the reset email to the user
   *
   * @param {string} email - users email
   * @param {string} token - HEX token/reset token
   * @param {Object} req - Express Request Object
   * @returns {Promise.<null, Error>} Rejects with an error if there is something wrong with the email
   * @todo Make this look cleaner
   */
  sendResetEmail(token, email, req) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        to: email,
        from: 'Texas Tech ACM',
        subject: 'TTU ACM Password Reset',
        html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n</p>\n\n<a>${
          req.protocol
        }://${
          req.headers.host
        }/api/users/reset/${token}</a>\n\n<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>\n`,
      };
      this.smtpTransporter.sendMail(mailOptions, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  /**
   * Send the notification to the user that informtion in their account has changed
   *
   * @param {string} email User's email
   * @returns {Promise.<null, Error>} Rejects with an error if there is something wrong with the email
   */
  sendChangedPasswordEmail(email) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        to: email,
        from: process.env.email_username,
        subject: 'Your password has been changed',
        text:
          'Hello,\n\n'
          + 'This is a confirmation that the password for your account has been changed.\n',
      };
      this.smtpTransporter.sendMail(mailOptions, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  /**
   * Sends email to us from who ever's email was given
   *
   * @param {Object} options - options object
   * @param {string} options.name - student name
   * @param {string} options.email - student email
   * @param {string} options.topic - student topic
   * @param {string} options.message - student message
   *
   * @returns {Promise.<null, Error>}
   */
  contactUs(options) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: options.email,
        to: process.env.email_username,
        subject: 'ACM Question',
        text: `You got a message!\n\nSender: ${options.name}\n\nEmail: ${options.email}\n\nTopic: ${
          options.topic
        }\n\nMessage: ${options.message}\n`,
      };
      this.smtpTransporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve();
      });
    });
  }

  /**
   * Sends a confirmation email to the user with a link/endpoint
   * to verify their email
   *
   * @param {Object} email - User's Email
   * @param {Object} req - Express Request Object
   * @returns {Promise.<null, Error>}
   */
  sendConfirmationEmail(email, token, req) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        to: email,
        from: 'Texas Tech ACM',
        subject: 'Welcome to ACM: TTU',
        html: `<p>Please click on the following link, or paste this into your browser to verify your account:</p>\n\n<a>${
          req.protocol
        }://${
          req.headers.host
        }/api/users/confirm/${token}</a>\n\n<p>If you did not sign up for an account, please ignore this email.</p>\n`,
      };
      this.smtpTransporter.sendMail(mailOptions, (err) => {
        if (err) reject(err);
        resolve();
        console.log(`Email send to ${email}`);
      });
    });
  }
}

exports = EmailController
