import styled from 'styled-components';

export const StyledPopupContainerDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.colors.overlay};
  padding: 20px;
  z-index: 1000;
`;

export const StyledTitleH2 = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.heading4};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary60};
  margin-bottom: 20px;
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 12px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.error};
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

export const StyledInputContainerDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledPhoneInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.coolGray20};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSizes.bodyS};
  color: ${({ theme }) => theme.colors.coolGray40};
`;

export const StyledUpdateButton = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.colors.primary60};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.buttonS};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
