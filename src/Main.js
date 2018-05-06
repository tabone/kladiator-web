import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import CssBaseline from 'material-ui/CssBaseline'
import red from 'material-ui/colors/red'
import teal from 'material-ui/colors/teal'
import purple from 'material-ui/colors/purple'
import RootContainer from './RootContainer'
import reducers from './reducers/index'

export default class Main extends PureComponent {
  constructor (props) {
    super(props)
    this.store = createStore(reducers)
    this.theme = createMuiTheme({
      palette: {
        primary: teal,
        secondary: purple,
        error: red
      }
    })
  }

  render () {
    return (
      <Provider store={this.store}>
        <MuiThemeProvider theme={this.theme}>
          <CssBaseline />
          <React.StrictMode>
            <RootContainer />
          </React.StrictMode>
        </MuiThemeProvider>
      </Provider>
    )
  }
}
