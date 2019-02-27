(params) => {
  try {
  	var ran = api.runForAllUsers("this.setup_webhook");
  } catch (err) {
    api.log(err);
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