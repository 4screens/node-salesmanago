# node-hubspot

Node.js wrapper for the SALESmanago API

## Installing

npm install salesmanago

## Usage

    var Client = require('salesmanago');

    var client = new Client();

    client.useClientId('CLIENT-ID');
    client.useAPIKey('API-KEY');
    client.useAPISecret('SECRET_API_KEY');

### Contacts

    client.contacts.create(data, cb)

### SALESmanago API

    https://www.salesmanago.pl/marketing-automation/developers.htm

## License

MIT

## Contributors

Pikaj @Pikaj
