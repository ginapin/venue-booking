// Load the API client and auth2 library
gapi.load('client:auth2', initClient);

function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyD2mx-zwA7E8oZO772GcELsB-XmoKGzH-A',
        clientId: '885426849869-2bf14igjfbnihvq2vvcr3o5q0kp4anbg.apps.googleusercontent.com',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar.readonly"
    }).then(function () {
        listUpcomingEvents();
    }, function(error) {
        console.log(JSON.stringify(error, null, 2));
    });
}

function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary', // Use your Google Calendar ID
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;
        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime || event.start.date;
                console.log(event.summary + ' (' + when + ')');
            }
        } else {
            console.log('No upcoming events found.');
        }
    });
}
