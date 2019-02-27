({ http_event }) => {
  try {
    api.log(http_event);
    var googleResourceId = http_event.headers["X-Goog-Resource-ID"];
    api.log("google resource id: " + googleResourceId);

    var userEmail;
    // find all airtable entries and run as user
    var entriesMap = api.run("gcal_copy.GetAirtableEntriesMap", {table: "Webhook"})[0];
    Object.keys(entriesMap).forEach((email) => {
      if (entriesMap[email].googleResourceId === googleResourceId) {
        userEmail = email;
      }
    });
    api.log(entriesMap);
    api.log("user email: " + userEmail);
    
    

    api.run("gcal_copy.Runner", {airtableEntries: entriesMap, table: "Webhook"}, {asUser: userEmail});
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