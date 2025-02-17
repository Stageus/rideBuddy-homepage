import { Link } from 'react-router-dom';
import {
  StyledAvatarContainerDiv,
  StyledAvatarImg,
  StyledEditButtonButton,
  StyledProfileEmailP,
  StyledProfileInfoDiv,
  StyledProfileNameP,
  StyledProfilePhoneP,
  StyledUserProfileContainerDiv,
} from './style/style';

const UserProfile = ({ user }) => {
  if (!user) return null; // user 정보가 없으면 렌더링하지 않음

  return (
    <StyledUserProfileContainerDiv>
      <StyledAvatarContainerDiv>
        {/* 프로필 이미지가 없으면 default 이미지 또는 빈 문자열 사용 */}
        <StyledAvatarImg
          src={user.profile_img ? user.profile_img : ''}
          alt={user.name || '프로필 이미지'}
        />
        <Link to="/history">
          <StyledEditButtonButton>✏️</StyledEditButtonButton>
        </Link>
      </StyledAvatarContainerDiv>
      <StyledProfileInfoDiv>
        <StyledProfileNameP>{user.account_name || '이름 없음'}</StyledProfileNameP>
        <StyledProfileEmailP>{user.mail || '이메일 정보 없음'}</StyledProfileEmailP>
        {/* API에 전화번호가 포함되어 있지 않다면, 조건부 렌더링 */}
        {user.phone && (
          <StyledProfilePhoneP>{user.phone}</StyledProfilePhoneP>
        )}
      </StyledProfileInfoDiv>
    </StyledUserProfileContainerDiv>
  );
};

export default UserProfile;
