(params) => {
  try {
    var moment = require('moment-timezone-with-data.js');
 	var now = moment();
  	var webhookId = 'transposit-calendar-copy-app-' + now.toISOString().substring(0, 10);
    
  	var ran = api.runForAllUsers("this.setup_webhook", {webhookId: webhookId});
  } catch (err) {
    api.log("Error: " + err.message);
  }
  api.log(ran);
  return {
    mission: "complete"
  };
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */