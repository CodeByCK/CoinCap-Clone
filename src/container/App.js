import React, { Component, Fragment } from 'react'
import Axios from 'axios'
import List from '../components/common/List'
import Navbar from '../components/common/Menu'
import { Container, Header, Grid } from 'semantic-ui-react'


export default class App extends Component {

  state = {
    data: [],
    wentUp: false,
  }

  ws = new WebSocket('wss://ws.coincap.io/prices?assets=ALL')

  componentDidMount() {
    this.getData()
    this.webSocket()
  }

  webSocket = () => {
    this.ws.onopen = () => console.log('connected')

    this.ws.onmessage = msg => { // => listen to data sent from the websocket server
      const message = JSON.parse(msg.data); // => returns websocket data
      let newData = [...this.state.data]; // => copy of current state

      Object.keys(message).map(key => { // => map through keys of websocket
        let coin = newData.find(x => x.id === key) // => set variable to find the matching data 
        // this.setState({ wentUp: coin.priceUsd < message[key] })
        if (coin) { coin.priceUsd = message[key] } // => if coin is found replace with new data
        // if (coin.priceUsd < message[key]) { this.setState({ wentUp: false }) }
        // if (coin.priceUsd > message[key]) { this.setState({ wentUp: true }) }

      })
      this.setState({ data: newData }); // set the new state of the updated value
    }
    this.ws.onclose = () => console.log('disconnected');
  }


  getData = () => {
    Axios.all([
      Axios.get('https://api.coincap.io/v2/assets?limit=50'),
      Axios.get('https://shapeshift.io/getcoins')
    ])
      .then(Axios.spread((marketData, coinInfo) => {
        this.setState({ data: [...marketData.data.data], coinInfo: coinInfo.data })
      }))
  }


  render() {
    return (
      <Fragment>
        <div style={{ background: '#ECEFF1' }}>
          <Navbar />
          <div style={{ height: '260px', background: 'linear-gradient(to right, rgb(63, 81, 181), rgb(100, 181, 246)) rgb(255, 255, 255)' }}>
            <Container style={{ padding: '6em 0em 0 0em' }}>
              <Grid columns={6} centered>
                <Grid.Row textAlign='justified' style={{ color: 'white' }}>
                  <Grid.Column>
                    <h1>Hello</h1>
                  </Grid.Column>
                  <Grid.Column>
                    <h1>Hello</h1>
                  </Grid.Column>
                  <Grid.Column>
                    <h1>Hello</h1>
                  </Grid.Column>
                  <Grid.Column>
                    <h1>Hello</h1>
                  </Grid.Column>
                  <Grid.Column>
                    <h1>Hello</h1>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
          <Container style={{ marginTop: '-8em' }}>
            <List
              data={this.state.data}
              coinInfo={this.state.coinInfo}
              wentUp={this.state.wentUp}
            />
          </Container>
        </div>
      </Fragment>
    )
  }
}
