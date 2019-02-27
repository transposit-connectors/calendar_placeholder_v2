(params) => {
  var allEntries = api.run("this.AirtableAction", {action: "GET_ALL"});

  api.log(allEntries);
  var email = api.user().email;
  
  var entriesMap = {};
  var recordId;
  allEntries.forEach((entry) => {
    if (entry.fields.email == email) {
      recordId = entry.id;
    }
  });
 
 
  return recordId
}