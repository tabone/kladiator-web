import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Map } from 'immutable'
import FAB from './FAB'
import FABContainer from './FABContainer'

const mockStore = configureStore()

describe('FABContainer Component', () => {
  describe('Rendering the component', () => {
    let wrapper = null

    beforeEach(() => {
      const fabActions = Map({
        'key-one': Map({ icon: 'one' }),
        'key-two': Map({ icon: 'two' }),
        'key-three': Map({ icon: 'three' })
      })

      const store = mockStore({ 'fab-action': fabActions })

      wrapper = shallow(<FABContainer />, { context: { store } })
    })

    it('should render a FAB component', () => {
      expect(wrapper.is(FAB)).toBe(true)
    })

    it('should provide the FAB Actions as props to the FAB component', () => {
      expect(wrapper.props().actions).toEqual([
        { icon: 'one' },
        { icon: 'two' },
        { icon: 'three' }
      ])
    })
  })
})
