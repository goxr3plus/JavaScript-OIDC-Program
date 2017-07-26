# JavaScript-OIDC-Program

In this example i am running https://github.com/mitreid-connect/OpenID-Connect-Java-Spring-Server on localhost using [TomCat](http://tomcat.apache.org/)  So before you run the `openid-connect-server-webapp` you have to change the `server-config.xml` file to point like this -> ``<property name="issuer" value="http://localhost:8080/openid-connect-server-webapp/" />``

I am using Apache Server for localhost and the `index.html` of the code to create `Access_Tokens` , `Refresh_Tokens` for the MitreID OpenIDConnect Server .

![Image](https://user-images.githubusercontent.com/20374208/28618064-adb5d682-720b-11e7-8f78-02d5d004d102.png)
