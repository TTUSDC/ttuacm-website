if [ $TRAVIS_BRANCH == 'master' ]
then
  echo Setting up firebase config for production
  sudo cp src/client/firebase_config.production.json src/client/firebase_config.json
elif [ $TRAVIS_BRANCH == 'next' ]
then
  echo Setting up firebase config for staging
  sudo cp src/client/firebase_config.staging.json src/client/firebase_config.json
else
  echo Not setting up firebase
fi