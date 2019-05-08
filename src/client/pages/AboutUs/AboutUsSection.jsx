import React from 'react'
import Typography from '@material-ui/core/Typography'
import OfficerCardsList from './OfficerCardsList'

export default function AboutUsSection() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '86vw',
        margin: 'auto',
      }}
    >
      <Typography variant='h3' gutterBottom>
        OUR PHILOSOPHY
      </Typography>
      <Typography variant='body1' gutterBottom>
        We aim to provide excellent opportunities to students interested in
        computer science and its related fields. We design, code, share, and
        learn in an inclusive environment. From simple workshops to hackathons,
        we hope to make your time at Texa Tech the best possible.
      </Typography>
      <Typography
        style={{ margin: '15px 0px 0px 0px' }}
        variant='h3'
        gutterBottom
      >
        THE TEAM
      </Typography>
      <OfficerCardsList />
    </div>
  )
}
