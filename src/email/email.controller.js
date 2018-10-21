const nodemailer = require('nodemailer')
const functions = require('firebase-functions')

/**
 * Handles sending emails to students
 */
class EmailController {
  /**
   * Sets the protocol and host for all links in the emails
   *
   * @param {string} protocol protocol of host [http, https]
   * @param {string} host host of host [localhost, acmttu.org]
   */
  constructor(protocol, host) {
    if (!protocol) {
      throw new Error('Did not pass a protocol')
    } else if (!host) {
      throw new Error('Did not pass a host')
    }

    this.protocol = protocol
    this.host = host
    this.mailbox = functions.config().email.email_username || 'v2z435ain366pxsa@ethereal.email'

    if (process.env.NODE_ENV !== 'prod') {
      this.smtpTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'v2z435ain366pxsa@ethereal.email',
          pass: 'g7U7pZp5YAmZ2sMXDb',
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
          user: functions.config().email.email_username,
          pass: functions.config().email.email_password,
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      })
    }
  }

  /**
   * Sends Reset Password email
   *
   * @param {string} email user's email
   * @param {string} token HEX token/reset token
   * @returns {Promise.<null, Error>} Rejects with an error if there is something wrong with the email
   * @todo Make this look cleaner
   */
  sendResetEmail(token, email) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        to: email,
        from: 'Texas Tech ACM',
        subject: 'TTU ACM Password Reset',
        html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n</p>\n\n<a>${
          this.protocol
        }://${
          this.host
        }/api/users/reset/${token}</a>\n\n<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>\n`,
      }
      this.smtpTransporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve()
      })
    })
  }

  /**
   * Send the notification to the user that informtion in their account has changed
   *
   * @param {string} email user's email
   * @returns {Promise.<null, Error>} Rejects with an error if there is something wrong with the email
   */
  sendChangedPasswordEmail(email) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        to: email,
        from: this.mailbox,
        subject: 'Your password has been changed',
        text:
          'Hello,\n\n'
          + 'This is a confirmation that the password for your account has been changed.\n',
      }
      this.smtpTransporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve()
      })
    })
  }

  /**
   * Sends a question to the mailbox
   *
   * @param {Object} options options object
   * @param {string} options.name student name
   * @param {string} options.email student email
   * @param {string} options.topic student topic
   * @param {string} options.message student message
   * @returns {Promise.<null, Error>}
   */
  contactUs(options) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: options.email,
        to: this.mailbox,
        subject: 'ACM Question',
        text: `You got a message!\n\nSender: ${options.name}\n\nEmail: ${options.email}\n\nTopic: ${
          options.topic
        }\n\nMessage: ${options.message}\n`,
      }
      this.smtpTransporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve()
      })
    })
  }

  /**
   * Sends a confirmation email to the user with a link/endpoint
   * and their token to verify their email
   *
   * @param {string} email user's email
   * @param {string} token user's HEX token saved in the auth database
   * @returns {Promise.<null, Error>}
   */
  sendConfirmationEmail(email, token) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        to: email,
        from: 'Texas Tech ACM',
        subject: 'Welcome to ACM: TTU',
        html: `<p>Please click on the following link, or paste this into your browser to verify your account:</p>\n\n<a>${
          this.protocol
        }://${
          this.host
        }/api/users/confirm/${token}</a>\n\n<p>If you did not sign up for an account, please ignore this email.</p>\n`,
      }
      this.smtpTransporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve()
      })
    })
  }
}

module.exports = EmailController
