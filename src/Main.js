import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import red from '@material-ui/core/colors/red'
import teal from '@material-ui/core/colors/teal'
import purple from '@material-ui/core/colors/purple'
import RootContainer from './RootContainer'
import reducers from './reducers/index'

export default class Main extends PureComponent {
  constructor (props) {
    super(props)
    this.store = createStore(reducers, applyMiddleware(thunk))
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
