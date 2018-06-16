import React from 'react'
import { shallow } from 'enzyme'
import Guest from './Guest'

describe('Guest Component', () => {
  it('renders without crashing', () => {
    shallow(<Guest />)
  })
})
