import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();


function buildEmailTemplate(username, link) {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Welcome to SmartMart!</title>
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        background-color: #FFFFFF;
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
        background-color: #2ECC71;
        color: #FFFFFF;
        padding: 10px 0;
      }
      .content {
        padding: 20px 20px;
        margin-top: 20px;
      }
      .cta {
        text-align: center;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #2ECC71;
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
          <h1>Welcome to SmartMart!</h1>
        </td>
      </tr>
      <tr>
        <td class="content">
          Hi ${username},<br><br>
          Welcome to SmartMart! We're thrilled to have you join our community of happy shoppers.  
          Your account has been successfully created and you can now enjoy all the benefits of shopping with SmartMart, including:
          <ul>
            <li>A wide selection of groceries, food, drugs and household essentials</li>
            <li>Convenient online shopping and delivery</li>
            <li>Exclusive discounts and promotions</li>
          </ul>
          Click the button below to get started!
        </td>
      </tr>
      <tr>
        <td class="cta">
          <a href="${link}" class="button">Login Now</a>
        </td>
      </tr>
      <tr>
        <td class="footer">
          Thanks for choosing SmartMart! We're here to help you make the most of your shopping experience. If you have any questions, please don't hesitate to contact us.  <br><br>
          Sincerely,  <br>
          The SmartMart Team
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
        background-color: #FFFFFF;
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
        background-color: #2ECC71;
        color: #FFFFFF;
        padding: 10px 0;
      }
      .content {
        padding: 20px 20px;
        margin-top: 20px;
      }
      .cta {
        text-align: center;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #2ECC71;
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
          You are receiving this email because you (or someone else) has requested a password reset for your account. Please click on the button below to reset your password:
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
          The SmartMart Team
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
export function buildResetEmail(email,username, url) {
  const message = `
      You are receiving this email because you (or someone else) has requested a password reset for your account.
      \n
      Please click on the following link to reset your password:
      ${url}
      \n
      If you did not request a password reset, please ignore this email and your password will remain unchanged.
    `;
  const htmlMessage = buildResetEmailTemplate(username, url);

  return {
    from: '"Smart Mart" <xshopsmart@gmail.com>',
    to: email,
    subject: "Password Reset Request",
    text: message,
    html: htmlMessage,
  };
}

export function buildSignupEmail(email, username) {
  const message = `
      Welcome to Smart Mart, the best way to shop smart.
      \n
      
      Smart Mart connects customers to different stores for easy shopping experience.
    `;
  const htmlMessage = buildEmailTemplate(username, "https://smartmartng.com");

  return {
    from: '"Smart Mart" <xshopsmart@gmail.com>',
    to: email,
    subject: "Welcome to Smart Mart",
    text: message,
    html: htmlMessage,
  };
}

export function buildTestEmail(email) {
  const message = `
      This is a test email
      \n
      
      Welcome to Smart Mart
    `;
  const htmlMessage = buildEmailTemplate("User", "https://your-test-page-link.com");

  return {
    from: '"Smart Mart" <xshopsmart@gmail.com>',
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
