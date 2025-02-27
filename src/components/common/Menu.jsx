import React, { Component } from 'react'
import { Menu, Container } from 'semantic-ui-react'

export default class Navbar extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu fixed="top" style={{ height: "60px" }}>
                <Container>
                    <Menu.Item
                        name='browse'
                        active={activeItem === 'browse'}
                        onClick={this.handleItemClick}
                    >
                        Browse
        </Menu.Item>

                    <Menu.Item
                        name='submit'
                        active={activeItem === 'submit'}
                        onClick={this.handleItemClick}
                    >
                        Submit
        </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='signup'
                            active={activeItem === 'signup'}
                            onClick={this.handleItemClick}
                        >
                            Sign Up
          </Menu.Item>

                        <Menu.Item
                            name='help'
                            active={activeItem === 'help'}
                            onClick={this.handleItemClick}
                        >
                            Help
          </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}