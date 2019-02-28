(params) => {
  var newEvent = params.personalEvent;
  newEvent.summary = "busy";
  var newEvent = api.run("work_google_calendar.create_calendar_event", {calendarId: 'primary', $body: newEvent});

  return {
    mission: "complete"
  };
}