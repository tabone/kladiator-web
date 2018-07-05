import React from 'react'
import { shallow } from 'enzyme'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import MultipleActionFAB from './MultipleActionFAB'

function getElementByClassName (wrapper, className) {
  return wrapper.find(className)
}

function getMainButton (wrapper) {
  return getElementByClassName(wrapper,
    '.app-multiple-action-fab__main-button')
}

function getActionButtons (wrapper) {
  return getElementByClassName(wrapper,
    '.app-multiple-action-fab__action')
}

describe('MultipleActionFAB Component', () => {
  describe('Rendering the component', () => {
    let wrapper = null

    beforeEach(() => {
      const actions = [{
        fn: () => {},
        key: 'action-one-key',
        icon: 'action-one-icon',
        caption: 'action-one-caption'
      }, {
        fn: () => {},
        key: 'action-two-key',
        icon: 'action-two-icon',
        caption: 'action-two-caption'
      }, {
        fn: () => {},
        key: 'action-three-key',
        icon: 'action-three-icon',
        caption: 'action-three-caption'
      }]

      wrapper = shallow(<MultipleActionFAB actions={actions} />).dive()
    })

    it('should render the main button', () => {
      expect(getMainButton(wrapper).is(Button)).toBe(true)
    })

    it('should not render the FAB Actions', () => {
      expect(getActionButtons(wrapper).length).toBe(0)
    })

    it('should set the main button icon to a `menu` icon', () => {
      expect(getMainButton(wrapper).find(Icon).dive().dive().text())
        .toBe('more_vert')
    })
  })

  describe('Viewing all FAB Actions', () => {
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
        key: 'action-two-key',
        icon: 'action-two-icon',
        caption: 'action-two-caption'
      }, {
        fn: () => {},
        key: 'action-three-key',
        icon: 'action-three-icon',
        caption: 'action-three-caption'
      }]

      wrapper = shallow(<MultipleActionFAB actions={actions} />).dive()

      getMainButton(wrapper).props().onClick()
      wrapper.update()
    })

    it('should change the main button icon to a `clear` icon', () => {
      expect(getMainButton(wrapper).find(Icon).dive().dive().text())
        .toBe('clear')
    })

    it('should display all the FAB Actions', () => {
      const actionsWrapper = getActionButtons(wrapper)

      actions.forEach((action, index) => {
        const actionWrapper = actionsWrapper.at(index)
        const actionButton = actionWrapper.find(Button)

        expect(actionButton.find(Icon).dive().dive().text()).toBe(action.icon)
        expect(actionWrapper.key()).toBe(action.key)
        expect(actionWrapper.find(Typography).dive().dive().text())
          .toBe(action.caption)
      })
    })
  })

  describe('Hiding all FAB Actions', () => {
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
        key: 'action-two-key',
        icon: 'action-two-icon',
        caption: 'action-two-caption'
      }, {
        fn: () => {},
        key: 'action-three-key',
        icon: 'action-three-icon',
        caption: 'action-three-caption'
      }]

      wrapper = shallow(<MultipleActionFAB actions={actions} />).dive()

      getMainButton(wrapper).props().onClick()
      getMainButton(wrapper).props().onClick()
      wrapper.update()
    })

    it('should change the main button icon to a `menu` icon', () => {
      expect(getMainButton(wrapper).find(Icon).dive().dive().text())
        .toBe('more_vert')
    })

    it('should hide all the FAB Actions', () => {
      expect(getActionButtons(wrapper).length).toBe(0)
    })
  })

  describe('Clicking on a FAB Action', () => {
    let wrapper = null
    let actions = null

    beforeEach(() => {
      actions = [{
        fn: jest.fn(),
        key: 'action-one-key',
        icon: 'action-one-icon',
        caption: 'action-one-caption'
      }, {
        fn: jest.fn(),
        key: 'action-two-key',
        icon: 'action-two-icon',
        caption: 'action-two-caption'
      }, {
        fn: jest.fn(),
        key: 'action-three-key',
        icon: 'action-three-icon',
        caption: 'action-three-caption'
      }]

      wrapper = shallow(<MultipleActionFAB actions={actions} />).dive()

      getMainButton(wrapper).props().onClick()
      wrapper.update()

      getActionButtons(wrapper).at(1).find(Button).props().onClick()
      wrapper.update()
    })

    it('should change the main button icon to a `menu` icon', () => {
      expect(getMainButton(wrapper).find(Icon).dive().dive().text())
        .toBe('more_vert')
    })

    it('should hide all the FAB Actions', () => {
      expect(getActionButtons(wrapper).length).toBe(0)
    })

    it('should invoke the function of the clicked FAB Action', () => {
      expect(actions[0].fn).not.toHaveBeenCalled()
      expect(actions[1].fn).toHaveBeenCalled()
      expect(actions[2].fn).not.toHaveBeenCalled()
    })
  })
})
