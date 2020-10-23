# TimeTac Client Library

TimeTac Client Library is a thin wrapper for client to make api request.

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
  host: 'go-dev.timetac.com',
  account: <ACCOUNT_NAME>,
  version: '3'
}

const authCredentials = {
  grant_type: 'password',
  client_id: 'WEB_APP',
  client_secret: '',
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

- api.oauth
- api.timeTrackings
- api.users
- api.serverCommunication

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
