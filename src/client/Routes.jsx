import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import AuthRoute from 'components/AuthRoute'

import {
  AuthenticationPage,
  AboutUsPage,
  LandingPage,
  TeamsPage,
  EventsPage,
  NotFoundPage,
  VerifyEmailPage,
} from 'pages'

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/home' />} />
      <Route path='/home' component={LandingPage} />
      <AuthRoute path='/auth' component={AuthenticationPage} />
      <Route path='/about' component={AboutUsPage} />
      <Route path='/teams' component={TeamsPage} />
      <Route path='/events' component={EventsPage} />
      <Route path='/verify' component={VerifyEmailPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}

export const mainRoutes = {
  '/home': ['/home', 'Home'],
  '/about': ['/about', 'About Us'],
  '/events': ['/events', 'Events'],
  '/teams': ['/teams', 'Club'],
}
