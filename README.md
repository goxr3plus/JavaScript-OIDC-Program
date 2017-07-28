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

![2](https://user-images.githubusercontent.com/20374208/28716667-197f84fc-73a7-11e7-866f-c5f7c34c6890.png)
