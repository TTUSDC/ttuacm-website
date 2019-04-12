if [[ ${CIRCLE_BRANCH} == "master" ]]; then
  yarn build:client
  firebase deploy -P acm-texas-tech-web-app-2 --token=$FIREBASE_DEPLOY_TOKEN
else
  echo Skipping deployment to Production
fi
