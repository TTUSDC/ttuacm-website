import React from 'react'

export const sections = [
  {
    title: 'ABOUT',
    description: [`The ACM Chapter at Texas Tech University 
          creates many
          opportunities for students
          interested in computer science
          to be involved and become better`],
    containsAppLink: false,
    containsOutsideLink: false,
  },
  {
    title: 'LINKS',
    description: [
      ['/events', 'Events'],
      ['/teams', 'SDC Groups'],
      ['/about', 'About Us'],
      ['/auth', 'Members Login'],
    ],
    containsAppLink: true,
    containsOutsideLink: false,
  },
  {
    title: 'CONTACT US',
    description: [
      ['mailto:acmtexastech@gmail.com', 'acmtexastech@gmail.com'],
      ['https://goo.gl/maps/B6Wa4RScEDz', '2500 Broadway, Lubbock, TX 79409'],
    ],
    containsAppLink: false,
    containsOutsideLink: true,
  },
]

export const withHref = (classes, href, text) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className={classes.FooterALink}
  >
    {text}
  </a>
)
