import React from 'react'
import { shallow } from 'enzyme'
import CalendarPage from './CalendarPage'

describe('CalendarPage Component', () => {
  it('should render without crashing', () => {
    shallow(<CalendarPage />)
  })
})
