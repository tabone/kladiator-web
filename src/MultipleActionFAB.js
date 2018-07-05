import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'

const styles = () => {
  return {
    appMultipleActionFAB: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      zIndex: 1000
    },

    appMultipleActionFAB__actions: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      paddingRight: '8px',
      margin: 0
    },

    appMultipleActionFAB__action: {
      display: 'flex',
      marginTop: '17px'
    },

    appMultipleActionFAB__actionCaption: {
      backgroundColor: '#ffffff',
      marginRight: '1em',
      padding: '9px 20px',
      borderRadius: '7px',
      boxShadow: '0px 2px 8px 0px #00000030'
    },

    appMultipleActionFAB__mainButton: {
      marginTop: '27px'
    }
  }
}

class MultipleActionFAB extends PureComponent {
  constructor (props) {
    super(props)

    this.state = { isOpen: false }

    this.toggleActionsVisibility = this.toggleActionsVisibility.bind(this)
  }

  render () {
    const { classes } = this.props

    let actions = []

    if (this.state.isOpen === true) {
      actions = this.props.actions.map(action => {
        const actionClassName = classes.appMultipleActionFAB__action +
          ' app-multiple-action-fab__action'

        return (
          <li className={actionClassName} key={action.key}>
            <Typography className={classes.appMultipleActionFAB__actionCaption}>
              {action.caption}
            </Typography>

            <Button
              onClick={() => {
                action.fn()
                this.toggleActionsVisibility()
              }}
              mini={true}
              variant='fab'>
              <Icon>{action.icon}</Icon>
            </Button>
          </li>
        )
      })
    }

    const mainButtonClassName = classes.appMultipleActionFAB__mainButton +
      ' app-multiple-action-fab__main-button'

    return (
      <section className={classes.appMultipleActionFAB}>
        <ul className={classes.appMultipleActionFAB__actions}>
          {actions}
        </ul>

        <Button
          className={mainButtonClassName}
          variant='fab'
          color='secondary'
          onClick={this.toggleActionsVisibility}>
          <Icon>{(this.state.isOpen === true) ? 'clear' : 'more_vert' }</Icon>
        </Button>
      </section>
    )
  }

  toggleActionsVisibility () {
    this.setState({ isOpen: !this.state.isOpen })
  }
}

MultipleActionFAB.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    fn: PropTypes.func.isRequired,
    key: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
  })).isRequired
}

export default withStyles(styles)(MultipleActionFAB)
