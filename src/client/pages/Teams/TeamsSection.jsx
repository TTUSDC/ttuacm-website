import React from 'react'
import TeamsList from 'components/TeamsList'
import Profile from 'assets/teams_page/profile.jpg'

// Import photos into here and serve place them in the right objects

// Edit this to edit the teams
const TEAMS = [
  {
    name: 'Intro To Python',
    leader: 'Audrey Cooper',
    description: 'Intro to Python will start with learning the basics about important computer hardware and different types of software. Basic programming logic and math concepts will also be covered. From there, we will learn about various topics within the Python language, such as control structures, recursion, and even some GUI designing and building. This class will include a Python project which consists of a menu-driven program with several smaller projects inside of it.',
    email: 'audrey.g.cooper@ttu.edu',
    image: Profile,
    day: ['Monday'],
    time: '6:15pm - 7:30pm',
  },
  {
    name: 'Applied Algorithms',
    leader: 'Miggy Reyes',
    description: 'Are you looking to get into those big tech companies? That new hot start up? Learn how to solve Leetcode problems and boost your algorithm skills!',
    email: 'ynigo.reyes@ttu.edu',
    image: Profile,
    day: ['Tuesday'],
    time: '4:30pm - 6:00pm',
  },
  {
    name: 'Eye for Design',
    leader: 'Nikki Green',
    description: 'Eye for Design shows you how to create responsive and good looking UI/UX using modern technologies. This is essential for anyone who is looking to get into front end or full stack development.',
    email: 'angela.nikki.green@ttu.edu',
    image: Profile,
    day: ['Thurday'],
    time: '6:30pm - 7:30pm',
  },
]

function TeamsSection() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TeamsList teams={TEAMS} />
    </div>
  )
}

export default TeamsSection
