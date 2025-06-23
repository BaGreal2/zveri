import type { Season } from '@/types/seasons';

const seasonGenresMap: Record<Season, number[]> = {
	winter: [80, 9648, 10768, 10765], // Crime, Mystery, War & Politics, Sci-Fi & Fantasy
	spring: [16, 35, 10751, 10762, 10764, 10767], // Animation, Comedy, Family, Kids, Reality, Talk
	summer: [10759, 10765, 10768, 10764, 37], // Action & Adventure, Sci-Fi & Fantasy, War & Politics, Reality, Western
	autumn: [18, 80, 99, 9648, 10766, 10768, 10763, 37] // Drama, Crime, Documentary, Mystery, Soap, War & Politics, News, Western
};

export default seasonGenresMap;
