import styled from 'styled-components';

export const StyledUserProfileContainerDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const StyledAvatarContainerDiv = styled.div`
  position: relative;
  margin-right: 15px;
`;

export const StyledAvatarImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.primary60 };
`;

export const StyledEditButtonButton = styled.button`
  position: absolute;
  bottom: -5px;
  right: -5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const StyledProfileInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledProfileNameP = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
`;

export const StyledProfileEmailP = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyXS};
`;

export const StyledProfilePhoneP = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyXS};
`;
