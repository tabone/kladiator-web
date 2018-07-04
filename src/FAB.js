import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import SingleActionFAB from './SingleActionFAB'
import MultipleActionFAB from './MultipleActionFAB'

const styles = () => {
  return {
    appFab: {
      position: 'absolute',
      bottom: '16px',
      right: '16px',
      zIndex: 10000
    }
  }
}

class FAB extends PureComponent {
  render () {
    const { actions } = this.props

    if (actions.length === 0) return null

    return (
      <section className={this.props.classes.appFab}>
        {
          (actions.length === 1) ? renderSingleActionFAB(actions[0])
            : <MultipleActionFAB actions={actions} />
        }
      </section>
    )
  }
}

function renderSingleActionFAB ({ fn, icon }) {
  return <SingleActionFAB fn={fn} icon={icon}/>
}

export default withStyles(styles)(FAB)
