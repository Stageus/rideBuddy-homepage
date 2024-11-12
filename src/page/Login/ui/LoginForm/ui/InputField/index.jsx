import React from 'react';
import { StyledErrorMessage, StyledInput, StyledLink } from '../../../../../../style/styles';
import { SpaceBetweenDiv } from './style/style';
import { StyledInputDiv } from '../../style/style';

const InputField = ({ label, id, type = 'text', placeholder, value, onChange, errorMessage, link ,status}) => (
  <StyledInputDiv>
    <label htmlFor={id}>{label}</label>
    <StyledInput
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      required
      status={status}
    />
    <SpaceBetweenDiv padding="1px">
      {errorMessage ? (
        <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
      ) : (
        <StyledErrorMessage style={{ opacity: 0 }}>메세지 출력</StyledErrorMessage>
      )}
      {link && <StyledLink to={link.to}>{link.text}</StyledLink>}
    </SpaceBetweenDiv>
  </StyledInputDiv>
);

export default InputField;
