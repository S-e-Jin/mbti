import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mbtiData from "../data/nctMembers.json";
import "../styles/ResultPage.css";

function ResultPage() {
  const location = useLocation();
  const mbtiType = location.state?.mbtiType;
  const navigate = useNavigate();
  const mbtiInfo = mbtiData[mbtiType];
  const compatibleMember = mbtiInfo.compatibleTypes[0].description;
  const baseUrl = "https://mbti-one.vercel.app";

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {mbtiType ? (
        <div>
          <h1>당신의 유형은 {mbtiInfo.member[0].member}입니다.</h1>
          <br />
          <div>{mbtiInfo.member[0].description}</div>
          <br />
          <h2>
            당신과 어울리는 NCT 멤버는 다음과 같습니다
            <br />
            {compatibleMember}
          </h2>
        </div>
      ) : (
        <p>MBTI 유형이 제공되지 않았습니다.</p>
      )}
      <br />
      <button
        className="retry-btn"
        onClick={() => handleCopyClipBoard(`${baseUrl}${location.pathname}`)}
      >
        공유링크
      </button>
      <button className="retry-btn" onClick={() => navigate("/")}>
        다시하기
      </button>
    </div>
  );
}

export default ResultPage;
