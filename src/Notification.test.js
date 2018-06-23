import React from 'react'
import { shallow } from 'enzyme'
import Notification from './Notification'
import { Snackbar } from '@material-ui/core';

describe('Notification Component', () => {
  describe('Rendering the component with a notification', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<Notification
        notification={{}}
        removeNotification={()=>{}} />)
    })

    it('should render a Snackbar component', () => {
      expect(wrapper.is(Snackbar)).toBe(true)
    })

    it('should display a notification', () => {
      expect(wrapper.props().open).toBe(true)
    })
  })

  describe('Rendering the component without a notification', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<Notification
        notification={null}
        removeNotification={()=>{}} />)
    })

    it('should render a Snackbar component', () => {
      expect(wrapper.is(Snackbar)).toBe(true)
    })

    it('should not display a notification', () => {
      expect(wrapper.props().open).toBe(false)
    })
  })

  describe('Displaying a notification', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<Notification
        notification={null}
        removeNotification={()=>{}} />)

      wrapper.setProps({ notification: {} })
    })

    it('should display the notification', () => {
      expect(wrapper.props().open).toBe(true)
    })
  })

  describe('Clearing a notification', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<Notification
        notification={{}}
        removeNotification={()=>{}} />)

      wrapper.setProps({ notification: null })
    })

    it('should clear the notification being displayed', () => {
      expect(wrapper.props().open).toBe(false)
    })
  })

  describe('Closing a notification', () => {
    let onClose = null
    let wrapper = null
    let onCloseArgs = null
    let removeNotification = null

    beforeEach(() => {
      onCloseArgs = {}
      onClose = jest.fn()
      removeNotification = jest.fn()

      wrapper = shallow(<Notification
        notification={{ onClose }}
        removeNotification={removeNotification} />)

      wrapper.props().onClose(onCloseArgs)
    })

    it('should close the notification being displayed', () => {
      expect(removeNotification).toHaveBeenCalledTimes(1)
    })

    it('should invoke the specified onClose callback', () => {
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(onClose.mock.calls[0][0]).toBe(onCloseArgs)
    })
  })
})
