import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
// import moment from 'react-moment'
import { format } from 'date-fns'

export default class Chart extends Component {
    render() {
        // console.log(this.props.data.map(x => x.date))
        const chartOptions = {
            title: {
                display: false,
                text: 'Coin',
                fontSize: 20
            },
            legend: {
                display: false,
                position: 'right'
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
        return (
            <div>
                <Line
                    data={{
                        labels: this.props.data.map(x => format(new Date(x.date), 'ha')),
                        // labels: this.props.data.map(x => x.date),
                        datasets: [
                            {
                                label: 'Price',
                                fill: true,
                                borderCapStyle: 'butt',
                                lineTension: 0,
                                backgroundColor: this.props.change < 0 ? '#FDD9D7' : '#DCFBEF',
                                borderColor: this.props.change < 0 ? '#fc2515' : '#4FEDAD',
                                borderWidth: 3,
                                borderJoinStyle: 'miter',
                                pointStyle: 'cross',
                                spanGaps: true,
                                steppedLine: true,
                                data: this.props.data.map(x => parseFloat(x.priceUsd).toFixed(2))
                            }
                        ]
                    }}
                    options={chartOptions}
                />
            </div>
        )
    }
}
