import styled from 'styled-components';
import {Panel, PanelGroup} from 'react-bootstrap';

export const FlexRow = styled.section`
  display: flex;
   @media (max-width: 1023px) {
    flex-wrap: wrap;
  }
`;

export const PanelBodyFlexRow = styled(Panel.Body)`
  display: flex;
   @media (max-width: 1023px) {
    flex-wrap: wrap;
  }
`;

export const PanelGroupFlexCol = styled(PanelGroup)`
  margin: 25px;
  flex-grow: 2;
`;

export const FlexChild = styled.div`
  margin: 25px;
`;