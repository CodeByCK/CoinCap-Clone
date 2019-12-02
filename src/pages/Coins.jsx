import React, { Component, Fragment } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import List from '../components/common/List'
import Navbar from '../components/common/Menu'


export default class Coins extends Component {
    render() {
        let headers = ['MARKET CAP', 'EXCHANGE VOL', 'ASSETS', 'EXCHANGES', 'MARKETS', 'BTC DOM INDEX']
        return (
            <Fragment>
                <div style={{ background: '#ECEFF1', height: '100vh' }}>
                    <Navbar />
                    <div style={{ height: '260px', background: 'linear-gradient(to right, rgb(63, 81, 181), rgb(100, 181, 246)) rgb(255, 255, 255)' }}>
                        <Container style={{ padding: '6em 0em 0 0em' }}>
                            <Grid columns={6} centered>
                                <Grid.Row textAlign='centered' style={{ color: 'white' }}>
                                    {headers.map(x => (
                                        <Grid.Column textAlign='centered'>
                                            {x}
                                        </Grid.Column>
                                    ))
                                    }
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </div>
                    <Container style={{ marginTop: '-8em' }}>
                        <List
                            data={this.props.data}
                            coinInfo={this.props.coinInfo}
                            wentUp={this.props.wentUp}
                        />
                    </Container>
                </div>
            </Fragment>
        )
    }
}
