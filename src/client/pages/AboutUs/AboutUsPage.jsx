import React from 'react'
import PageLayout from 'client/pages/PageLayout'
import AboutUsSection from './AboutUsSection'

function AboutUsPage() {
  const AboutPageInfo = {
    title: 'ABOUT US',
    info:
      'As officers of the Texas Tech University ACM CHapter, we aim to always be there for you. Contact us with anything, or better: become an officer too!',
  }

  return <PageLayout headerInfo={AboutPageInfo} content={<AboutUsSection />} />
}

export default AboutUsPage
