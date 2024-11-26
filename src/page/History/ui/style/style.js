import styled from "styled-components";

export const StyledPopupContainerDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  z-index: 1000;
`;

export const StyledTitleH2 = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #3b5998;
  margin-bottom: 20px;
`;

export const StyledCloseButton = styled.button`
  position: absolute;
    top: 10px;
    right: 10px;
    width: 12px;
    height: 12px;
    background-color: #DA1E28;
    border: none;
    border-radius: 50%;
    cursor: pointer;
`;

export const StyledIconContainerDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: #e0e7ff;
  border-radius: 50%;
  margin: 0 auto 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled.div`
  font-size: 50px;
  color: #3b5998;
`;

export const StyledFileInputContainerDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const StyledFilePathInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 14px;
  color: #888;
`;

export const StyledFileSelectButton = styled.button`
  margin-left: 10px;
  padding: 10px;
  background-color: #3b5998;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #334a7d;
  }
`;

export const StyledUploadButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3b5998;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #334a7d;
  }
`;