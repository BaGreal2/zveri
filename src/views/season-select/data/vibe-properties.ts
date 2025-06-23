import type { Season } from '@/types/seasons';

interface Properties {
	leftImage: string;
	rightImage: string;
	backgroundImage: string;
	mainImage: string;
	color: string;
	label: string;
	title: string;
	description: string;
}

const vibePropertiesMap: Record<Season, Properties> = {
	winter: {
		leftImage: '/images/winter-left.png',
		rightImage: '/images/winter-right.png',
		backgroundImage: '/images/winter-curve-bg.png',
		mainImage: '/images/winter-vibe-bg.png',
		color: '#435151',
		label: 'Winter',
		title: 'Dark. Cold. Unsettling.',
		description:
			'If you enjoy psychological thrillers, supernatural horror, and stories that pull you into unsettling and eerie worlds — this is definitely your vibe. Get ready for chills, tension, and a touch of fear.'
	},
	spring: {
		leftImage: '/images/spring-left.png',
		rightImage: '/images/spring-right.png',
		backgroundImage: '/images/spring-curve-bg.png',
		mainImage: '/images/spring-vibe-bg.png',
		color: '#4F3A57',
		label: 'Spring',
		title: 'Soft. Light. Romantic.',
		description:
			'Feeling like some romance today?  If you crave heartwarming stories, new beginnings, sweet emotions, and cozy slice-of-life moments — this is definitely your vibe.'
	},
	summer: {
		leftImage: '/images/summer-left.png',
		rightImage: '/images/summer-right.png',
		backgroundImage: '/images/summer-curve-bg.png',
		mainImage: '/images/summer-vibe-bg.png',
		color: '#335737',
		label: 'Summer',
		title: 'Energy. Adventure. Motion.',
		description:
			'If you love fast-paced action, epic adventures, thrilling races, summer festivals, and stories full of youth and freedom — this is definitely your vibe. Get ready for heat, movement, and pure adrenaline.'
	},
	autumn: {
		leftImage: '/images/autumn-left.png',
		rightImage: '/images/autumn-right.png',
		backgroundImage: '/images/autumn-curve-bg.png',
		mainImage: '/images/fall-vibe-bg.png',
		color: '#5A4226',
		label: 'Autumn',
		title: 'Calm. Deep. Mysterious.',
		description:
			'In the mood for something heavier?  If you enjoy complex stories, slow-burn thrillers, psychological twists, deep mysteries and that perfect melancholic tension — this is definitely your vibe.'
	}
};

export default vibePropertiesMap;
