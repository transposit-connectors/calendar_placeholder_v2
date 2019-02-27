(params) => {
  var webhookId = 'transposit-calendar-copy-app';
  var tableName = "Webhook";
  var webhookSetup = api.run("this.setup_webhook", {webhookId: webhookId})[0];
  api.log(webhookSetup);
  var fields = {googleResourceId: webhookSetup.resourceId, webhookId: webhookId};
  
  // creates a record with the sync token
  var recordId = api.run("gcal_copy.InitialSync", {table: tableName})[0];
  api.log("record id")
  api.log(recordId);
  
  api.run("airtable.update_record", {baseId: "appb2uc6fso2uEzDh", 
                                     table: tableName, 
                                     recordId:  recordId, 
                                     "$body.fields": fields});
  return recordId;
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */