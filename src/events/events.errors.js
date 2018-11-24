function ListEventsError() {
  const err = new Error('There was an error in listing fetching the events')
  err.code = 500
  return err
}

function FetchOAuthError() {
  const err = new Error('There was an error in fetching the OAuth Provider')
  err.code = 500
  return err
}

module.exports = {
  FetchOAuthError,
  ListEventsError,
}
