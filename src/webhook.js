({ http_event }) => {
  try {
    api.log(http_event);
    var googleResourceId = http_event.headers["X-Goog-Resource-ID"];
    api.log("google resource id: " + googleResourceId);

    var userEmail;
    var userEntry;
    // find all airtable entries and run as user
    var allEntries = api.run("this.AirtableAction", {action: "GET_ALL"});
    allEntries.forEach((entry) => {
      if (entry.fields.googleResourceId == googleResourceId) {
		userEmail = entry.fields.email;
        userEntry = entry.fields;
        userEntry.recordID = entry.id;
      }
    });
    

    api.log(entriesMap);
    api.log("user email: " + userEmail);
    
    

    api.run("this.Runner", {userRcord: userEntry}, {asUser: userEmail});
  } catch (err) {
    api.log(err);
  }
  return {
    status_code: 200,
    headers: { "Content-Type": "text/plain" },
    body: "Done"
  };
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/building/webhooks
 */