import type { ImgHTMLAttributes } from 'react';
import { IMAGE_METADATA } from './imageMetadata';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes' | 'width' | 'height'> & {
  src: string;
  sizes: string;
  thumbnail?: boolean;
};

export function ResponsiveImage({ src, sizes, thumbnail = false, ...props }: Props) {
  const { width, height, variants } = IMAGE_METADATA[src];
  const variantSrc = (size: number) => src.replace(/\.webp$/, `-${size}.webp`);
  const srcSet = [
    ...variants.map((size) => `${variantSrc(size)} ${size}w`),
    `${src} ${width}w`,
  ].join(', ');

  return (
    <img
      {...props}
      src={thumbnail && variants.includes(640) ? variantSrc(640) : src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
    />
  );
}
