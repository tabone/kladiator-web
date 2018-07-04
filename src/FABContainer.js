import { connect } from 'react-redux'
import FAB from './FAB'

function mapStateToProps (state) {
  const actions = state['fab-action'].toJS()
  return { actions: Object.keys(actions).map(action => actions[action]) }
}

export default connect(mapStateToProps, null)(FAB)
