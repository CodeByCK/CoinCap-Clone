import React, { Component, Fragment } from 'react'
import Axios from 'axios'
import List from '../components/common/List'
import Navbar from '../components/common/Menu'

import { Switch, Route, Router } from 'react-router-dom'

import Coins from '../pages/Coins'
import Assets from '../pages/Assets'


export default class App extends Component {

  state = {
    data: [],
    wentUp: false,
    exchanges: []
  }

  ws = new WebSocket('wss://ws.coincap.io/prices?assets=ALL')

  componentDidMount() {
    this.getData()
    // this.webSocket()
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
      Axios.get('https://shapeshift.io/getcoins'),
      // Axios.get('https://api.coincap.io/v2/exchanges')
    ])
      .then(Axios.spread((marketData, coinInfo, exchanges) => {
        this.setState({
          data: [...marketData.data.data],
          coinInfo: coinInfo.data,
          //  exchanges: exchanges.data.data 
        })
      }))
  }


  render() {
    // console.log(this.state.exchanges)
    return (
      <Switch>
        {/* <Route path="/about"> */}
        {/* <About /> */}
        {/* </Route> */}
        <Route exact path="/assets/:id" component={Assets} />
        <Route exact path="/">
          <Coins
            data={this.state.data}
            coinInfo={this.state.coinInfo}
            wentUp={this.state.wentUp}
          />
        </Route>
      </Switch>

    )
  }
}
