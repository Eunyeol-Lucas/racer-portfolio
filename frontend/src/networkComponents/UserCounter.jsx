import styled from "styled-components";

const Text = styled.p`
  width: 100%;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  color: #151618;
  box-shadow: inset 0px -1px 0px #e1e2e4;
  padding: 12px 0;
  margin-bottom: 12px;
`;

UserCount.defaultProps = {
  count: 0,
};

export default function UserCount({ count }) {
  return <Text>전체 {count}개</Text>;
}
