import nodemailer, { Transporter } from 'nodemailer';
import { resolve } from 'path';
import Handlebars from 'handlebars';
import fs from 'fs';

class SenMAilService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  async execute(to: string, subject: string, body: string) {
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
    const templateFileContent = fs.readFileSync(npsPath).toString('utf8');

    const mailTemplateParse = Handlebars.compile(templateFileContent);

    const html = mailTemplateParse({
      name: to,
      title: subject,
      description: body,
    });

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreplay@nps.com.br>',
    });

    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}

export default new SenMAilService();
