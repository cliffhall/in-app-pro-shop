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

    // Render the component
    render() {

        return <DrizzleContext.Consumer>
            {drizzleContext => {
                const {drizzle, drizzleState, initialized} = drizzleContext;
                return <Wrapper>
                        <NavigationBar drizzle={drizzle} drizzleState={drizzleState} initialized={initialized}/>
                        {this.props.selectedShopId
                            ? <ShopView/>
                            : <SplashView/>}
                    </Wrapper>;
            }}
        </DrizzleContext.Consumer>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    selectedShopId: state.shopState.selectedShopId,
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    //dispatch: dispatch
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(App);