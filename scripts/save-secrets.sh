tar cvf secrets.tar service_account.json src/client/firebase_config.json src/api/oauth/credentials.json src/api/oauth/token.json
travis encrypt-file secrets.tar --add

echo "Make sure that you change .travis.yml before commit changes to secrets"
