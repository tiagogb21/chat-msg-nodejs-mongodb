import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { SentMessageInfo } from "nodemailer/lib/smtp-transport";

export default class EmailService {
  private readonly transporter: nodemailer.Transporter<SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "seuemail@gmail.com",
        pass: "suasenha",
      },
    });
  }

  async sendConfirmationEmail(userEmail: string) {
    const confirmationToken = uuidv4();

    const confirmationLink = `https://localhost:8080.com/confirmar?token=${confirmationToken}`;

    const mailOptions = {
      from: "seuemail@gmail.com",
      to: userEmail,
      subject: "Confirme seu cadastro",
      text: `Clique no link abaixo para confirmar seu cadastro:\n${confirmationLink}`,
    };

    const sendMail = await this.transporter.sendMail(mailOptions);
    console.log(sendMail);

    sendMail;

    return confirmationToken;
  }
}
