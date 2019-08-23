(params) => {
  var email = api.user().email;
  var record = stash.get(email);
  api.log(record);
  
  return api.run("personal_google_calendar.stop_channel", {$body: {resourceId: record.googleResourceId, id: record.webhookId}});
  
  stash.put(email, null);

  return {
    mission: "complete"
  };
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */