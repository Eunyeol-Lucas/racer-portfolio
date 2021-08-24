import styled, { css } from "styled-components";
import Arrow from "./icons/Arrow.jsx";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 22px;
  color: #5e5f61;
  min-width: 24px;
  height: 24px;
  background: transparent;

  + button {
    margin-left: 4px;
  }

  ${(props) =>
    props.active &&
    css`
      color: #f9fafc;
      background: #524fa1;
      border-radius: 4px;
    `}
`;

const ArrowWrapper = styled.button`
  margin: ${(props) => (props.flip ? "0 0 0 15px !important" : "0 15px 0 0")};

  ${(props) =>
    props.flip &&
    css`
      transform: scaleX(-1);
    `}

  svg {
    display: block;
  }
`;

Pagination.defaultProps = {
  currPage: 0,
  pageCount: 5,
  onClickPage: () => {},
};

const MAX_PAGE_COUNT = 10;

function getPaginationArray(currentPage, total) {
  const resultList = [currentPage];

  let idx = 1;
  while (resultList.length < Math.min(MAX_PAGE_COUNT, total)) {
    if (currentPage - idx > -1) resultList.unshift(currentPage - idx);
    if (currentPage + idx < total) resultList.push(currentPage + idx);
    idx++;
  }

  return resultList;
}

export default function Pagination({ currPage, pageCount, onClickPage }) {
  return (
    <Wrapper>
      <ArrowWrapper
        onClick={() => currPage > 0 && onClickPage(currPage - 1)}
        disabled={currPage <= 0}
      >
        <Arrow />
      </ArrowWrapper>
      {getPaginationArray(currPage, pageCount).map((page) => {
        return (
          <Button
            onClick={() => onClickPage(page)}
            key={`page-button-${page}`}
            active={page === currPage}
          >
            {page + 1}
          </Button>
        );
      })}
      <ArrowWrapper
        flip
        onClick={() => currPage < pageCount - 1 && onClickPage(currPage + 1)}
        disabled={currPage >= pageCount - 1}
      >
        <Arrow />
      </ArrowWrapper>
    </Wrapper>
  );
}
