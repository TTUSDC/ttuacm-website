import React from 'react'
import FooterTop from 'client/pages/Footer/FooterTop'
import { expect } from 'chai'
import { cleanup, act } from 'react-testing-library'
import { renderComponent } from './utils'

afterEach(cleanup)

test('should only show the Contact Us section on mobile devices and will show everything when not on mobile, even when resizing', () => {
  window.innerWidth = 599
  const { queryByText, rerender, getByText } = renderComponent(<FooterTop />)
  const contactUs = queryByText('CONTACT US')
  const about = queryByText('ABOUT')
  const links = queryByText('LINKS')

  expect(contactUs).to.exist
  expect(about).not.to.exist
  expect(links).not.to.exist

  act(() => {
    window.innerWidth = 601
    window.dispatchEvent(new Event('resize'))
  })

  rerender(<FooterTop />)

  getByText('CONTACT US')
  getByText('ABOUT')
  getByText('LINKS')
})
