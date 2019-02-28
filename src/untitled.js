(params) => {
  var moment = require('moment-timezone-with-data.js');
  var now = moment();
  
  var userEmail = api.user().email;
  
  var userInfo = params.userRecord;


  var eventsCall = api.run("this.get_events_by_synctoken", {syncToken: userInfo.syncToken})[0];
  api.log(eventsCall);

  var bulkOperations = [];
  eventsCall.items.forEach((calEvent) => {
    api.log(moment(calEvent.created).diff(moment(userInfo.lastTime), 'seconds'))
    if (moment(calEvent.created).diff(moment(userInfo.lastTime), 'seconds') > 0) {
      // shortcut to tell us that this event was just created
      bulkOperations.push({operation: "this.copy_calendar_event", parameters: {personalEvent: calEvent}});
    }
  });
  
  // Refresh the airtable entry
  bulkOperations.push({operation: "this.AirtableAction", parameters: {action: "UPDATE", recordId: userInfo.recordId, "fields": {syncToken: eventsCall.nextSyncToken, lastTime: now}}});
  
  api.log(bulkOperations);
  api.runBulk(bulkOperations);
  
  return "done";
}

