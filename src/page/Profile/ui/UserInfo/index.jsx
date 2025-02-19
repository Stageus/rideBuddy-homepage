import React, { useEffect } from 'react';
import { StyledUserInfoSection } from './style/style';
import UserProfile from './ui/UserProfile';
import UserProfileDetails from './ui/UserProfileDetails';
import useUserInfo from '../../../../shared/api/useUserInfo';

const UserInfo = () => {
  const { user, loading, error, fetchUserInfo } = useUserInfo();

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);
  
  return (
    <StyledUserInfoSection>
      <UserProfile user={user} />
      <UserProfileDetails user={user} />
    </StyledUserInfoSection>
  );
};

export default UserInfo;
