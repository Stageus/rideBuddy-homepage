import React from 'react';
import {
  StyledCloseButton,
  StyledConfirmButton,
  StyledDeleteAccountTitleH2,
  StyledIconContainerDiv,
  StyledPopupContainerDiv,
  StyledWarningIconDiv,
  StyledWarningMessageP,
} from './style/style';
import { useDeleteAccount } from './api/deleteAccount';


const DeleteAccountPopup = ({ onClose }) => {
  const { deleteAccount, loading, error } = useDeleteAccount();

  const handleConfirm = async () => {
    try {
      const result = await deleteAccount();
      console.log('회원 탈퇴 성공:', result);
      alert('탈퇴 되었습니다.')
      localStorage.removeItem("token");
      navigate("/login");   
    } catch (err) {
      console.error('회원 탈퇴 에러:', err.message);
      alert('실패')
    }
  };

  return (
    <StyledPopupContainerDiv>
      <StyledCloseButton onClick={onClose} />
      <StyledDeleteAccountTitleH2>회원탈퇴</StyledDeleteAccountTitleH2>
      <StyledIconContainerDiv>
        <StyledWarningIconDiv>😟</StyledWarningIconDiv>
      </StyledIconContainerDiv>
      <StyledWarningMessageP>정말로 탈퇴 하시겠습니까?</StyledWarningMessageP>
      <StyledConfirmButton onClick={handleConfirm} disabled={loading}>
        탈퇴
      </StyledConfirmButton>
    </StyledPopupContainerDiv>
  );
};

export default DeleteAccountPopup;
