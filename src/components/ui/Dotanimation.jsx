import React from 'react';
import styled from 'styled-components';

const Dotanimation = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;

  .container {
    width: 100%;
    height: 100%;
    background: lightblue;
    position: relative;
    overflow: hidden;
  }

  .container::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle,rgb(0, 0, 0) 10%, transparent 20%),
      radial-gradient(circle, transparent 10%,rgb(0, 0, 0) 20%);
    background-size: 30px 30px; /* Adjust the size of the pattern */
    animation: moveBackground 10s linear infinite; /* Adjust the animation duration and timing function */
  }

  @keyframes moveBackground {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(20%, 20%);
    }
  }`;

export default Dotanimation;
