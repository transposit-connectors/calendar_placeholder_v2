(params) => {
  try {
  	var webhookId = env.get("webhookId");
    var users = stash.listKeys();

  	return api.runForAllUsers("this.setup_webhook", {webhookId: webhookId}, {users: users});
  } catch (err) {
    // We'll error if the webhook doesn't need to be refreshed
    api.log("Error: " + err.message);
  }
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */