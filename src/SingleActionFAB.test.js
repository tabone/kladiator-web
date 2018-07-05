import React from 'react'
import { shallow } from 'enzyme'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import SingleActionFAB from './SingleActionFAB'

describe('SingleFabAction Component', () => {
  describe('Rendering the component', () => {
    let wrapper = null
    let action = null

    beforeEach(() => {
      action = {
        fn: () => {},
        icon: 'fab-action'
      }

      wrapper = shallow(<SingleActionFAB fn={action.fn} icon={action.icon} />)
    })

    it('should render a button', () => {
      expect(wrapper.is(Button)).toBe(true)
    })

    it('should display the FAB Action icon within the button', () => {
      expect(wrapper.find(Icon).dive().dive().text()).toBe(action.icon)
    })

    it('should invoke the FAB Action function when the button is clicked', () => {
      expect(wrapper.props().onClick).toBe(action.fn)
    })
  })
})
