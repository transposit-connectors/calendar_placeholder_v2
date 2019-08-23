(params) => {
  var moment = require('moment-timezone-with-data.js');
  var now = moment();
  var email = api.user().email;

  var userRecord = stash.get(email);
  var eventsCall = api.run("this.get_events_by_synctoken", {syncToken: userRecord.syncToken})[0];

  var bulkOperations = [];
  eventsCall.items.forEach((calEvent) => {
    if (calEvent.status != "cancelled") {
      api.log(moment(calEvent.created).diff(moment(userRecord.lastTime), 'seconds'))
      if (moment(calEvent.created).diff(moment(userRecord.lastTime), 'seconds') > 0) {
        // shortcut to tell us that this event was created since the last time we synced
        bulkOperations.push({operation: "this.copy_calendar_event", parameters: {personalEvent: calEvent}});
      }      
    }
  });

  // Refresh the stash entry
  userRecord.syncToken = eventsCall.nextSyncToken
  userRecord.lastTime = now
  stash.put(email, userRecord);
  api.runBulk(bulkOperations);

  return "done";
}

