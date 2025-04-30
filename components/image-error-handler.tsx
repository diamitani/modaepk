"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackSrc?: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  style?: React.CSSProperties
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  width,
  height,
  fill = false,
  className = "",
  style = {},
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
  }

  // Generate placeholder URL with the alt text
  const placeholderUrl = `/placeholder.svg?text=${encodeURIComponent(alt)}&width=${width || 600}&height=${height || 800}`

  // Use placeholder as fallback if none provided
  const finalFallbackSrc = fallbackSrc === "/placeholder.svg" ? placeholderUrl : fallbackSrc

  return (
    <Image
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      style={style}
      onError={handleError}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    />
  )
}

export function ArtworkImage({ src, alt, ...props }: ImageWithFallbackProps) {
  return (
    <ImageWithFallback
      src={src || "/placeholder.svg"}
      alt={alt}
      fallbackSrc={`/placeholder.svg?text=${encodeURIComponent(alt)}`}
      {...props}
    />
  )
}
