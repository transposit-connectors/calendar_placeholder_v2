(params) => {
  var moment = require('moment-timezone-with-data.js');
  var now = moment();

  // Get the sync token
  var initialEvents = api.run("this.get_initial_events")[0];
  
  var webhookId = 'transposit-calendar-copy-app'
  var webhookSetup = api.run("this.setup_webhook", {webhookId: webhookId})[0];
  api.log("Setup webhook for " + api.user().email + ", resourceId: " + webhookSetup.resourceId);

  var fields = {googleResourceId: webhookSetup.resourceId, webhookId: webhookId};
  fields.syncToken = initialEvents.nextSyncToken;
  fields.lastTime = now;
  
  stash.put(api.user().email, fields);

  return;
}