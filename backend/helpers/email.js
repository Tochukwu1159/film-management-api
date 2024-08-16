import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

function buildEmailTemplate(username, link) {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Welcome to Bottle Up!</title>
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        background-color: #E0F2F1;
        font-family: Arial, sans-serif;
      }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      td {
        padding: 15px;
      }
      .header {
        background-color: #004D40;
        color: #FFFFFF;
        padding: 10px 0;
      }
      .content {
        padding: 20px;
        margin-top: 20px;
      }
      .cta {
        text-align: center;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #004D40;
        color: #FFFFFF;
        text-decoration: none;
        font-weight: bold;
      }
      .footer {
        text-align: center;
        color: #000000;
        padding: 10px 0;
      }
    </style>
  </head>
  <body>
    <table border="0">
      <tr>
        <td class="header">
          <h1>Welcome to Bottle Up!</h1>
        </td>
      </tr>
      <tr>
        <td class="content">
          Hi ${username},<br><br>
          Welcome to Bottle Up! We're thrilled to have you join our mission to make the world a cleaner place.  
          Your account has been successfully created, and you're now ready to start earning rewards by collecting and submitting empty bottles. Here's how you can get started:
          <ul>
            <li>Track and record the number of empty bottles you collect.</li>
            <li>Submit your bottles through our platform to earn rewards.</li>
            <li>Keep an eye out for updates and special offers!</li>
          </ul>
          Click the button below to log in and start making a difference!
        </td>
      </tr>
      <tr>
        <td class="cta">
          <a href="${link}" class="button">Login Now</a>
        </td>
      </tr>
      <tr>
        <td class="footer">
          Thank you for joining Bottle Up! Together, we can make a positive impact on our environment. If you have any questions or need assistance, please feel free to reach out to us.  <br><br>
          Sincerely,  <br>
          The Bottle Up Team
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

function buildResetEmailTemplate(username, url) {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Password Reset Request</title>
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        background-color: #E0F2F1;
        font-family: Arial, sans-serif;
      }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      td {
        padding: 15px;
      }
      .header {
        background-color: #004D40;
        color: #FFFFFF;
        padding: 10px 0;
      }
      .content {
        padding: 20px;
        margin-top: 20px;
      }
      .cta {
        text-align: center;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #004D40;
        color: #FFFFFF;
        text-decoration: none;
        font-weight: bold;
      }
      .footer {
        text-align: center;
        color: #000000;
        padding: 10px 0;
      }
    </style>
  </head>
  <body>
    <table border="0">
      <tr>
        <td class="header">
          <h1>Password Reset Request</h1>
        </td>
      </tr>
      <tr>
        <td class="content">
          Hi ${username},<br><br>
          You are receiving this email because you (or someone else) has requested a password reset for your Bottle Up account. Please click on the button below to reset your password:
        </td>
      </tr>
      <tr>
        <td class="cta">
          <a href="${url}" class="button">Reset Password</a>
        </td>
      </tr>
      <tr>
        <td class="content">
          If you did not request a password reset, please ignore this email and your password will remain unchanged.
        </td>
      </tr>
      <tr>
        <td class="footer">
          Sincerely,  <br>
          The Bottle Up Team
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export function buildResetEmail(email, username, url) {
  const message = `
      You are receiving this email because you (or someone else) has requested a password reset for your Bottle Up account.
      \n
      Please click on the following link to reset your password:
      ${url}
      \n
      If you did not request a password reset, please ignore this email and your password will remain unchanged.
    `;
  const htmlMessage = buildResetEmailTemplate(username, url);

  return {
    from: '"Bottle Up" <teambottleupinnovation@gmail.com>',
    to: email,
    subject: "Password Reset Request",
    text: message,
    html: htmlMessage,
  };
}

export function buildSignupEmail(email) {
  const message = `
      Welcome to Bottle Up, where every bottle counts!
      \n
      Start earning rewards by collecting and submitting empty bottles. 
    `;
  const htmlMessage = buildEmailTemplate(email, "https://bottleup.com");

  return {
    from: '"Bottle Up" <teambottleupinnovation@gmail.com>',
    to: email,
    subject: "Welcome to Bottle Up!",
    text: message,
    html: htmlMessage,
  };
}

export function buildTestEmail(email) {
  const message = `
      This is a test email
      \n
      Welcome to Bottle Up
    `;
  const htmlMessage = buildEmailTemplate("User", "https://your-test-page-link.com");

  return {
    from: '"Bottle Up" <teambottleupinnovation@gmail.com>',
    to: email,
    subject: "Test Email",
    text: message,
    html: htmlMessage,
  };
}

const projectEmail = process.env.PROJECT_EMAIL;
const projectEmailPassword = process.env.PROJECT_EMAIL_PASSWORD;

if (!projectEmail || !projectEmailPassword) {
  throw new Error("PROJECT_EMAIL and PROJECT_EMAIL_PASSWORD must be defined in the environment variables");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: projectEmail,
    pass: projectEmailPassword,
  },
});

export default transporter;
