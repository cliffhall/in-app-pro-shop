import {injectGlobal} from "styled-components";

import {KitTable} from "./kit/KitTable";
import {KitWrapper} from "./kit/KitWrapper";
import {FlexRow, FlexChild} from "./kit/KitFlex";
import {KitWell, KitSlidingWell} from "./kit/KitWell";
import {KitButton, KitToggleButton, KitToggleButtonGroup} from "./kit/KitButton";
import {KitForm, KitFormControl, KitCurrencyInput, KitHelpBlock} from "./kit/KitForm";
import {KitPanel, AppSlidingPanel, KitPanelHeading, KitPanelTitle, KitPanelBody, KitPanelGroup} from "./kit/KitPanel";
import {KitNavbar, KitNavbarHeader, KitNav, KitNavbarBrand, KitNavDropdown, KitMenuItem, KitMonoMenuItem} from "./kit/KitNav";

export {
    KitWrapper,
    KitNavbar,
    KitNavbarHeader,
    KitNav,
    KitNavbarBrand,
    KitNavDropdown,
    KitMenuItem,
    KitMonoMenuItem,
    KitWell,
    KitSlidingWell,
    FlexRow,
    FlexChild,
    KitPanel,
    AppSlidingPanel,
    KitPanelHeading,
    KitPanelTitle,
    KitPanelBody,
    KitPanelGroup,
    KitButton,
    KitToggleButton,
    KitToggleButtonGroup,
    KitTable,
    KitForm,
    KitFormControl,
    KitCurrencyInput,
    KitHelpBlock
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