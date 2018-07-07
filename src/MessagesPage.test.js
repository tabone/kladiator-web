import React from 'react'
import { shallow } from 'enzyme'
import MessagesPage from './MessagesPage'

describe('MessagesPage Component', () => {
  it('should render without crashing', () => {
    shallow(<MessagesPage />)
  })
})
