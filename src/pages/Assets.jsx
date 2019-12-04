import React, { Component, Fragment } from 'react'
import Navbar from '../components/common/Menu'
import Axios from 'axios'
import { Container, Header, Grid } from 'semantic-ui-react'
import Chart from '../components/common/Chart'
import numeral from 'numeral'

export default class Assets extends Component {

    state = {
        loading: false,
        interval: 'm1',
        graphData: [],
        coinData: []

    }

    componentDidMount() { this.fetchCoinData() }

    fetchCoinData = () => {
        const { id } = this.props.match.params
        this.setState({ loading: true })
        Axios.all([
            Axios.get(`https://api.coincap.io/v2/assets/${id}/history?interval=${this.state.interval}`),
            Axios.get(`https://api.coincap.io/v2/assets?ids=${id}`),
        ])
            .then(Axios.spread((graphData, coinData) => {
                this.setState({
                    graphData: [...graphData.data.data],
                    // coinData: coinData.data,
                    loading: false
                })
            }))
    }

    switchTime = (e) => {
        this.setState({
            interval: e.target.value
        }, () => this.fetchCoinData())
    }

    calculateChange = (data) => {
        if (data.length > 0 && data) {
            return numeral((data[data.length - 1].priceUsd - data[0].priceUsd) / data[data.length - 1].priceUsd * 100).format('0.00')
        }
        return
    }

    render() {
        const { id } = this.props.match.params
        let changePercentage = this.calculateChange(this.state.graphData)
        return (
            <Fragment>
                <Navbar />
                <div style={{ background: '#ECEFF1', height: '100vh' }}>
                    <div style={{ height: '260px', background: 'linear-gradient(to right, rgb(63, 81, 181), rgb(100, 181, 246)) rgb(255, 255, 255)' }}>
                        <Container style={{ padding: '6em 0em 0 0em' }}>
                            <h1>YOU ARE LOOKING AT {id}</h1>
                            <h1>Change: {changePercentage}</h1>
                            <Chart
                                data={this.state.graphData}
                                change={changePercentage}

                            />

                            <button value="m1" onClick={this.switchTime}>D1</button>
                            <button value="m5" onClick={this.switchTime}>M5</button>
                            <button value="m15" onClick={this.switchTime}>M15</button>
                            <button value="m30" onClick={this.switchTime}>M30</button>
                            <button value="h1" onClick={this.switchTime}>H1</button>
                            <button value="h2" onClick={this.switchTime}>H2</button>
                        </Container>
                    </div>
                </div>

            </Fragment>
        )
    }
}
