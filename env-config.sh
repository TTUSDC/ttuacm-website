#! /bin/bash
clear
echo
echo Thank you for contributing to ACM!
echo We will begin by setting up the environment variables
echo
echo For email username and password, I recommend going to ethereal.mail
echo
echo Skip the clientID and secrets

declare -a env_variables=(
  "session_secret"
  "db"

  "env"

  "email_username"
  "email_password"

  # Google Credentials
  "google_clientid"
  "google_client_secret"

  # Google Calendar API Key
  "gcalapikey"

  # GitHub Credentials
  "github_clientid"
  "github_client_secret"

  # Facebook Credentials
  "facebook_clientid"
  "facebook_client_secret"
)

for i in "${env_variables[@]}"
do
  echo Please enter value for $i
  read VALUE
  if [ -z "$VALUE" ]
  then
    echo Keeping Old Value...
  else
    echo Please wait...
    firebase functions:config:set config.${i}=${VALUE}
  fi
done

echo Here are your current settings
firebase functions:config:get
echo Saving to local environment...
firebase functions:config:get > .runtimeconfig.json
