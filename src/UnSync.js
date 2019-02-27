(params) => {
  var record = api.run("this.AirtableAction", {action: "GET", recordId: params.recordId})[0];
  api.log(record);
  api.run("this.StopWatch", {resourceId: record.fields.googleResourceId, webhookId: record.fields.webhookId});
  api.run("this.AirtableAction", {action: "DELETE", recordId: params.recordId});

  return {
    mission: "complete"
  };
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */