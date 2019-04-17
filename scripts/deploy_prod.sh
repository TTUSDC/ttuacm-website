if [[ ${CIRCLE_BRANCH} == "master" ]]; then
  mv service_account.production.json service_account.json
  yarn build:client
  ./node_modules/.bin/firebase deploy -P acm-texas-tech-web-app-2 --token=$FIREBASE_DEPLOY_TOKEN
else
  echo Skipping deployment to Production
fi
