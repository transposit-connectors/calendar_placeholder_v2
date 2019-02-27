(params) => {
  var baseId = "appb2uc6fso2uEzDh"
  var table = "Webhook"
  
  var operation = "";
  var airtableParams = {baseId: baseId, table: table}
  
  if (params.action == "GET") {
    operation = "airtable.get_record";
    airtableParams.recordId = params.recordId;
  }
  else if (params.action == "GET_ALL") {
    var sqlQuery = "SELECT id, fields FROM airtable.get_records WHERE baseId='" + baseId + "' AND table='" + table + "' AND fields.email != ''";
    return api.query(sqlQuery);
    
  }
  else if (params.action == "CREATE") {
    operation = "airtable.create_record";
    airtableParams["$body.fields"] = params.fields
  } else if (params.action == "UPDATE") {
    operation = "airtable.update_record";
    airtableParams["$body.fields"] = params.fields;
    airtableParams["recordId"] = params.recordId;
  }
  else if (params.action === "DELETE") {
    operation = "airtable.delete_record";
    airtableParams.recordId = params.recordId;
  } else {
    throw new Error("Unknown action");
  }
  
  return api.run(operation, airtableParams);
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */