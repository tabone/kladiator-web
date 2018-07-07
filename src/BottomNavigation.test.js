import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'
import BottomNavigation from './BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import {
  default as BottomNavigationMaterialUI
} from '@material-ui/core/BottomNavigation'

describe('BottomNavigation Component', () => {
  describe('Rendering the component', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<BottomNavigation />)
    })

    it('should render a BottomNavigation', () => {
      expect(wrapper.find(BottomNavigationMaterialUI).length).toBe(1)
    })

    it('should redirect the user to the profile page', () => {
      expect(wrapper.find(Redirect).props().to).toBe('/')
    })

    it('should set the state of the profile page menu item to active', () => {
      expect(wrapper.find(BottomNavigationMaterialUI).props().value).toBe('/')
    })

    it('should render the expected bottom navigation menu items', () => {
      const menuItems = wrapper.find(BottomNavigationAction)

      ;[{
        route: '/',
        label: 'Profile'
      }, {
        route: '/calendar',
        label: 'Calendar'
      }, {
        route: '/messages',
        label: 'Messages'
      }, {
        route: '/alerts',
        label: 'Alerts'
      }].forEach((expected, index) => {
        const menuItem = menuItems.at(index)
        expect(menuItem.props().label).toBe(expected.label)
        expect(menuItem.props().route).toBe(expected.value)
      })
    })
  })

  describe('Clicking on a menu item', () => {
    let wrapper = null
    let newRoute = null

    beforeEach(() => {
      newRoute = '/new-route'
      wrapper = shallow(<BottomNavigation />)
      wrapper.find(BottomNavigationMaterialUI).props().onChange({}, newRoute)
      wrapper.update()
    })

    it('should redirecr the user to the new route', () => {
      expect(wrapper.find(Redirect).props().to).toBe(newRoute)
    })

    it('should set the state of the menu item redirecting to the same route to active', () => {
      expect(wrapper.find(BottomNavigationMaterialUI).props().value)
        .toBe(newRoute)
    })
  })
})
