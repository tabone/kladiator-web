import React from 'react'
import { shallow } from 'enzyme'
import SingleActionFAB from './SingleActionFAB'
import MultipleActionFAB from './MultipleActionFAB'
import FAB from './FAB'

describe('FAB Component', () => {
  describe('Rendering the FAB component with no actions', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<FAB actions={[]}/>).dive()
    })

    it('should render nothing', () => {
      expect(wrapper.html()).toBe(null)
    })
  })

  describe('Rendering the FAB component with one action', () => {
    let wrapper = null
    let actions = null

    beforeEach(() => {
      actions = [{
        fn: () => {},
        key: 'action-key',
        icon: 'action-icon',
        caption: 'action-caption'
      }]

      wrapper = shallow(<FAB actions={actions}/>).dive()
    })

    it('should render a SingleActionFAB component', () => {
      expect(wrapper.find(SingleActionFAB).length).toBe(1)
      expect(wrapper.find(MultipleActionFAB).length).toBe(0)
    })

    it('should provide the FAB Action to the SingleActionFAB component', () => {
      const props = wrapper.find(SingleActionFAB).props()
      expect(props.fn).toBe(actions[0].fn)
      expect(props.icon).toBe(actions[0].icon)
    })
  })

  describe('Rendering the FAB component with multiple actions', () => {
    let wrapper = null
    let actions = null

    beforeEach(() => {
      actions = [{
        fn: () => {},
        key: 'action-one-key',
        icon: 'action-one-icon',
        caption: 'action-one-caption'
      }, {
        fn: () => {},
        key: 'action-one-key',
        icon: 'action-two-icon',
        caption: 'action-two-caption'
      }]

      wrapper = shallow(<FAB actions={actions}/>).dive()
    })

    it('should render a MultipleActionFAB component', () => {
      expect(wrapper.find(SingleActionFAB).length).toBe(0)
      expect(wrapper.find(MultipleActionFAB).length).toBe(1)
    })

    it('should provide all the FAB Actions to the MultipleActionFAB component', () => {
      expect(wrapper.find(MultipleActionFAB).props().actions).toBe(actions)
    })
  })
})
