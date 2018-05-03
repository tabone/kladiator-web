import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import RootContainer from './RootContainer'
import reducers from './reducers/index'

export default class Main extends PureComponent {
  constructor (props) {
    super(props)
    this.store = createStore(reducers)
  }

  render () {
    return (
      <Provider store={this.store}>
        <React.StrictMode>
          <RootContainer />
        </React.StrictMode>
      </Provider>
    )
  }
}
