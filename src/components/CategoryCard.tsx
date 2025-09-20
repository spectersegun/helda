import React from "react";
import styled, { keyframes, css } from "styled-components";

type Props = {
  label: string;
  imgSrc: string;
  selected?: boolean;
  accentHex?: string; // e.g. "#1f664b" (hospital green)
  onClick?: () => void;
};

const hexToRgba = (hex: string, alpha = 1) => {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/* ================= Animations ================= */
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const floatAnim = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-6px); }
  100% { transform: translateY(0); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 var(--glowColor); }
  50%      { box-shadow: 0 0 0 12px rgba(0,0,0,0); }
`;

/* ================= Styled ================= */
const Tile = styled.button<{
  $selected?: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: min(232px, 20vw);
  height: min(315px, 35vh);

  border-radius: 16px;
  transition: transform 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out both;
  transform-origin: center;

  ${({ $selected }) =>
    $selected
      ? css`
          animation: ${pop} 0.25s ease-out;
        `
      : css`
          &:hover {
            animation: ${floatAnim} 4s ease-in-out infinite;
          }
        `}
`;

const ImageWrap = styled.div<{
  $accent: string;
  $selected?: boolean;
}>`
  width: min(163px, 15vw);
  height: min(226px, 25vh);
  border-radius: 16px;
  overflow: hidden;
  background: #fff !important;

  border: 2px solid ${({ $accent }) => $accent};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${({ $selected, $accent }) =>
    $selected
      ? css`
          transform: scale(1.02);
          box-shadow: 0 4px 7px -1px ${hexToRgba($accent, 1)};
        `
      : css`
          &:hover {
            transform: scale(1.05);
          }
          &:active {
            transform: scale(1.02);
          }
        `}
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Pill = styled.div<{
  $accent: string;
  $selected?: boolean;
}>`
  margin-top: 12px;
  width: min(232px, 20vw);
  height: min(49px, 6vh);
  border-radius: 999px;

  border: 2px solid ${({ $accent }) => $accent};
  display: grid;
  place-items: center;
  font-weight: 600;

  transition: transform 0.2s ease, background-color 0.3s ease, color 0.3s ease;

  ${({ $selected, $accent }) =>
    $selected
      ? css`
          background: ${$accent};
          color: #fff;
          box-shadow: 0 4px 7px -1px ${hexToRgba($accent, 1)};
        `
      : css`
          background: #fff;
          color: ${$accent};
          &:active {
            transform: scale(1.02);
          }
        `}
`;

const GlowRing = styled.span<{
  $accent: string;
}>`
  --glowColor: ${({ $accent }) => hexToRgba($accent, 0.45)};
  position: absolute;
  inset: 0;
  border-radius: 16px;
  pointer-events: none;
  animation: ${glowPulse} 1.8s ease-out infinite;
`;

export const CategoryCard: React.FC<Props> = ({
  label,
  imgSrc,
  selected = false,
  accentHex = "#1f664b",
  onClick,
}) => {
  return (
    <Tile
      type="button"
      onClick={onClick}
      $selected={selected}
      aria-pressed={selected}
    >
      <ImageWrap $accent={accentHex} $selected={selected}>
        <Img src={imgSrc} alt={`${label} image`} />
      </ImageWrap>

      <Pill $accent={accentHex} $selected={selected}>
        {label}
      </Pill>

      {selected && <GlowRing $accent={accentHex} />}
    </Tile>
  );
};
