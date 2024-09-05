// Initialize Google Identity Services
window.onload = function () {
    // Initialize Google Identity Services
    google.accounts.id.initialize({
        client_id: '885426849869-2bf14igjfbnihvq2vvcr3o5q0kp4anbg.apps.googleusercontent.com',  // Replace with your OAuth client ID
        callback: handleCredentialResponse
    });

    google.accounts.id.prompt(); // Show the Google Sign-In prompt
}

// Handle the credential response from Google Sign-In
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    // Use the token to authorize API requests
    authorizeUser(response.credential);
}

// Authorize user and load Google Calendar API
function authorizeUser(token) {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: 'AIzaSyD2mx-zwA7E8oZO772GcELsB-XmoKGzH-A',  // Replace with your API Key
            clientId: '885426849869-2bf14igjfbnihvq2vvcr3o5q0kp4anbg.apps.googleusercontent.com',  // Replace with your OAuth Client ID
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: "https://www.googleapis.com/auth/calendar.readonly",
        }).then(() => {
            // Load the calendar events after successful initialization
            listUpcomingEvents();
        }).catch((error) => {
            console.error('Error initializing Google API client:', error);
        });
    });
}

// Fetch and display upcoming events
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',  // Replace with your calendar ID if needed
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then((response) => {
        var events = response.result.items;
        if (events.length > 0) {
            for (let i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime || event.start.date;
                console.log(event.summary + ' (' + when + ')');
                // Here you can add code to display events on the web page
            }
        } else {
            console.log('No upcoming events found.');
        }
    }).catch((error) => {
        console.error('Error fetching events:', error);
    });
}
