({ http_event }) => {
  try {
    api.log(http_event);
    var googleResourceId = http_event.headers["X-Goog-Resource-ID"];

    var userEmail;
    var userEntry;
    // find all airtable entries and run as user
    var allEntries = api.run("this.AirtableAction", {action: "GET_ALL"});
    api.log(allEntries);
    allEntries.forEach((entry) => {
      if (entry.fields.googleResourceId == googleResourceId) {
		userEmail = entry.fields.email;
        userEntry = entry.fields;
        userEntry.recordId = entry.id;
        api.log("found user");
      }
    });
  
    api.run("this.Runner", {userRecord: userEntry}, {asUser: userEmail});
  } catch (err) {
    api.log("We got an error: " + err.message);
    api.log("user email: " + userEmail);
  }
  return {
    status_code: 200,
    headers: { "Content-Type": "text/plain" },
    body: "Done"
  };
}