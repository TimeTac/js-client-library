# TimeTac Client Library

TimeTac Client Library is a thin wrapper for client to make api request. For more information please visit our [API documentation](https://api.timetac.com/).

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/en/docs/cli/link/) or [npm](https://www.npmjs.com/) to install TimeTac Client Library.

Using yarn:

```bash
yarn add @timetac/js-client-library
```

Using npm:

```bash
npm install @timetac/js-client-library
```

## Usage

```javascript
import Api from "@timetac/js-client-library"
//Only account name is required.
const environment = {
  host: 'go.timetac.com',
  account: <ACCOUNT_NAME>,
  version: '3',
  //Callback, called on refresh of the token. object of access token and refresh {accessToken, refreshTOken}  token are passed as parameter
  onTokenRefreshedCallback: <METHOD>,
  //If true, it tries to refresh token on failed request
  autoRefreshToken: <BOOLEAN>
}

const authCredentials = {
  grant_type: 'password',
  client_id: <CLIENT_ID>,
  client_secret: <CLIENT_SECRET>,
  username: <USER_NAME>,
  password: <PASSWORD>
}

const api = new Api(environment);

async() => {
  await api.authentication.login(authCredentials);

  api.timeTrackings.read()
    .then(timetrackings => {
      console.log(timetrackings)
    });

  api.users.getMe().then(meData => {
    console.log(meData);
  });

  api.absenceDays.read(
    new RequestParams<AbsenceDay>()
    .eq('user_id', '1')
    .gteq('date', '2020-01-01')
  );

  api.absenceDay.read({
    user_id: '1',
    date: '2020-01-01',
    _op__date: 'gteq'
  })
}
```

## List of supported endpoints

- [x] [authentication](https://api.timetac.com/doc/v3#tag/authentication)
- [x] [absenceDays](https://api.timetac.com/doc/v3#tag/absenceDays)
- [ ] absenceBans
- [x] [absences](https://api.timetac.com/doc/v3#tag/absences)
- [ ] absenceMultistageResponsibilities
- [x] [absenceTypes](https://api.timetac.com/doc/v3#tag/absenceTypes)
- [ ] absenceTypesRestrictToCountries
- [ ] accessCredentials
- [ ] changeTimeTrackingRequests
- [ ] checkpoints
- [ ] checkpointTrackings
- [ ] clients
- [ ] countries
- [x] [deltaSync](https://api.timetac.com/doc/v3#tag/deltaSync)
- [x] [departments](https://api.timetac.com/doc/v3#tag/departments)
- [ ] files
- [ ] generalSettingsChangeLog
- [x] [generalSettings](https://api.timetac.com/doc/v3#tag/generalSettings)
- [ ] geofences
- [ ] geofenceToNodes
- [ ] invoices
- [ ] jobParams
- [ ] jobQueues
- [ ] messages
- [ ] nfcTransponders
- [ ] notifications
- [ ] notificationsTypeHtml
- [ ] notificationUrls
- [ ] offlineSyncErrors
- [ ] permissionsRelatedEndpoints
- [x] [projects](https://api.timetac.com/doc/v3#tag/projects)
- [ ] recentTasks
- [ ] salutations
- [ ] schedulings
- [x] [serverCommunication]()
- [ ] serverEvents
- [ ] serverTime
- [ ] skills
- [ ] surveys
- [ ] surveyAnswers
- [ ] surveySubmits
- [ ] surveyQuestions
- [ ] surveyQuestionDefinitions
- [x] [tasks](https://api.timetac.com/doc/v3#tag/tasks)
- [x] [teamMembers](https://api.timetac.com/doc/v3#tag/teamMembers)
- [x] [teams](https://api.timetac.com/doc/v3#tag/teams)
- [x] [timetrackings](https://api.timetac.com/doc/v3#tag/timetrackings)
- [x] [timesheetAccounting](https://api.timetac.com/doc/v3#tag/timesheetAccounting)
- [ ] timesheetAccountingSummaries
- [ ] timetrackingChangelogs
- [ ] timezones
- [ ] todoTasks
- [ ] translations
- [x] [users](https://api.timetac.com/doc/v3#tag/users)
- [x] [userStatusOverview](https://api.timetac.com/doc/v3#tag/userStatusOverview)
- [ ] zohoSubscriptions

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

The shortest, simplest way of running the test suite is the following command:

```bash
yarn test
```

## License

[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
