if [[ ${CIRCLE_BRANCH} == "next" ]]; then
  yarn run cypress install
  yarn e2e:ci
else
  echo Skipping Acceptance Test
fi
