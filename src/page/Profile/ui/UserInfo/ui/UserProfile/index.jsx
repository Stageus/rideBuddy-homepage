import { Link } from 'react-router-dom';
import {
  StyledAvatarContainerDiv,
  StyledAvatarImg,
  StyledEditButtonButton,
  StyledProfileEmailP,
  StyledProfileInfoDiv,
  StyledProfileNameP,
  StyledUserProfileContainerDiv,
} from './style/style';

const UserProfile = ({ user }) => {
  // user 정보가 없으면 렌더링하지 않음
  if (!user) return null;
  const isOAuth = localStorage.getItem('OAuth') === 'true';

  // user.img_url이 없을 경우 기본값(빈 문자열 등) 사용 가능
  const profileImageUrl = user.img_url ? user.img_url : '';

  return (
    <StyledUserProfileContainerDiv>
      <StyledAvatarContainerDiv>
        {/* 프로필 이미지 */}
        <StyledAvatarImg
          src={profileImageUrl || 'img/icon_user.svg'}
          alt={user.account_name || '프로필 이미지'}
        />
        <Link to="/history">
          <StyledEditButtonButton>
            <img src="img/icon_pen.png" alt="" width={'26px'} height={'26px'}/>
          </StyledEditButtonButton>
        </Link>
      </StyledAvatarContainerDiv>

      <StyledProfileInfoDiv>
        <StyledProfileNameP>
          {user.account_name || '이름 없음'}
        </StyledProfileNameP>
        {!isOAuth && 
          <StyledProfileEmailP>
          {user.mail || '이메일 정보 없음'}
          </StyledProfileEmailP>
        }
      
      </StyledProfileInfoDiv>
    </StyledUserProfileContainerDiv>
  );
};

export default UserProfile;
