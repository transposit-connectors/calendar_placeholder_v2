# Calendar Placeholders

This app will duplicate and obfuscate events from your personal calendar to your work calendar, so your coworkers can see that you'll be busy but not any other details. To try it out:

  1. Go to the [hosted app](https://calendar-placeholder-gu6nh.transposit.io/).
  2. Sign in with Google, then authorize with your work and personal calendars
  3. Click "Return to app" 
  4. Click Sync

## How it's built:

When the user clicks "Sync", we set a Watch on their personal calendar and save this information in the [application stash](https://www.transposit.com/docs/building/app-stash/). Every time something on their calendar changes, we are notified at the `webhook` endpoint. When this happens, we check their calendar for any new events created. For these new events, we create an event named "busy" with the same start and end times into the user's work calendar. The google calendar Watch expires every 7 days, so we have a [scheduled task] (https://console.transposit.com/t/transposit-sample/calendar_placeholder/deploy/scheduled) that runs weekly to refresh it.

If the user presses "UnSync", we stop watching their calendar and remove their entry from the stash.

## To make this app your own:
  1. Fork it!
  2. Verify your new app by following the steps in **Deploy > Site Verification** 
  3. Copy the webhook url for the `webhook` operation in **Deploy > Endpoints** and paste it into the 'address' field in the `setup_webhook` operation in **Code**




