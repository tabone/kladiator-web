import React from 'react'
import { shallow } from 'enzyme'
import ReactDOM from 'react-dom'
import Guest from './Guest'

describe('Guest Component', () => {
  it('renders without crashing', () => {
    shallow(<Guest />)
  })
})
