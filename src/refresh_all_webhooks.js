(params) => {
  try {
  	var webhookId = 'transposit-calendar-copy-app'
    var userRecords = api.run("this.AirtableAction", {action: "GET_ALL"});
    
    var users = [];
    userRecords.forEach((record) => {
    	users.push(record.fields.email);
    });

    // Only run for users that have airtable entries!
  	var ran = api.runForAllUsers("this.setup_webhook", {webhookId: webhookId}, {users: users});
  } catch (err) {
    // We'll error if the webhook doesn't need to be refreshed
    api.log("Error: " + err.message);
  }
  
  return {
    mission: "complete"
  };
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */