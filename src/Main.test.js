import React from 'react'
import { Provider } from 'react-redux'
import CssBaseline from 'material-ui/CssBaseline'
import { MuiThemeProvider } from 'material-ui/styles'
import { shallow } from 'enzyme'
import Main from './Main'
import RootContainer from './RootContainer'

describe('Main component', () => {
  it('should render the Root Container Component within the Redux & Theme Provider', () => {
    const wrapper = shallow(<Main />)
    expect(wrapper.is(Provider)).toBe(true)

    const themeWrapper = wrapper.find(MuiThemeProvider)
    expect(themeWrapper.length).toBe(1)
    expect(themeWrapper.find(CssBaseline).length).toBe(1)
    expect(themeWrapper.find(RootContainer).length).toBe(1)
  })
})
