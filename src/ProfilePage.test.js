import React from 'react'
import { shallow } from 'enzyme'
import ProfilePage from './ProfilePage'

describe('ProfilePage Component', () => {
  it('should render without crashing', () => {
    shallow(<ProfilePage />)
  })
})
