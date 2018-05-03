import React from 'react'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import Main from './Main'
import RootContainer from './RootContainer'

describe('Main component', () => {
  it('should render the Root Container Component within the Redux Provider', () => {
    const wrapper = shallow(<Main />)
    expect(wrapper.is(Provider)).toBe(true)
    expect(wrapper.find(RootContainer).length).toBe(1)
  })
})
