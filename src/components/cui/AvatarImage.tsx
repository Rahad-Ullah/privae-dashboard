"use client";

import React, { useState } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";
import { userImage } from "@/app/assets/assets";

interface AvatarImageProps extends Omit<ImageProps, "src" | "onError"> {
  src?: string | null;
  fallbackSrc?: StaticImageData | string;
}

export default function AvatarImage({
  src,
  fallbackSrc = userImage,
  alt = "avatar",
  ...props
}: AvatarImageProps) {
  const [error, setError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setError(false);
  }

  return (
    <Image
      {...props}
      src={error || !src ? fallbackSrc : src}
      alt={alt}
      onError={() => {
        setError(true);
      }}
    />
  );
}
