import styled from 'styled-components';

export const FlexRow = styled.section`
  display: flex;
   @media (max-width: 1023px) {
    flex-wrap: wrap;
  }
`;

export const FlexChild = styled.div`
  margin: 25px;
`;