import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Chart from 'chart.js'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ListSubheader from '@material-ui/core/ListSubheader'

const months = [
  { name: 'January', shortName: 'J' },
  { name: 'February', shortName: 'F' },
  { name: 'March', shortName: 'M' },
  { name: 'April', shortName: 'A' },
  { name: 'May', shortName: 'M' },
  { name: 'June', shortName: 'J' },
  { name: 'July', shortName: 'J' },
  { name: 'August', shortName: 'A' },
  { name: 'September', shortName: 'S' },
  { name: 'October', shortName: 'O' },
  { name: 'November', shortName: 'N' },
  { name: 'December', shortName: 'D' }
]

const styles = theme => {
  return {
    appProfile: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '18px 0',
    },

    appProfile__details: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },

    appProfile__detailsRespectGauge: {
      width: '130px',
      height: '130px',
      borderRadius: '50%',
      border: `solid 5px ${theme.palette.primary.main}`,
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '11px'
    },

    appProfile__detailsImage: {
      borderRadius: '50%',
      maxWidth: '100%',
      maxHeight: '100%',
      padding: '5px'
    },

    appProfile__detailsUsername: {
      textTransform: 'lowercase',
      marginBottom: '11px'
    },

    appProfile__detailsDescription: {
      fontStyle: 'italic',
      textTransform: 'lowercase',
      marginBottom: '18px'
    },

    appProfile__social: {
      width: '100%',
      marginBottom: '15px'
    },

    appProfile__socialActions: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-around',
      marginBottom: '14px'
    },

    appProfile__socialAction: {
      width: '40%'
    },

    appProfile__socialInfo: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%'
    },

    appProfile__socialInfoSection: {
      textAlign: 'center'
    },

    appProfile__socialInfoSectionTitle: {
      textTransform: 'uppercase'
    },

    appProfile__socialInfoSectionValue: {
      color: theme.palette.primary.main
    },

    appProfile__badges: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      padding: '0 18px',
      marginBottom: '11px'
    },

    appProfile__badgesBadge: {
      maxWidth: '50px',
      maxHeight: '50px'
    },

    appProfile__stats: {
      width: '100%'
    },

    appProfile__statsChart: {
      padding: '0 18px'
    }
  }
}

class ProfilePage extends PureComponent {
  constructor (props) {
    super(props)

    this.canvasElement = React.createRef()
  }

  componentDidMount () {
    this.setupChart()
  }

  setupChart () {
    const info = this.props.statistics.reduce((info, stat) => {
      info.data.push(stat.hours)
      info.labels.push(stat.month)
      return info
    }, { labels: [], data: [] })

    var myChart = new Chart(this.canvasElement.current, {
      type: 'bar',
      data: {
        labels: info.labels,
        datasets: [{
          label: 'Hours',
          data: info.data,
          backgroundColor: '#009688'
        }]
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{ display: false }],
          xAxes: [{
            gridLines: { display: false },
            ticks: { callback: value => months[value].shortName }
          }]
        },
        tooltips: {
          callbacks: {
            title: ([ tooltip ], data) => {
              return months[data.labels[tooltip.index]].name
            }
          }
        }
      }
    })
  }

  render () {
    const {
      name,
      image,
      classes,
      followers,
      following,
      description
    } = this.props

    const badges = this.props.badges.map(badge => {
      return (
        <Tooltip title={badge.name} key={`badge-${badge.id}`}>
          <img
            alt={badge.name}
            src={badge.image}
            className={classes.appProfile__badgesBadge} />
        </Tooltip>
      )
    })

    return (
      <div className={classes.appProfile}>
        <header className={classes.appProfile__details}>
          <div className={classes.appProfile__detailsRespectGauge}>
            <img
              src={image}
              alt='User Profile'
              className={classes.appProfile__detailsImage} />
          </div>

          <Typography variant='headline'
            className={classes.appProfile__detailsUsername}>
            {name}
            </Typography>

          <Typography variant='caption'
            className={classes.appProfile__detailsDescription}>
            {description}
          </Typography>
        </header>

        <section className={classes.appProfile__social}>
          <div className={classes.appProfile__socialActions}>
            <Button
              className={classes.appProfile__socialAction}
              variant='raised'
              color='primary'>
              Follow
            </Button>

            <Button
              className={classes.appProfile__socialAction}
              variant='raised'
              color='primary'>
              Message
            </Button>
          </div>

          <div className={classes.appProfile__socialInfo}>
            <div className={classes.appProfile__socialInfoSection}>
              <Typography
                variant='caption'
                className={classes.appProfile__socialInfoSectionTitle}>
                Following
              </Typography>

              <Typography
                variant='display1'
                className={classes.appProfile__socialInfoSectionValue}>
                {following}
              </Typography>
            </div>

            <div className={classes.appProfile__socialInfoSection}>
              <Typography
                variant='caption'
                className={classes.appProfile__socialInfoSectionTitle}>
                Followers
              </Typography>

              <Typography
                variant='display1'
                className={classes.appProfile__socialInfoSectionValue}>
                {followers}
              </Typography>
            </div>
          </div>
        </section>

        <section className={classes.appProfile__badges}>{badges}</section>

        <section className={classes.appProfile__stats}>
          <ListSubheader component='div'>Statistics</ListSubheader>
          <canvas
            ref={this.canvasElement}
            className={classes.appProfile__statsChart}>
          </canvas>
        </section>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  following: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  statistics: PropTypes.arrayOf(PropTypes.shape({
    month: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired
  })),
  badges: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }))
}

export default withStyles(styles)(ProfilePage)
