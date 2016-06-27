var Client = require('../../node-salesmanago');
var c = Client();
c.useClientId('CLIENT-ID');
c.useAPIKey('API-KEY');
c.useAPISecret('SECRET_API_KEY');
function cb(err,response) {
  console.log("Error:");
  console.log(err);
  console.log("Response:");
  console.log(response);
}
options = { "contact" :
  { "company" : "Benhauer Sp. z o.o. Sp. K.",
     "email" : "konrad-test-1@konri.com",
     "fax" : "+48345543345",
     "name" : "Konrad Test",
     "phone" : "+48123321123",
     "address":{
     "streetAddress":"Brzyczyńska 123",
     "zipCode":"43-305",
     "city":"Bielsko-Biała",
     "country":"PL"
    }
  },
  "owner": "anna.themasters@gmail.com"
 };
c.contacts.create(options,cb);
