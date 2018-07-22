import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Route, RouterContext } from 'react-router-dom'
import BottomNavigation from './BottomNavigation'
import FABContainer from './FABContainer'
import AlertsPage from './AlertsPage'
import CalendarPage from './CalendarPage'
import MessagesPage from './MessagesPage'
import ProfilePageContainer from './ProfilePageContainer'

const styles = () => {
  return {
    appApp: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    },

    appApp__content: {
      flex: 1,
      overflow: 'scroll',
      position: 'relative'
    }
  }
}

class App extends Component {
  render () {
    const { classes } = this.props

    return (
      <div className={classes.appApp}>
        <div className={classes.appApp__content}>
          <Route exact path='/' component={ProfilePageContainer}/>
          <Route exact path='/calendar' component={CalendarPage}/>
          <Route exact path='/messages' component={MessagesPage}/>
          <Route exact path='/alerts' component={AlertsPage}/>

          <FABContainer />
        </div>

        <RouterContext.Consumer>
          {
            ({ router }) => {
              return <BottomNavigation
                history={router.history}
                pathname={router.route.location.pathname} />
            }
          }
        </RouterContext.Consumer>

      </div>
    )
  }
}

export default withStyles(styles)(App)
