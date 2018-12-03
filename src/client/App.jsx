import React from 'react'
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

const App = ({ history }) => (
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

App.propTypes = {
  history: PropTypes.shape({}),
}

export default App
