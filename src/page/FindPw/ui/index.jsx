// PasswordChangeModal.js (예시)
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useChangePassword from '../api/useChangePassword';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  z-index: 9999;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 320px;
  z-index: 10000;
`;

function PasswordChangeModal({ mailToken, onClose }) {
  const [newPw, setNewPw] = useState('');
  const { changePassword, loading, errorMsg, success } = useChangePassword();

  const handleChangePassword = () => {
    changePassword(mailToken, newPw);
  };

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success, onClose]);

  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>비밀번호 변경</h2>
         {mailToken}
          <input
            type="password"
            value={newPw}
            onChange={e => setNewPw(e.target.value)}
            placeholder="새 비밀번호"
          />

        {loading && <p>변경 중...</p>}
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

        <button onClick={handleChangePassword}>변경하기</button>
        <button onClick={onClose}>취소</button>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default PasswordChangeModal;
