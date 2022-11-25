const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/default");
class Mailer extends helper.Mail {
  constructor({ email, name }, content) {
    super();
    this.sgApi = sendgrid(keys.sendgridKey);
    this.from_email = new helper.Email("cstg2019@gmail.com");
    //this.uuid = uuid;
    this.recipients = new helper.Email(email);
    this.subject = name;
    this.body = new helper.Content("text/html", content);
    //this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); // built-in
    this.addClickTracking();
    this.addRecipients();
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    // this.recipients.forEach((recipient) => {
    //   personalize.addTo(recipient);
    // });
    personalize.addTo(this.recipients);
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(),
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
