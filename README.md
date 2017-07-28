# JavaScript-OIDC-Program
You want to connect to your OpenIDConnect Server to debug it? 

*Create new clients ? 

*Create access and refresh tokens ?

Well here you are :) You can use this simple JavaScript Application just configure 2-3 settings from the user interface and voila.

Also you can load your own configuration as a JSON file. An example is shown below.

# Try it online 
http://snf-761523.vm.okeanos.grnet.gr/jsApp/index.html#

# Example Configuration File you can use (JSON Format)

```
{
   "authority": "http://localhost:8080/openid-connect-server-webapp",
   "client_id": "client",
   "client_secret": "secret ",
   "response_type": "code id_token token",
   "scope": "openid profile email offline_access"
}
```

![Image](https://user-images.githubusercontent.com/20374208/28626454-b31ac4ea-7227-11e7-9f45-649734e3422f.png)
