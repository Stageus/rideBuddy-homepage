import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { doubledCounterState } from '../../shared/recoil/selectors/counterSelector';
import { counterState } from '../../shared/recoil/atoms/counterAtom';
import { Button, Container, Input, StyledLink, Text } from '../../style/styles';

// 추가적인 스타일링이 필요한 경우 별도로 정의
const PageWrapper = styled(Container)`
  max-width: 800px;
  margin: 0 auto;
`;

const Main = () => {
  const doubledCount = useRecoilValue(doubledCounterState);
  const [count, setCount] = useRecoilState(counterState);

  return (
    <PageWrapper>
      <Text size="heading1" weight="bold" color="primary90">메인 페이지</Text>
      <Text size="bodyM">이 페이지는 `styles.js`에 정의된 공통 스타일을 사용 테스트</Text><br></br>
      
      <Input placeholder="여기에 입력하세요"/>

      <Button width="150px">확인 버튼</Button><br></br><br></br>
      <Button width="200px">취소 버튼</Button>

      <div style={{ marginTop: '20px' }}>
        <StyledLink href="#">링크 스타일 테스트</StyledLink>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h1>Doubled Counter: {doubledCount}</h1>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h1>Counter: {count}</h1>
        <button onClick={() => setCount(count + 1)} style={{ marginTop: '20px' }}>Increase</button>
        <button onClick={() => setCount(count - 1)}>Decrease</button>
      </div>

    </PageWrapper>
  );
};

export default Main;
