import React from 'react'
import Events from 'assets/home_page/Events.gif'
import SDC from 'assets/home_page/SDC.gif'
import Team from 'assets/home_page/Team.gif'
import WhatWeDoCard from './WhatWeDoCard'

const content = [
  {
    title: 'Events',
    text:
      'We organize many events where each and every student that attends can walk away with learning something new friend that can teach them something along the way',
    link: '/events',
    linkTag: 'See Events',
  },
  {
    title: 'SDC',
    text:
      'Software Development Club. We support software projects and provide knowledge from individuals who are passionate about teaching others',
    link: '/teams',
    linkTag: 'See Groups',
  },
  {
    title: 'Our Team',
    text:
      'Our officers consist of passionate Computer Science students who also want to be engineers. Our goal is to help you realize your passions in Computer Science',
    link: '/about',
    linkTag: 'About Us',
  },
]

function WhatWeDoContainer() {
  return (
    <React.Fragment>
      <WhatWeDoCard content={content[0]} align='left' image={Events} />
      <WhatWeDoCard content={content[1]} align='left' image={SDC} />
      <WhatWeDoCard content={content[2]} align='left' image={Team} />
    </React.Fragment>
  )
}

export default WhatWeDoContainer
