import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  StyledPopupContainerDiv, 
  StyledTitleH2, 
  StyledCloseButton, 
  StyledInputContainerDiv, 
  StyledPasswordInput, 
  StyledUpdateButton,
  ModalOverlay
} from './style/style';
import useChangePassword from '../api/useChangePassword';

function PasswordChangeModal({ mailToken, onClose }) {
  const [newPw, setNewPw] = useState('');
  const { changePassword, loading, errorMsg, success } = useChangePassword();

  const handleChangePassword = () => {
    changePassword(mailToken, newPw);
  };

  useEffect(() => {
    if (success) {
      alert('변경 완료 되었습니다.');
      window.location.href = '/login';
      onClose();
    }
  }, [success, onClose]);

  useEffect(() => {
    if (errorMsg) {
      alert(errorMsg);
      window.location.href = '/login';
    }
  }, [errorMsg]);

  return (
    <ModalOverlay>
      <StyledPopupContainerDiv>
        <StyledCloseButton onClick={onClose} />
        <StyledTitleH2>비밀번호 변경</StyledTitleH2>
        <StyledInputContainerDiv>
          <StyledPasswordInput
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            placeholder="새 비밀번호"
          />
          <StyledUpdateButton onClick={handleChangePassword} disabled={loading}>
            변경
          </StyledUpdateButton>
        </StyledInputContainerDiv>
      </StyledPopupContainerDiv>
    </ModalOverlay>
  );
}

export default PasswordChangeModal;
