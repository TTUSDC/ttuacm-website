if [[ ${CIRCLE_BRANCH} == "next" ]]; then
  yarn build:client
  ./node_modules/.bin/firebase deploy -P acm-texas-tech-web-app-2-beta --token=$FIREBASE_DEPLOY_TOKEN
else
  echo Skipping deployment to Staging
fi
