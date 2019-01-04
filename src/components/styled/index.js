import {injectGlobal} from "styled-components";

import {AppTable} from "./app/AppTable";
import {AppWrapper} from "./app/AppWrapper";
import {FlexRow, FlexChild} from "./app/AppFlex";
import {AppWell, AppSlidingWell} from "./app/AppWell";
import {AppButton, AppToggleButton, AppToggleButtonGroup} from "./app/AppButton";
import {AppForm, AppFormControl, AppCurrencyInput, AppHelpBlock} from "./app/AppForm";
import {AppPanel, AppSlidingPanel, AppPanelHeading, AppPanelTitle, AppPanelBody, AppPanelGroup} from "./app/AppPanel";
import {AppNavbar, AppNavbarHeader, AppNav, AppNavbarBrand, AppNavDropdown, AppMenuItem, AppMonoMenuItem} from "./app/AppNav";

export {
    AppWrapper,
    AppNavbar,
    AppNavbarHeader,
    AppNav,
    AppNavbarBrand,
    AppNavDropdown,
    AppMenuItem,
    AppMonoMenuItem,
    AppWell,
    AppSlidingWell,
    FlexRow,
    FlexChild,
    AppPanel,
    AppSlidingPanel,
    AppPanelHeading,
    AppPanelTitle,
    AppPanelBody,
    AppPanelGroup,
    AppButton,
    AppToggleButton,
    AppToggleButtonGroup,
    AppTable,
    AppForm,
    AppFormControl,
    AppCurrencyInput,
    AppHelpBlock
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