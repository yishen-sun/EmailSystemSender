const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/surveyTemplate");
const userTable = require("../models/index");
const _ = require("lodash");

module.exports = (app) => {
  app.post("/api/send", async (req, res) => {
    const { title, name, email, body } = req.body;
    console.log(title, name, email, body);
    // new instance
    userTable
      .create({
        uuid: title + Date.now(),
        name: name,
        email: email,
        body: body,
      })
      .then(function (p) {
        console.log("created." + JSON.stringify(p));
      })
      .catch(function (err) {
        console.log("failed: " + err);
      });

    const survey = {
      uuid: title + Date.now(),
      name: name,
      email: email,
      body: body,
    };
    // send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      res.send(survey);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
