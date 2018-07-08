import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => {
  return {
    appLoading: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.primary.main
    },

    appLoading__message: {
      color: '#fff',
      marginTop: '1.5em'
    }
  }
}

class Loading extends Component {
  render () {
    const { classes } = this.props
    return (
      <section className={classes.appLoading}>
        <img src='images/loader.gif' width='40' alt='Loading' />

        <Typography
          className={classes.appLoading__message}
          variant='title'>
          Loading please wait
        </Typography>
      </section>
    )
  }
}

export default withStyles(styles)(Loading)
