(params) => {
  var moment = require('moment-timezone-with-data.js');
  var now = moment();

  var userRecord = params.userRecord;
  var eventsCall = api.run("this.get_events_by_synctoken", {syncToken: userRecord.syncToken})[0];

  var bulkOperations = [];
  eventsCall.items.forEach((calEvent) => {
    api.log(moment(calEvent.created).diff(moment(userRecord.lastTime), 'seconds'))
    if (moment(calEvent.created).diff(moment(userRecord.lastTime), 'seconds') > 0) {
      // shortcut to tell us that this event was created since the last time we synced
      bulkOperations.push({operation: "this.copy_calendar_event", parameters: {personalEvent: calEvent}});
    }
  });

  // Refresh the airtable entry
  bulkOperations.push({operation: "this.AirtableAction", parameters: {action: "UPDATE", recordId: userRecord.recordId, "fields": {syncToken: eventsCall.nextSyncToken, lastTime: now}}});
  api.runBulk(bulkOperations);

  return "done";
}

