 // Clear all the fields -->
 $("#authority").val('');
 //$("#api-call-text-field").val('');

 $("#client_id").val('');
 $("#client_secret").val('');


 //Disable the Buttons by default show the user has to choose a File to Login 
 $('.js-login').prop("disabled", true);
 $('.js-call-api').prop("disabled", true);
 $('.js-logout').prop("disabled", true);

 //document.getElementById("invisible-div").style.display = "none";


 //<!----------------------------------- File API------------------------------->

 // Check for the various File API support.
 if (window.File && window.FileReader && window.FileList && window.Blob) {
     // Great success! All the File APIs are supported.
 } else {
     alert('The File APIs are not fully supported in this browser.');
 }


 function readSingleFile(e) {
     var file = e.target.files[0];
     if (!file) {
         return;
     }
     var reader = new FileReader();
     reader.onload = function (e) {
         var contents = e.target.result;
         displayContents(contents);
     };
     reader.readAsText(file);
 }

 //This method displays the contents of the file
 function displayContents(contents) {
     $('#file-content').text(contents);
     var json = JSON.parse(contents);
     //console.log(typeof contents);

     //Clear all the fields
     $("#authority").val(json.authority);
     $("#client_id").val(json.client_id);
     $("#client_secret").val(json.client_secret);
     $("#response_type").selectpicker('val', json.response_type.split(" "));
     $("#scopes").selectpicker('val', json.scope.split(" "));

     updateManager();

     //Enable all the buttons and show the div
     $('.js-login').prop("disabled", false);
     $('.js-call-api').prop("disabled", false);
     $('.js-logout').prop("disabled", false);

     //document.getElementById("invisible-div").style.display = "block";

 }

 // document.getElementById('file-input')
 //     .addEventListener('change', readSingleFile, false);

 //<!----------------------------------- END OF File API------------------------------->

 var settings, manager, user;

 //-----------------Refresh the Manager every time below text fields text is changing---------------------------
 $("#request_refresh_token").change(function () {
     if ($(this).is(':checked')) {

         // console.log$("#response_type").val();

         // $("#scopes").selectpicker('val', 'offline_access');
     } else {

         //  $("#scopes").selectpicker('val', 'offline_access');
     }
 });

 $("#api-call-text-field").on('keyup', function (e) {
     if (e.keyCode == 13) {
         callApi();
     }
 });

 $('#authority').on('input', function () {
     updateManager();
 });

 $('#client_secret').on('input', function () {
     updateManager();
 });

 $('#client_id').on('input', function () {
     updateManager();
 });

 $('#api-select-picker').on('changed.bs.select', function (e) {

     //Value to be set
     var value = $(this).val().toString();

     //Set the text and focus the text field
     $("#api-call-text-field").val(value);
     $("#api-call-text-field").focus();


     //Select a range of text
     if (value.indexOf("{id}") >= 0)
         document.getElementById("api-call-text-field").setSelectionRange(value.length - 4, value.length);

 });

 $('#HTTP_METHOD').on('changed.bs.select', function (e) {

     //Value to be set
     var value = $(this).val().toString();

     //console.log(value);
 });



 //------------------------------------

 $('.js-login').on('click', function () {
     console.log("Loggin Button pressed");
     manager.signinPopup().catch(function (error) {
         console.error('error while logging in through the popup', error);
     });
 });


 $('.js-call-api').on('click', function () {
     callApi();
 });


 $('.js-logout').on('click', function () {
     manager.signoutRedirect().catch(function (error) {
         console.error('error while signing out user', error);
     });
 });




 //================== METHODS==================================

 function callApi() {
     var headers = {};
     if (user && user.access_token) {
         headers['Authorization'] = 'Bearer ' + user.access_token;
     }

     $.ajax({
         url: $("#authority").val() + "/api/" + $("#api-call-text-field").val(),
         method: $("#HTTP_METHOD").val(),
         dataType: 'json',
         crossDomain: true,
         headers: headers
     }).then(function (data) {
         display('.js-api-result', data);
     }).catch(function (error) {
         display('.js-api-result', {
             status: error.status,
             statusText: error.statusText,
             response: error.responseJSON
         });
     });
 }



 //Update the manager with new information
 function updateManager() {

     settings = {
         authority: $("#authority").val(),
         client_id: $("#client_id").val(),
         client_secret: $("#client_secret").val(),
         user_id: "user",
         popup_redirect_uri: 'http://localhost/jsApp/popup.html',
         silent_redirect_uri: 'http://localhost/jsApp/silent-renew.html',
         post_logout_redirect_uri: 'http://localhost/jsApp/index.html',

         response_type: $("#response_type").val().toString().replace(/,/g, ' '),
         scope: $("#scopes").val().toString().replace(/,/g, ' '),

         filterProtocolClaims: false
     };

     manager = new Oidc.UserManager(settings);

     Oidc.Log.logger = console;

     manager.events.addUserLoaded(function (loadedUser) {
         user = loadedUser;
         display('.js-user', user);
     });

     manager.events.addSilentRenewError(function (error) {
         console.error('error while renewing the access token', error);
     });

     manager.events.addUserSignedOut(function () {
         alert('The user has signed out');
     });

 }

 // helper function to show data to the user
 function display(selector, data) {
     if (data && typeof data === 'string') {
         data = JSON.parse(data);
     }
     if (data) {
         data = JSON.stringify(data, null, 2);
     }

     $(selector).fadeOut("fast", function () {
         $(selector).text(data).fadeIn("fast");
     });
 }

 //When script has been loaded we need to Update the Manager by default
 updateManager();
