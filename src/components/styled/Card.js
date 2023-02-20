import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  border-radius: 0.5rem;
  width: 80%;

  margin-top: 50px;
  margin-bottom: 50px;

  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);

  box-shadow: 0 0 #0000, 0 0 #0000, var(--tw-shadow);
  padding: 2rem;
  @media (min-width: 768px) {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const CurveHeader = styled.div`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, 0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);
  background: #fffae6;
  border-bottom-right-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  width: 25rem;
`;
