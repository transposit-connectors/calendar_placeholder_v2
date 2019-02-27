(params) => {
  var record = api.run("airtable.get_record", {baseId: "appb2uc6fso2uEzDh", table: "Webhook", recordId: params.recordId})[0];
  api.log(record);
  api.run("this.StopWatch", {resourceId: record.fields.googleResourceId, webhookId: record.fields.webhookId});
  api.run("gcal_copy.UnSync", {recordId: params.recordId, table: "Webhook"});
  return {
    mission: "complete"
  };
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */