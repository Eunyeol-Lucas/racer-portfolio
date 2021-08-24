import * as Card from "./Card.js";

UserCard.defaultProps = {
  profile_image: "default.png",
  username:
   "김아무개1",
  introduction: "엘리서 소개",
};

export default function UserCard({
  profile_image,
  username,
  introduction,
}) {
  // Card에 담겨져있는 컴포넌트들을 조합하여 트랙카드를 만드세요
  return (
    <Card.Container large>
      <Card.Corner />
      <Card.TrackCardIcon src={profile_image} alt={profile_image} />
      <Card.Title large>{username}</Card.Title>
      <Card.Description large>{introduction}</Card.Description>
      <button>정보 보기</button>
    </Card.Container>
  );
}
