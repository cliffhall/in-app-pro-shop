import {injectGlobal} from 'styled-components';
import {AppNavbar, AppNavbarHeader, AppNav, AppNavbarBrand, AppNavDropdown, AppMenuItem, AppMonoMenuItem} from "./components/AppNav";
import {AppWell} from "./components/AppWell";
import {AppButton} from "./components/AppButton";
import {FlexRow, FlexChild} from "./components/AppFlex";
import {AppPanel, AppPanelHeading, AppPanelTitle, AppPanelBody, AppPanelGroup} from "./components/AppPanel";

export {
    AppNavbar,
    AppNavbarHeader,
    AppNav,
    AppNavbarBrand,
    AppNavDropdown,
    AppMenuItem,
    AppMonoMenuItem,
    AppWell,
    FlexRow,
    FlexChild,
    AppPanel,
    AppPanelHeading,
    AppPanelTitle,
    AppPanelBody,
    AppPanelGroup,
    AppButton
}

injectGlobal`
    @font-face {
        font-family: "Raleway";
        font-style: normal;
        src: url("fonts/Raleway/Raleway-Regular.ttf");
    }

    @font-face {
        font-family: "Raleway Semi-Bold";
        font-style: normal;
        src: url("fonts/Raleway/Raleway-SemiBold.ttf");
    }

    @font-face {
        font-family: 'PT Mono';
        font-style: normal;
        src: url("fonts/PT_Mono/PTM55FT.ttf");
    }

    body {
        font-family: 'Raleway', sans-serif;
        font-size: 16px;
        background-color: #FEFEFE;
        min-width: 768px;
    }
`;