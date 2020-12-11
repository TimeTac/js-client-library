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
  version: '3'
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
- [] [absenceBanRestrictToDepartments](https://api.timetac.com/doc/v3#tag/absenceBanRestrictToDepartments)
- [] [absenceBanRestrictToTypes](https://api.timetac.com/doc/v3#tag/absenceBanRestrictToTypes)
- [] [absenceBans](https://api.timetac.com/doc/v3#tag/absenceBans)
- [x] [absenceDays](https://api.timetac.com/doc/v3#tag/absenceDays)
- [] [absenceMultistageResponsibilities](https://api.timetac.com/doc/v3#tag/absenceMultistageResponsibilities)
- [] [absenceReplacements](https://api.timetac.com/doc/v3#tag/absenceReplacements)
- [x] [absences](https://api.timetac.com/doc/v3#tag/absences)
- [] [absenceTypes](https://api.timetac.com/doc/v3#tag/absenceTypes)
- [] [absenceTypesRestrictToCountries](https://api.timetac.com/doc/v3#tag/absenceTypesRestrictToCountries)
- [] [accessCredentials](https://api.timetac.com/doc/v3#tag/accessCredentials)
- [] [acDocumentAssignedClients](https://api.timetac.com/doc/v3#tag/acDocumentAssignedClients)
- [] [acDocumentAssignedProjects](https://api.timetac.com/doc/v3#tag/acDocumentAssignedProjects)
- [] [acDocumentAssignedUsers](https://api.timetac.com/doc/v3#tag/acDocumentAssignedUsers)
- [] [acDocumentFiles](https://api.timetac.com/doc/v3#tag/acDocumentFiles)
- [] [acDocumentGroups](https://api.timetac.com/doc/v3#tag/acDocumentGroups)
- [] [acDocumentPositionAttributeValues](https://api.timetac.com/doc/v3#tag/acDocumentPositionAttributeValues)
- [] [acDocumentPositionCategories](https://api.timetac.com/doc/v3#tag/acDocumentPositionCategories)
- [] [acDocumentPositionCategoryAttributeCombos](https://api.timetac.com/doc/v3#tag/acDocumentPositionCategoryAttributeCombos)
- [] [acDocumentPositionCategoryAttributes](https://api.timetac.com/doc/v3#tag/acDocumentPositionCategoryAttributes)
- [] [acDocumentPositionCategoryCategoryAttributes](https://api.timetac.com/doc/v3#tag/acDocumentPositionCategoryCategoryAttributes)
- [] [acDocumentPositions](https://api.timetac.com/doc/v3#tag/acDocumentPositions)
- [] [acDocuments](https://api.timetac.com/doc/v3#tag/acDocuments)
- [] [acDocumentStatus](https://api.timetac.com/doc/v3#tag/acDocumentStatus)
- [] [acDocumentTypes](https://api.timetac.com/doc/v3#tag/acDocumentTypes)
- [] [acPaymentFiles](https://api.timetac.com/doc/v3#tag/acPaymentFiles)
- [] [acPayments](https://api.timetac.com/doc/v3#tag/acPayments)
- [] [acPaymentTypes](https://api.timetac.com/doc/v3#tag/acPaymentTypes)
- [] [acSuppliers](https://api.timetac.com/doc/v3#tag/acSuppliers)
- [] [acTaxrates](https://api.timetac.com/doc/v3#tag/acTaxrates)
- [] [changeTimeTrackingRequests](https://api.timetac.com/doc/v3#tag/changeTimeTrackingRequests)
- [] [checkpoints](https://api.timetac.com/doc/v3#tag/checkpoints)
- [] [checkpointTrackings](https://api.timetac.com/doc/v3#tag/checkpointTrackings)
- [] [clients](https://api.timetac.com/doc/v3#tag/clients)
- [] [countries](https://api.timetac.com/doc/v3#tag/countries)
- [] [currencies](https://api.timetac.com/doc/v3#tag/currencies)
- [] [currencyRates](https://api.timetac.com/doc/v3#tag/currencyRates)
- [x] [deltaSync](https://api.timetac.com/doc/v3#tag/deltaSync)
- [x] [departments](https://api.timetac.com/doc/v3#tag/departments)
- [x] [favouriteTasks](https://api.timetac.com/doc/v3#tag/favouriteTasks)
- [] [fileInfo](https://api.timetac.com/doc/v3#tag/fileInfo)
- [] [files](https://api.timetac.com/doc/v3#tag/files)
- [] [generalSettingsChangeLog](https://api.timetac.com/doc/v3#tag/generalSettingsChangeLog)
- [x] [generalSettings](https://api.timetac.com/doc/v3#tag/generalSettings)
- [] [geofences](https://api.timetac.com/doc/v3#tag/geofences)
- [] [geofenceToNodes](https://api.timetac.com/doc/v3#tag/geofenceToNodes)
- [] [invoices](https://api.timetac.com/doc/v3#tag/invoices)
- [] [JobParams](https://api.timetac.com/doc/v3#tag/JobParams)
- [] [JobQueues](https://api.timetac.com/doc/v3#tag/JobQueues)
- [] [legalDocumentAcceptanceLog](https://api.timetac.com/doc/v3#tag/legalDocumentAcceptanceLog)
- [] [legalDocuments](https://api.timetac.com/doc/v3#tag/legalDocuments)
- [] [legalDocumentTypes](https://api.timetac.com/doc/v3#tag/legalDocumentTypes)
- [] [messages](https://api.timetac.com/doc/v3#tag/messages)
- [] [multiuserToTasks](https://api.timetac.com/doc/v3#tag/multiuserToTasks)
- [] [multiuserToUsers](https://api.timetac.com/doc/v3#tag/multiuserToUsers)
- [] [nfcTransponder](https://api.timetac.com/doc/v3#tag/nfcTransponder)
- [] [nfcTransponders](https://api.timetac.com/doc/v3#tag/nfcTransponders)
- [] [nodesToUsers](https://api.timetac.com/doc/v3#tag/nodesToUsers)
- [] [notifications](https://api.timetac.com/doc/v3#tag/notifications)
- [] [notificationsTypeHtml](https://api.timetac.com/doc/v3#tag/notificationsTypeHtml)
- [] [notificationUrls](https://api.timetac.com/doc/v3#tag/notificationUrls)
- [] [offlineSyncError](https://api.timetac.com/doc/v3#tag/offlineSyncError)
- [] [offlineSyncErrors](https://api.timetac.com/doc/v3#tag/offlineSyncErrors)
- [] [permissionResolveAbsenceTypesAndUsers](https://api.timetac.com/doc/v3#tag/permissionResolveAbsenceTypesAndUsers)
- [] [permissionResolveDepartments](https://api.timetac.com/doc/v3#tag/permissionResolveDepartments)
- [] [permissionResolveHolidayRequests](https://api.timetac.com/doc/v3#tag/permissionResolveHolidayRequests)
- [] [permissionResolveOauthClients](https://api.timetac.com/doc/v3#tag/permissionResolveOauthClients)
- [] [permissionResolveQuestions](https://api.timetac.com/doc/v3#tag/permissionResolveQuestions)
- [] [permissionResolveTeams](https://api.timetac.com/doc/v3#tag/permissionResolveTeams)
- [] [permissionResolveUsers](https://api.timetac.com/doc/v3#tag/permissionResolveUsers)
- [] [permissions](https://api.timetac.com/doc/v3#tag/permissions)
- [] [permissionScopes](https://api.timetac.com/doc/v3#tag/permissionScopes)
- [x] [projects](https://api.timetac.com/doc/v3#tag/projects)
- [] [publicHolidayTemplates](https://api.timetac.com/doc/v3#tag/PublicHolidayTemplates)
- [x] [recentTasks](https://api.timetac.com/doc/v3#tag/recentTasks)
- [] [salutations](https://api.timetac.com/doc/v3#tag/salutations)
- [] [schedulings](https://api.timetac.com/doc/v3#tag/schedulings)
- [x] [serverCommunication]
- [] [serverEvents](https://api.timetac.com/doc/v3#tag/serverEvents)
- [] [skills](https://api.timetac.com/doc/v3#tag/skills)
- [] [surveyAnswers](https://api.timetac.com/doc/v3#tag/surveyAnswers)
- [] [surveyQuestionDefinitions](https://api.timetac.com/doc/v3#tag/surveyQuestionDefinitions)
- [] [surveyQuestions](https://api.timetac.com/doc/v3#tag/surveyQuestions)
- [] [surveys](https://api.timetac.com/doc/v3#tag/surveys)
- [] [surveySubmits](https://api.timetac.com/doc/v3#tag/surveySubmits)
- [x] [tasks](https://api.timetac.com/doc/v3#tag/tasks)
- [] [teamLeaderAssistants](https://api.timetac.com/doc/v3#tag/teamLeaderAssistants)
- [x] [teamMembers](https://api.timetac.com/doc/v3#tag/teamMembers)
- [x] [teams](https://api.timetac.com/doc/v3#tag/teams)
- [] [teamTypes](https://api.timetac.com/doc/v3#tag/teamTypes)
- [] [timePlannings](https://api.timetac.com/doc/v3#tag/timePlannings)
- [x] [timesheetAccountings](https://api.timetac.com/doc/v3#tag/timesheetAccountings)
- [] [timesheetAccountingSummaries](https://api.timetac.com/doc/v3#tag/timesheetAccountingSummaries)
- [] [timesheetActionLogs](https://api.timetac.com/doc/v3#tag/timesheetActionLogs)
- [] [timeTrackingChangelogs](https://api.timetac.com/doc/v3#tag/timeTrackingChangelogs)
- [x] [timeTrackings](https://api.timetac.com/doc/v3#tag/timeTrackings)
- [] [timezones](https://api.timetac.com/doc/v3#tag/timezones)
- [x] [todoTasks](https://api.timetac.com/doc/v3#tag/todoTasks)
- [] [translations](https://api.timetac.com/doc/v3#tag/translations)
- [] [userDefinedFieldDefinitionOptions](https://api.timetac.com/doc/v3#tag/userDefinedFieldDefinitionOptions)
- [] [userDefinedFieldDefinitions](https://api.timetac.com/doc/v3#tag/userDefinedFieldDefinitions)
- [x] [users](https://api.timetac.com/doc/v3#tag/users)
- [x] [userStatusOverview](https://api.timetac.com/doc/v3#tag/userStatusOverview)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

The shortest, simplest way of running the test suite is the following command:

```bash
yarn test
```

## License

[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
