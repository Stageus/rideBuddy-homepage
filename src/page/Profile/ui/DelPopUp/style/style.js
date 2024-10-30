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
  text-align: center;
  z-index: 1000;
`;

export const StyledDeleteAccountTitleH2 = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.heading4};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.error};
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

export const StyledIconContainerDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.coolGray10};
  border-radius: 50%;
  margin: 0 auto 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledWarningIconDiv = styled.div`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.error};
`;

export const StyledWarningMessageP = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyM};
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 20px;
`;

export const StyledConfirmButton = styled.button`
  width: 80px;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.buttonS};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
