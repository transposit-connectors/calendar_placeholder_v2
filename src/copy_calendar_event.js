(params) => {
  var newEvent = {summary: "busy", 
                  start: params.personalEvent.start, 
                  end: params.personalEvent.end,
                  reminders: {useDefault : false}};
   return api.run("work_google_calendar.create_calendar_event", {calendarId: 'primary', $body: newEvent});
}