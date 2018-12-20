import React, { useContext } from 'react'
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

  if (process.env.NODE_ENV === 'development') {
    // Changes this is you want to see the MaintenanceScreen
    return <Main history={history} />
  }
  const [env, err] = useEnvironment(connectionString)
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
