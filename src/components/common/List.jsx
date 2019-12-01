import React, { useState } from 'react'
import { Table } from 'semantic-ui-react'
import numeral from 'numeral'
import './List.css'

const List = ({ data, coinInfo, wentUp }) => {

    return (
        <Table singleline style={{ borderRadius: '0.28em', boxShadow: '0px 0px 11px 0px rgba(0,0,0,0.4)' }} textAlign={'center'} singleline>
            <Table.Header>
                <Table.Row >
                    <Table.HeaderCell>Rank</Table.HeaderCell>
                    <Table.HeaderCell textAlign={'left'}>Name</Table.HeaderCell>
                    <Table.HeaderCell textAlign={'right'}>Price</Table.HeaderCell>
                    <Table.HeaderCell>Market Cap</Table.HeaderCell>
                    <Table.HeaderCell>VWAP 24Hr</Table.HeaderCell>
                    <Table.HeaderCell>Supply</Table.HeaderCell>
                    <Table.HeaderCell>Volume 24Hr</Table.HeaderCell>
                    <Table.HeaderCell>Change 24Hr</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            {data.map(coin => {
                let { rank, name, priceUsd, marketCapUsd, vwap24Hr, supply, volumeUsd24Hr, symbol, changePercent24Hr } = coin
                return (
                    <Table.Body key={symbol}>
                        <Table.Row style={{ height: '57px' }}>
                            <Table.Cell>{rank}</Table.Cell>
                            <Table.Cell textAlign={'left'}>{name}</Table.Cell>
                            <Table.Cell textAlign={'right'}>{numeral(priceUsd).format('($ 0.00)')}</Table.Cell>
                            <Table.Cell>{numeral(marketCapUsd).format('($ 0.00a)')}</Table.Cell>
                            <Table.Cell>{numeral(vwap24Hr).format('($ 0,0[.]00)')}</Table.Cell>
                            <Table.Cell>{numeral(supply).format('0.0a')}</Table.Cell>
                            <Table.Cell>{numeral(volumeUsd24Hr).format('($ 0.00a)')}</Table.Cell>
                            <Table.Cell style={changePercent24Hr.includes('-') ? { color: 'red' } : { color: 'green' }}>
                                {numeral(changePercent24Hr).format('0.00')} %
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                )
            })}

        </Table>
    )
}

export default List