import React from 'react'
import Profile from 'assets/teams_page/profile.jpg'
import TeamsList from 'components/TeamsList'
import { expect } from 'chai'
import { cleanup } from 'react-testing-library'
import { renderComponent } from './utils'

const teams = [
  {
    name: 'Team Name',
    leader: 'John Doe',
    description: 'Description',
    email: 'name@email.com',
    image: Profile,
    day: ['Thurday'],
    time: '6:30pm - 7:30pm',
  },
]

afterEach(cleanup)

test('should not allow the user to email, (un)subscribe to teams if they are not logged in', () => {
  const { getByTestId } = renderComponent(<TeamsList teams={teams} />)

  const emailButton = getByTestId('email-name@email.com')
  const subButton = getByTestId('sub-name@email.com')
  const unsubButton = getByTestId('unsub-name@email.com')

  expect(emailButton.disabled).to.equal(true)
  expect(subButton.disabled).to.equal(true)
  expect(unsubButton.disabled).to.equal(true)
})

test('should allow the user to email, (un)subscribe to teams if they are logged in', () => {
  const { getByTestId } = renderComponent(<TeamsList teams={teams} />, true) // logged in

  const emailButton = getByTestId('email-name@email.com')
  const subButton = getByTestId('sub-name@email.com')
  const unsubButton = getByTestId('unsub-name@email.com')

  expect(emailButton.disabled).to.equal(false)
  expect(subButton.disabled).to.equal(false)
  expect(unsubButton.disabled).to.equal(false)
})
