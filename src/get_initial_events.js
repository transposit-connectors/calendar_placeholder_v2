(params) => {
  var now = new Date();
  var operationParams = {calendarId: 'primary',
                        showDeleted: false,
                        timeMin: now,
						q: "blah random query we only need the sync token",
                        maxResults: 1};
  // we're not going to do anything with the calendar events
  return api.run("personal_google_calendar.get_calendar_events", operationParams);
}
