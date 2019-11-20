import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './sidePanel.css'

class SidePanelMLB extends Component {
  static propTypes = {
    awayPitchers: PropTypes.arrayOf(PropTypes.object),
    homePitchers: PropTypes.arrayOf(PropTypes.object),
    awayBatters: PropTypes.arrayOf(PropTypes.object),
    homeBatters: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    awayPitchers: [{}],
    homePitchers: [{}],
    awayBatters: [{}],
    homeBatters: [{}],
  }

  getPerformingPitcher = (category) => {
    const { awayPitchers, homePitchers } = this.props
    const allPitchers = awayPitchers.concat(homePitchers)
    let foundPitcher
    allPitchers.forEach((pitcher) => {
      if (pitcher[category]) {
        foundPitcher = pitcher
      }
    })
    return foundPitcher
  }

  getPerformingHitter = (collection) => {
    const initialMax = { ...collection[0], rating: 0 }
    return collection.reduce((max, player) => {
      const playerRating = 0.5 * player.home_runs + 0.25 * (player.doubles + player.triples) + 0.25 * player.hits
      return playerRating > max.rating ? { ...player, rating: playerRating } : max
    }, initialMax)
  }

  render = () => {
    const { homeBatters, awayBatters } = this.props
    const wp = this.getPerformingPitcher('win')
    const lp = this.getPerformingPitcher('loss')
    const homeHitter = this.getPerformingHitter(homeBatters)
    const awayHitter = this.getPerformingHitter(awayBatters)

    return (
      <div>
        <div className="mlb-panel-table" style={{ float: 'left' }}>
          <table>
            <tbody>
              <tr>
                <td className="align-center">
                  <p>
                    <b>WIN: </b>
                    {`${wp.display_name[0]}. ${wp.last_name}`}
                  </p>
                  <p className="team-position-subtitle">
                    {`${wp.team_abbreviation} - ${wp.pitch_order === 1 ? 'SP' : 'RP'}`}
                  </p>
                  <p className="mlb-stat-line">
                    {`${wp.innings_pitched} IP, ${wp.hits_allowed} H, ${wp.runs_allowed} R, ${wp.earned_runs} ER, ${wp.strike_outs} K`}
                  </p>
                </td>
              </tr>
              <tr>
                <td className="align-center">
                  <p>
                    <b>LOSS: </b>
                    {`${lp.display_name[0]}. ${lp.last_name}`}
                  </p>
                  <p className="team-position-subtitle">
                    {`${lp.team_abbreviation} - ${lp.pitch_order === 1 ? 'SP' : 'RP'}`}
                  </p>
                  <p className="mlb-stat-line">
                    {`${lp.innings_pitched} IP, ${lp.hits_allowed} H, ${lp.runs_allowed} R, ${lp.earned_runs} ER, ${lp.strike_outs} K`}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mlb-panel-table" style={{ float: 'right' }}>
          <table>
            <tbody>
              <tr>
                <td className="align-center">
                  <p>
                    {`${awayHitter.display_name[0]}. ${awayHitter.last_name}`}
                  </p>
                  <p className="team-position-subtitle">
                    {`${awayHitter.team_abbreviation} - ${awayHitter.position}`}
                  </p>
                  <p className="mlb-stat-line">
                    {awayHitter.batting_highlights}
                  </p>
                </td>
              </tr>
              <tr>
                <td className="align-center">
                  <p>
                    {`${homeHitter.display_name[0]}. ${homeHitter.last_name}`}
                  </p>
                  <p className="team-position-subtitle">
                    {`${homeHitter.team_abbreviation} - ${homeHitter.position}`}
                  </p>
                  <p className="mlb-stat-line">
                    {homeHitter.batting_highlights}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default SidePanelMLB