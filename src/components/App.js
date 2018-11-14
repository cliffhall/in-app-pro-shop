import React, { Component } from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import { DrizzleContext } from "drizzle-react";

import NavigationBar from './NavigationBar';
import SplashView from './SplashView';
import ShopView from './ShopView';

const Wrapper = styled.section`
  padding: 5em;
`;

class App extends Component {

    renderNavigation = drizzleContext => {
        const {drizzle, drizzleState, initialized} = drizzleContext;
        return <NavigationBar drizzle={drizzle} drizzleState={drizzleState} initialized={initialized}/>;
    };

    renderAppContent = () => {
        return this.props.selectedShopId
            ? <ShopView/>
            : <SplashView/>;
    };

    render() {

        return <DrizzleContext.Consumer>
            {drizzleContext => {
                return <Wrapper>
                        {this.renderNavigation(drizzleContext)}
                        {this.renderAppContent()}
                    </Wrapper>;
            }}
        </DrizzleContext.Consumer>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    selectedShopId: state.shopState.selectedShopId,
});

// Export props-mapped HOC
export default connect(mapStateToProps)(App);