import React, { Component, Fragment } from 'react'
import Navbar from '../components/common/Menu'
import Axios from 'axios'
import { Container, Header, Grid } from 'semantic-ui-react'
import { Doughnut } from 'react-chartjs-2';

export default class Assets extends Component {

    state = {
        loading: false,
        interval: 'd1',
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

    render() {
        // console.log(this.props.match.params.id);
        const { id } = this.props.match.params
        console.log(this.state.graphData)
        // console.log(this.state.coinData.data.maxSupply)
        // console.log(id)


        return (
            <Fragment>
                <Navbar />
                <div style={{ background: '#ECEFF1', height: '100vh' }}>
                    <div style={{ height: '260px', background: 'linear-gradient(to right, rgb(63, 81, 181), rgb(100, 181, 246)) rgb(255, 255, 255)' }}>
                        <Container style={{ padding: '6em 0em 0 0em' }}>
                            <h1>YOU ARE LOOKING AT {id}</h1>
                            {/* {this.state.loading && this.state.coinInfo.length === 0
                                ? <h1>...Loading</h1>
                                : <h1>{this.state.coinData}</h1>
                            } */}
                            <Doughnut data={this.state.graphData.map(x => x)} />

                        </Container>
                    </div>
                </div>
            </Fragment>
        )
    }
}
