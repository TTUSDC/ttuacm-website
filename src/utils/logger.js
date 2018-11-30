const Debug = require('debug')

/*
 * Logger for browser with ms diffs
 *
 * To add a setting, create an attribute with the log level as the argument passed to Debug()
 *
 * Go into localStorage and add a debug variable with
 * the log levels as the value, seperated by commas
 *
 * @example
 * debug: dev,error
 */
const logger = {
  log: Debug('info'),
  info: Debug('dev'),
  error: Debug('error'),
}

module.exports = logger
