import React from 'react'
import { shallow } from 'enzyme'
import AlertsPage from './AlertsPage'

describe('AlertsPage Component', () => {
  it('should render without crashing', () => {
    shallow(<AlertsPage />)
  })
})
