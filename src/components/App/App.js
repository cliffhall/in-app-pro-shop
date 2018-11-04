import React, { Component } from 'react';
import styled from "styled-components";
import { Panel } from "react-bootstrap";
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { DrizzleContext } from "drizzle-react";

import Navigation from '../Nav/Navigation'

const Wrapper = styled.section`
  padding: 5em;
`;

class App extends Component {

    // Render the component
    render() {

        return <DrizzleContext.Consumer>
            {drizzleContext => {
                const {drizzle, drizzleState, initialized} = drizzleContext;
                return <Router>
                    <Wrapper>
                        <Navigation drizzle={drizzle} drizzleState={drizzleState} initialized={initialized}/>
                        <Panel>
                            <Panel.Heading>Create a Shop for your App</Panel.Heading>
                            <Panel.Body>
                                <p>
                                The goal of In-App Pro Shop is to allow Ethereum developers to add in-app purchases quickly
                                and to make it easy to support assets from other apps, if you so choose.
                                </p>

                                <p>
                                Using smart contracts that live on the blockchain and a web-based maintenance
                                application, it implements a franchise system, whereby you can create a Shop,
                                define and categorize the <a href="https://en.wikipedia.org/wiki/Stock_keeping_unit"  rel="noopener noreferrer" target="_blank">SKU</a>s
                                that identify the products they will sell, and integrate that Shop into their application.
                                </p>

                                <p>
                                Your application can then interact with the In-App Pro Shop smart contracts
                                to allow users to purchase items, which are minted as <a href="http://erc721.org/" rel="noopener noreferrer" target="_blank">ERC-721 non-fungible tokens</a>.
                                </p>

                                <p>
                                A small percentage of each sale goes to the franchise owner (<a href="http://futurescale.com" rel="noopener noreferrer" target="_blank">Futurescale, Inc.</a>),
                                and the rest is immediately available for withdrawal by the Shop Owner.
                                </p>
                            </Panel.Body>
                        </Panel>
                    </Wrapper>
                </Router>;
            }}
        </DrizzleContext.Consumer>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    //user: state.messageState.user
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    //dispatch: dispatch
});


// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(App);