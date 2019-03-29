import React from 'react'
import TeamsList from 'components/TeamsList'

// Edit this to edit the teams
const TEAMS = []

// This is only for development
if (process.env.NODE_ENV !== 'production') {
  for (let i = 0; i < 6; i += 1) {
    TEAMS.push({
      name: `Practical Python ${i}`,
      leader: 'Simon Woldemichael',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus ante risus, et iaculis est tempor et. Maecenas interdum et lorem eget lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices velit fringilla dolor porttitor ultrices. Donec lorem orci, tempus ut pellentesque eget, hendrerit in magna. Cras viverra venenatis sem vitae condimentum. Curabitur vel neque in nulla blandit posuere ut in velit. Mauris sed porta sem.',
      email: '<email goes here>',
      day: ['Monday', 'Tuesday'],
      time: '6pm - 7pm',
    })
  }
}

function TeamsSection() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TeamsList teams={TEAMS} />
    </div>
  )
}

export default TeamsSection
