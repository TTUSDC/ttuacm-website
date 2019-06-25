import React from 'react'
import PageLayout from 'components/PageLayout'
import TeamsSection from './TeamsSection'

function TeamsPage() {
  const LandingPageInfo = {
    title: 'SOFTWARE DEVELOPMENT CLUB',
    info:
      'The Software Development Club is at the heart of our ACM Chapter. This is where you not only get to learn specific technologies, but where you also get to bond with other students who have the same interests.',
  }

  return (
    <PageLayout
      color='#CC0000'
      headerInfo={LandingPageInfo}
      content={<TeamsSection />}
    />
  )
}

export default TeamsPage
