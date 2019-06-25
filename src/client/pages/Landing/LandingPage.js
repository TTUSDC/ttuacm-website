import React from 'react'
import PageLayout from 'client/pages/PageLayout'
import LandingSection from './LandingSection'

function LandingPage() {
  const LandingPageInfo = {
    title: 'ASSOCIATION FOR COMPUTING MACHINERY',
    info: `TEXAS TECH'S LARGEST
      COMPUTER SCIENCE STUDENT ORGANIZATION`,
  }

  return (
    <PageLayout
      color='#CC0000'
      headerInfo={LandingPageInfo}
      content={<LandingSection />}
    />
  )
}

export default LandingPage
