import React, { useContext } from 'react'
import axios from 'axios'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { PropTypes } from 'prop-types'
import { Route, Switch } from 'react-router'
import Authentication from 'pages/Authentication/AuthenticationPage.jsx'
import Events from 'pages/Events/EventsPage.jsx'
import Landing from 'pages/Landing/LandingPage.jsx'
import AboutUs from 'pages/AboutUs/AboutUsPage.jsx'
import ContactUs from 'pages/ContactUs/ContactUsPage.jsx'
import Teams from 'pages/Teams/TeamsPage.jsx'
import NotFound from 'pages/NotFound/NotFoundPage.jsx'
import NavBar from 'pages/NavBar/NavBar.jsx'
import Footer from 'pages/Footer/Footer.jsx'
import { ConnectionString } from 'context/ConnectionStringContext'
import MaintenanceScreen from 'MaintenanceScreen.jsx'
import useEnvironment from 'hooks/useEnvironment'
import firebase from 'firebase'

const Main = ({ history }) => (
  <React.Fragment>
    <NavBar />
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/auth' component={Authentication} />
        <Route path='/about' component={AboutUs} />
        <Route path='/contact' component={ContactUs} />
        <Route path='/teams' component={Teams} />
        <Route path='/events' component={Events} />
        <Route component={NotFound} />
      </Switch>
    </ConnectedRouter>
    <Footer />
  </React.Fragment>
)

const App = ({ history }) => {
  const connectionString = useContext(ConnectionString)
  const [env, err] = useEnvironment(connectionString)
  axios.get(`${connectionString}/environment`).then(({ data: env }) => {
    const config = {
      apiKey: env.firebase.api_key,
      authDomain: env.firebase.auth_domain,
      databaseURL: env.firebase.database_url,
      projectId: env.firebase.project_id,
      storageBucket: env.firebase.storage_bucket,
      messagingSenderId: env.firebase.message_sender_id,
    }

    if (firebase.apps.length === 0) firebase.initializeApp(config)
  })


  if (process.env.NODE_ENV === 'development') {
    // Changes this is you want to see the MaintenanceScreen
    return <Main history={history} />
  }
  if (err) {
    return <MaintenanceScreen />
  } if (env.maintainance !== 'true') {
    return <Main history={history} />
  }
  return <MaintenanceScreen />
}

App.propTypes = {
  history: PropTypes.shape({}),
}

Main.propTypes = {
  history: PropTypes.shape({}),
}

export default App
