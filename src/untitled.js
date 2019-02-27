(params) => {
  api.run("gcal_copy.Runner", {airtableEntries: {}, table: "Webhook"}, {asUser: "nina@transposit.com"});
  return {
    mission: "complete"
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */