import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Chart from 'chart.js'
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
      padding: '18px',
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
      marginBottom: '11px'
    },

    appProfile__badgesBadge: {
      maxWidth: '50px',
      maxHeight: '50px'
    },

    appProfile__performance: {
      width: '100%'
    }
  }
}

class ProfilePage extends PureComponent {
  constructor (props) {
    super(props)

    this.canvasElement = React.createRef()
  }

  componentDidMount () {
    var myChart = new Chart(this.canvasElement.current, {
      type: 'bar',
      data: {
        labels: [ 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6 ],
        datasets: [{
          label: 'Hours',
          data: [1, 0, 13, 14, 13, 16, 17, 17, 20, 16, 17, 17],
          backgroundColor: '#009688'
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              callback: value => months[value].shortName
            },
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            display: false
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
    const { classes } = this.props

    return (
      <div className={classes.appProfile}>
        <header className={classes.appProfile__details}>
          <div className={classes.appProfile__detailsRespectGauge}>
            <img src='images/logo.png'
              className={classes.appProfile__detailsImage} alt='User Profile' />
          </div>

          <Typography variant='headline'
            className={classes.appProfile__detailsUsername}>Tyrion</Typography>

          <Typography variant='caption'
            className={classes.appProfile__detailsDescription}>
            i drink and i know things...
          </Typography>
        </header>

        <section className={classes.appProfile__social}>
          <div className={classes.appProfile__socialActions}>
            <Button variant='raised' color='primary' className={classes.appProfile__socialAction}>Follow</Button>
            <Button variant='raised' color='primary' className={classes.appProfile__socialAction}>Message</Button>
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
                361
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
                250
              </Typography>
            </div>
          </div>
        </section>

        <section className={classes.appProfile__badges}>
          <img src='images/logo.png' className={classes.appProfile__badgesBadge} alt='Badge Name'/>
          <img src='images/happy.png' className={classes.appProfile__badgesBadge} alt='Badge Name'/>
          <img src='images/surprised.png' className={classes.appProfile__badgesBadge} alt='Badge Name'/>
          <img src='images/logo.png' className={classes.appProfile__badgesBadge} alt='Badge Name'/>
          <img src='images/happy.png' className={classes.appProfile__badgesBadge} alt='Badge Name'/>
        </section>

        <section className={classes.appProfile__performance}>
          <ListSubheader component='div'>Hours</ListSubheader>
          <canvas ref={this.canvasElement}></canvas>
        </section>
      </div>
    )
  }
}

export default withStyles(styles)(ProfilePage)
