import React from 'react'
import { shallow } from 'enzyme'
import BottomNavigation from './BottomNavigation'
import {
  default as BottomNavigationMaterialUI
} from '@material-ui/core/BottomNavigation'

describe('BottomNavigation Component', () => {
  describe('Rendering the component while viewing the main page', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<BottomNavigation
        pathname='/'
        history={{ push: ()=>{} }} />)
    })

    it('should highlight the Bottom Navigation action linking to the profile page', () => {
      expect(wrapper.find(BottomNavigationMaterialUI).props().value).toBe('/')
    })
  })

  describe('Rendering the component while viewing the messages page', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<BottomNavigation
        pathname='/messages'
        history={{ push: ()=>{} }} />)
    })

    it('should highlight the Bottom Navigation action linking to the messages page', () => {
      expect(wrapper.find(BottomNavigationMaterialUI).props().value).toBe('/messages')
    })
  })

  describe('Rendering the component while viewing a child page of the messages page', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<BottomNavigation
        pathname='/messages/new'
        history={{ push: ()=>{} }} />)
    })

    it('should highlight the Bottom Navigation action linking to the messages page', () => {
      expect(wrapper.find(BottomNavigationMaterialUI).props().value).toBe('/messages')
    })
  })

  describe('Rendering the component while viewing the calendar page', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<BottomNavigation
        pathname='/calendar'
        history={{ push: ()=>{} }} />)
    })

    it('should highlight the Bottom Navigation action linking to the calendar page', () => {
      expect(wrapper.find(BottomNavigationMaterialUI).props().value).toBe('/calendar')
    })
  })

  describe('Rendering the component while viewing a child page of the calendar page', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<BottomNavigation
        pathname='/calendar/new'
        history={{ push: ()=>{} }} />)
    })

    it('should highlight the Bottom Navigation action linking to the calendar page', () => {
      expect(wrapper.find(BottomNavigationMaterialUI).props().value).toBe('/calendar')
    })
  })

  describe('Rendering the component while viewing the alerts page', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<BottomNavigation
        pathname='/alerts'
        history={{ push: ()=>{} }} />)
    })

    it('should highlight the Bottom Navigation action linking to the alerts page', () => {
      expect(wrapper.find(BottomNavigationMaterialUI).props().value).toBe('/alerts')
    })
  })

  describe('Rendering the component while viewing a child page of the alerts page', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<BottomNavigation
        pathname='/alerts/new'
        history={{ push: ()=>{} }} />)
    })

    it('should highlight the Bottom Navigation action linking to the alerts page', () => {
      expect(wrapper.find(BottomNavigationMaterialUI).props().value).toBe('/alerts')
    })
  })

  describe('Rendering the component while viewing a page that cannot be accessed from the bottom navigation', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<BottomNavigation
        pathname='/random-page'
        history={{ push: ()=>{} }} />)
    })

    it('should not highlight any of the Bottom Navigation Actions', () => {
      expect(wrapper.find(BottomNavigationMaterialUI).props().value).toBe(null)
    })
  })

  describe('Clicking on a Bottom Navigation Action', () => {
    let wrapper = null
    let history = { push: jest.fn() }
    let actionValue = null

    beforeEach(() => {
      actionValue = 'page-pathname'

      wrapper = shallow(<BottomNavigation pathname='/' history={history} />)

      wrapper.find(BottomNavigationMaterialUI).props()
        .onChange({}, actionValue)
    })

    it('should redirect the user to the page the clicked action is linked with', () => {
      const pushCalls = history.push.mock.calls
      expect(pushCalls.length).toBe(1)
      expect(pushCalls[0][0]).toBe(actionValue)
    })
  })
})
