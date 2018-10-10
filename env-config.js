const shell = require('child_process').exec
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

shell('clear')
console.log('Thank You for contributing to ACM!')
console.log('We will begin by setting up the environment variables')
console.log('')
console.log('For email username and password, I recomment going to etherial.mail')
console.log('')
console.log('Skip the clientID and secrets\n')

// Map of all the services and their environment variables
const SERVICES = new Map([
  ['environment', ['env']],
  [
    'auth', [
      'session_secret',
      'db',
      'google_clientid',
      'google_client_secret',
      'gcalapikey',
      'github_clientid',
      'github_client_secret',
      'facebook_clientid',
      'facebook_client_secret',
    ],
  ],
  [
    'email', [
      'email_username',
      'email_password',
    ],
  ],
  [
    'profile', [],
  ],
  [
    'events', [],
  ],
  [
    'contacts', [],
  ],
])

function getEnvVaribales(services, name) {
  let choices = 0
  process.stdout.write(`${services[choices]}: `)
  rl.on('line', (line) => {
    if (line === '') {
      console.log('Leaving old value')
    } else if (choices <= services.length) {
      console.log(`firebase functions:config:set ${name}.${services[choices]}=${line}`)
      shell(`firebase functions:config:set ${name}.${services[choices]}=${line}`)
    }

    choices += 1
    if (choices >= services.length) {
      console.log('Saving changes...')
      shell('firebase functions:config:get > .runtimeconfig.json')
      console.log('Done!')
      process.exit(0)
    }
    process.stdout.write(`${services[choices]}: `)
  })
}

function setup() {
  return new Promise((resolve) => {
    rl.question('What environment would you like to set up? [dev/prod] ', (ans) => {
      const CHOICES = new Set(['dev', 'prod'])

      if(ans === '') {
        console.log('defaulting to dev')
        shell('firebase functions:config:set environment.env=dev')
      } else if (!CHOICES.has(ans)) {
        console.log('Invalid Option. You must pick either dev or prod')
      } else {
        console.log(`Setting up ${ans} environment...`)
        shell(`firebase functions:config:set environment.env=${ans}`)
        console.log('Success!')
      }
      resolve()
    })
  })
}

function chooseService() {
  rl.question('What service you you like to configure?\n>> ', (ans) => {
    console.log(ans)
    if(ans === '') {
      process.exit(0)
    } else if(!SERVICES.has(ans)) {
      console.log(`Sorry, we do not support ${ans} at the moment`)
    } else {
      console.log(`Setting up variables for ${ans} service`)
      const envVars = SERVICES.get(ans)
      getEnvVaribales(envVars, ans)
    }
  })
}

setup().then(() => {
  chooseService()
})
