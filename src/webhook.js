({ http_event }) => {
  try {
    api.log(http_event);
    var googleResourceId = http_event.headers["X-Goog-Resource-ID"];

    var userEmail;
    var userEntry;
    // find all airtable entries and run as user
    var allEntries = api.run("this.AirtableAction", {action: "GET_ALL"});
    
    var users = stash.listKeys();
    users.forEach(email => {
  	  var maybeUser = stash.get(email);
      if (userEntry.googleResourceId == googleResourceId) {
        userEntry = maybeUser;
        userEmail = email;
      }  
    })
  
    api.run("this.Runner", {userRecord: userEntry}, {asUser: email});
  } catch (err) {
    api.log("We got an error: " + err.message);
    api.log("user email: " + userEmail);
    throw new Error(err.message);
  }
  return {
    status_code: 200,
    headers: { "Content-Type": "text/plain" },
    body: "Done"
  };
}