import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
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
    --s: 37px; /* control the size */

    --c: #0000,rgb(14, 14, 14) 0.5deg 119.5deg, #0000 120deg;
    --g1: conic-gradient(from 60deg at 56.25% calc(425% / 6), var(--c));
    --g2: conic-gradient(from 180deg at 43.75% calc(425% / 6), var(--c));
    --g3: conic-gradient(from -60deg at 50% calc(175% / 12), var(--c));
    background: var(--g1), var(--g1) var(--s) calc(1.73 * var(--s)), var(--g2),
      var(--g2) var(--s) calc(1.73 * var(--s)), var(--g3) var(--s) 0,
      var(--g3) 0 calc(1.73 * var(--s)) #1e1e1e;
    background-size: calc(2 * var(--s)) calc(3.46 * var(--s));
  }
`;

export default Pattern;
