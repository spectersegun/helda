"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";

type BlobVideoProps = {
  src: string;
  size?: number;
  scale?: number;
  shape?: "circle" | "rounded";
  radius?: string;
  className?: string;
  videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
};

const BlobVideoWindow = forwardRef<HTMLDivElement, BlobVideoProps>(
  (
    {
      src,
      size = 200,
      scale = 4.65,
      shape = "circle",
      radius = "9999px",
      className,
      videoProps,
    },
    ref
  ) => {
    const roundedStyle =
      shape === "circle"
        ? { borderRadius: "9999px" }
        : { borderRadius: radius };

    return (
      <div
        className={clsx("grid place-items-center mb-2 py-5", className)}
        ref={ref}
      >
        <div
          className="max-w-full overflow-hidden relative"
          style={{
            width: size,
            height: size,
            aspectRatio: "1 / 1",
            ...roundedStyle,
          }}
        >
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            {...videoProps}
            className={clsx(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "object-cover object-center origin-center"
            )}
            style={{
              width: 750,
              height: "auto",
              transform: `scale(${scale}) translate(-50%, -50%)`,
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }
);

BlobVideoWindow.displayName = "BlobVideoWindow";

export default BlobVideoWindow;
