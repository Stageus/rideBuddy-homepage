// PasswordChangePopup.js
import React, { useState, useEffect } from 'react';
import {
  StyledCloseButton,
  StyledInputContainerDiv,
  StyledPasswordInput,
  StyledPopupContainerDiv,
  StyledTitleH2,
  StyledUpdateButton,
} from './style/style';
import useChangePw from './api/useChangePw';

const PasswordChangePopup = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState('');

  const { isLoading, isSuccess, errorMessage, changePw } = useChangePw();

  useEffect(() => {
    if (isSuccess) {
      alert('비밀번호가 성공적으로 변경되었습니다.');
      onClose();
    }
  }, [isSuccess, onClose]);

  // "수정" 버튼 클릭 시 실행될 함수
  const handleUpdate = () => {
    // changePw 함수를 호출하여 API 요청
    changePw(newPassword);
  };

  return (
    <StyledPopupContainerDiv>
      <StyledCloseButton onClick={onClose} />
      <StyledTitleH2>비밀번호 수정</StyledTitleH2>

      <StyledInputContainerDiv>
        <StyledPasswordInput
          type="password"
          placeholder="새 비밀번호 입력"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <StyledUpdateButton onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? '처리 중...' : '수정'}
        </StyledUpdateButton>
      </StyledInputContainerDiv>

      {/* 에러 메시지 표시 */}
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '8px' }}>
          {errorMessage}
        </div>
      )}
    </StyledPopupContainerDiv>
  );
};

export default PasswordChangePopup;
