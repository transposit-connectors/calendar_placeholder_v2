(params) => {
  // Returns the object if it exists
  return stash.get(api.user().email);
}