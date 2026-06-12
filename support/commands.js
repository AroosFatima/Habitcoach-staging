import mailSlurpCred from '../mailSlurpCred.json';
const { default: MailSlurp } = require('mailslurp-client');


require('@4tw/cypress-drag-drop');


const apiKey = mailSlurpCred.API_KEY;
  
const mailslurp = new MailSlurp({ apiKey });


Cypress.Commands.add("clearInbox", (inboxId) => {
  return mailslurp.emptyInbox(inboxId);
});

Cypress.Commands.add(
  "waitForLatestEmail",
  (inboxId, timeout = 30_000, unread = true) => {
    return mailslurp.waitForLatestEmail(inboxId, timeout, unread);
  }
);

Cypress.Commands.add("getEmailLink", (emailId) => {
  return mailslurp.emailController.getEmailLinks({
    emailId: emailId,
  });
});


