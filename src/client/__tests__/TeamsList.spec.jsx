import React from 'react'
import Profile from 'assets/teams_page/profile.jpg'
import TeamsList from 'components/TeamsList'
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

test('should not allow the user to email, (un)subscribe to teams if they are not logged in', () => {
  const { getByTestId } = renderComponent(<TeamsList teams={teams} />)

  const emailButton = getByTestId('email-name@email.com')
  const subButton = getByTestId('sub-name@email.com')
  const unsubButton = getByTestId('unsub-name@email.com')

  expect(emailButton.disabled).to.equal(true)
  expect(subButton.disabled).to.equal(true)
  expect(unsubButton.disabled).to.equal(true)
})
