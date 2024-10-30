import React, { useState } from "react";
import { 
  StyledListButton, 
  StyledActionButtonContainerDiv, 
  StyledLikeListContainerDiv, 
  StyledLikeListDescriptionP, 
  StyledLikeListImg, 
  StyledLikeListTitleH2,
  StyledListUl,
  StyledListItemLi // 추가된 리스트 아이템 스타일
} from "./style/style";

// 예시 리스트 데이터
const CERTIFICATION_CENTER_LIST = [
  { id: 1, icon: "💙", name: "아라 자전거길" },
  { id: 2, icon: "💙", name: "한강 자전거길" },
];

const NATIONAL_TOUR_LIST = [
  { id: 1, icon: "💙", name: "낙동강 자전거길" },
  { id: 2, icon: "💙", name: "섬진강 자전거길" },
];

const LikeList = () => {
  const [activeTab, setActiveTab] = useState("certification");

  // 탭에 따라 보여줄 리스트 데이터 선택
  const currentList = activeTab === "certification" ? CERTIFICATION_CENTER_LIST : NATIONAL_TOUR_LIST;

  return (
    <StyledLikeListContainerDiv>
      <StyledLikeListTitleH2>좋아요 리스트</StyledLikeListTitleH2>
      <StyledLikeListDescriptionP>Like Ridebuddy</StyledLikeListDescriptionP>

      <StyledLikeListImg src="img/Logo_list.png" alt="자전거 이미지" />

      {/* 탭 버튼 */}
      <StyledActionButtonContainerDiv>
        <StyledListButton
          width={"110px"}
          onClick={() => setActiveTab("certification")}
          active={activeTab === "certification"}
        >
          인증 센터
        </StyledListButton>
        <StyledListButton
          width={"110px"}
          onClick={() => setActiveTab("tour")}
          active={activeTab === "tour"}
        >
          국토 종주
        </StyledListButton>
      </StyledActionButtonContainerDiv>

      {/* 리스트 출력 */}
      <StyledListUl>
        {currentList.map((item) => (
          <StyledListItemLi key={item.id}>
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </StyledListItemLi>
        ))}
      </StyledListUl>
    </StyledLikeListContainerDiv>
  );
};

export default LikeList;
