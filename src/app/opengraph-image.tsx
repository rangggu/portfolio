import { siteOgImage } from '@/components/seo/og/renderOgImage';
import { OG_SIZE } from '@/lib/og/ogTheme';
import { SITE } from '@/lib/site';

/** 사이트 대표 OG 이미지 (src/components/seo/og). 모든 페이지가 이 이미지 하나를 쓴다 */
export const alt = SITE.title;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return siteOgImage();
}
