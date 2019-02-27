(params) => {
  var webhookId = 'transposit-calendar-copy-app';
  var webhookSetup = api.run("this.setup_webhook", {webhookId: webhookId})[0];
  api.log(webhookSetup);
  var fields = {googleResourceId: webhookSetup.resourceId, webhookId: webhookId};
  
  // Get the sync token
  var initialEvents = api.run("this.get_initial_events")[0];
  var moment = require('moment-timezone-with-data.js');
  var now = moment();
  
  fields.email = api.user().email;
  fields.syncToken = initialEvents.nextSyncToken;
  fields.lastTime = now;
  
  // Create record
  var record = api.run("this.AirtableAction", {action: "CREATE", fields: fields});

  return record[0].id;
}