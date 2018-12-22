import {injectGlobal} from 'styled-components';
import {AppWrapper} from "./components/AppWrapper";
import {AppWell} from "./components/AppWell";
import {AppTable} from "./components/AppTable";
import {FlexRow, FlexChild} from "./components/AppFlex";
import {AppForm, AppFormControl, AppCurrencyInput, AppHelpBlock} from "./components/AppForm";
import {AppNavbar, AppNavbarHeader, AppNav, AppNavbarBrand, AppNavDropdown, AppMenuItem, AppMonoMenuItem} from "./components/AppNav";
import {AppButton, AppToggleButton, AppToggleButtonGroup} from "./components/AppButton";
import {AppPanel, AppPanelHeading, AppPanelTitle, AppPanelBody, AppPanelGroup} from "./components/AppPanel";

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
    FlexRow,
    FlexChild,
    AppPanel,
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