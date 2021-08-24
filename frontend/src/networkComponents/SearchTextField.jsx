import styled from "styled-components";
import MagnifyingGlass from "./icons/MagnifyingGlass.jsx";

// 이곳에 컨테이너 스타일을 넣으세요
const Container = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 12px;

  svg {
    position: absolute;
    top: 15px;
    left: 12px;
  }
`;

// 이곳에 Input의 스타일을 넣으세요
const Input = styled.input`
  padding: 11px 11px 11px 39px;
  border: 1px solid #c9cacc;
  border-radius: 4px;
  height: 46px;
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  line-height: 22px;
  color: #7d7e80;
`;

SearchTextField.defaultProps = {
  value: "",
  onChange: () => {},
};

function debounce(func, timeout) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export default function SearchTextField({ value, onChange }) {
  const debouncedOnChange = debounce(onChange, 500);

  return (
    <Container>
      <MagnifyingGlass />
      <Input
        placeholder="이름으로 검색."
        onChange={(e) => {
          debouncedOnChange(e.target.value);
        }}
      />
    </Container>
  );
}
