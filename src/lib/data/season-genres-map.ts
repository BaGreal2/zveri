import type { Season } from '@/types/seasons';

const seasonGenresMap: Record<Season, number[]> = {
	winter: [9648, 10765, 80, 10768],
	spring: [18, 10751, 10762, 10764],
	summer: [10756, 35, 16, 37],
	autumn: [99, 10763, 10767]
};

export default seasonGenresMap;
