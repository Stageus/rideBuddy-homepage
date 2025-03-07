// style/style.js
import styled from 'styled-components';

export const StyledIconDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: ${({ theme }) => theme.colors.primary60};
font-size: 12px;

img {
    margin-bottom: 5px;
}
`;