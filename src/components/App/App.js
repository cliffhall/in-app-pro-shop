import React, { Component } from 'react';
import styled from "styled-components";
import { Panel } from "react-bootstrap";
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { DrizzleContext } from "drizzle-react";

import Navigation from '../Nav/Navigation'
import { Shop } from '../../domain';

const Wrapper = styled.section`
  padding: 5em;
`;

class App extends Component {

    // Render the component
    render() {
        const OWNER = '0x52908400098527886E0F7030069857D2E4169EE7';
        const ID = 52;
        const NAME = 'Barely Legal Pawn';
        const DESC = 'Great stuff, cheap!';

        let shop = new Shop(OWNER, ID, NAME, DESC);

        return <DrizzleContext.Consumer>
            {drizzleContext => {
                const {drizzle, drizzleState, initialized} = drizzleContext;
                return <Router>
                    <Wrapper>
                        <Navigation drizzle={drizzle} drizzleState={drizzleState} initialized={initialized}/>
                        <Panel>
                            <Panel.Heading>{shop.name}</Panel.Heading>
                            <Panel.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit massa a sapien faucibus pellentesque. Fusce laoreet massa in ultricies luctus. Integer quis vulputate est. Quisque luctus eros id neque accumsan ullamcorper. Suspendisse sit amet elit enim. Nam mi nibh, faucibus non dapibus non, tincidunt sit amet lacus. Fusce convallis, nisl eget porttitor dapibus, diam magna finibus est, ut lobortis turpis risus a ipsum.

                                Cras et malesuada mauris. Curabitur vel tortor id est posuere vulputate. Duis quis lorem eu erat ullamcorper bibendum. Fusce in diam quis nibh posuere auctor ac ut orci. Aliquam erat volutpat. Morbi et tincidunt est, congue venenatis mi. Mauris dictum nulla vitae ullamcorper venenatis. Nunc laoreet justo a enim molestie vehicula. Fusce malesuada sem vitae efficitur efficitur. Vestibulum ante lacus, accumsan id odio eget, venenatis feugiat quam. Maecenas in risus sit amet magna porta sodales. Fusce ornare a purus dignissim elementum. Sed sed leo et arcu elementum vehicula vel finibus elit. Sed scelerisque pharetra ante, at vulputate turpis dapibus in. Aliquam a erat ac nulla bibendum bibendum vitae sit amet nisi.

                                Aenean vel purus dignissim, fermentum risus vitae, hendrerit erat. Curabitur volutpat mi a pretium efficitur. Nunc dignissim euismod augue, nec faucibus eros. Suspendisse imperdiet leo sit amet dui mollis, et laoreet lacus viverra. Quisque nulla justo, varius et turpis non, cursus maximus dolor. In condimentum lectus porta turpis placerat tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent vel sapien vitae lorem tempus mollis. Vivamus consectetur convallis ex, at interdum urna ornare sed. Cras cursus convallis enim, a mattis leo ornare at.
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