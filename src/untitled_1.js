(params) => {
  var moment = require('moment-timezone-with-data.js');
  var now = moment();
  api.log(now);
  return {
    mission: "complete"
  };
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */