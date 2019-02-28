(params) => {
  var moment = require('moment-timezone-with-data.js');
  var now = moment();
  api.log(now.toISOString());
  var webhookId = 'transposit-calendar-copy-app-' + now.toISOString().substring(0, 10);
  return webhookId;
  return {
    mission: "complete"
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */