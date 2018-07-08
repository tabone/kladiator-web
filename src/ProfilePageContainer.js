import { connect } from 'react-redux'
import ProfilePage from './ProfilePage'

function mapStateToProps () {
  return {
    followers: 300,
    following: 302,
    name: 'Tyrion',
    image: 'images/logo.png',
    description: 'I drink & I know things',
    statistics: [{
      month: 9,
      hours: 1
    }, {
      month: 10,
      hours: 1
    }, {
      month: 11,
      hours: 5
    }, {
      month: 0,
      hours: 1
    }, {
      month: 1,
      hours: 8
    }, {
      month: 2,
      hours: 13
    }, {
      month: 3,
      hours: 4
    }, {
      month: 4,
      hours: 1
    }, {
      month: 5,
      hours: 1
    }, {
      month: 6,
      hours: 7
    }, {
      month: 7,
      hours: 23
    }, {
      month: 8,
      hours: 1
    }],
    badges: [{
      id: 0,
      name: 'Badge One',
      image: 'images/logo.png'
    }, {
      id: 1,
      name: 'Badge Two',
      image: 'images/logo.png'
    }, {
      id: 2,
      name: 'Badge Three',
      image: 'images/logo.png'
    }, {
      id: 3,
      name: 'Badge Four',
      image: 'images/logo.png'
    }, {
      id: 4,
      name: 'Badge Five',
      image: 'images/logo.png'
    }]
  }
}

export default connect(mapStateToProps, null)(ProfilePage)
