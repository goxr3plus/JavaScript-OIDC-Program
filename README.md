# JavaScript-OIDC-Program

In this example i am running https://github.com/mitreid-connect/OpenID-Connect-Java-Spring-Server on localhost using [TomCat](http://tomcat.apache.org/)  So before you run the `openid-connect-server-webapp` you have to change the `server-config.xml` file to point like this -> ``<property name="issuer" value="http://localhost:8080/openid-connect-server-webapp/" />``

I am using Apache Server for localhost and the `index.html` of the code to create `Access_Tokens` , `Refresh_Tokens` for the MitreID OpenIDConnect Server .


### You can configurate the settings either by hand or uploading a configuration file in JSON format . It is very simple as shown below.

Check this example [Example JSON Configuration File] ( https://github.com/goxr3plus/JavaScript-OIDC-Program/blob/master/Example%20OpenIDConnect.jSon )

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
