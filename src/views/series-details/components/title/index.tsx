import { format } from 'date-fns';
import TextFade from '@/components/ui/text-fade';
import countryCodeToEmoji from '../../utils/country-code-to-emoji';

interface Props {
	name: string;
	countryCode: string;
	firstAirDate: string;
}

const Title = ({ name, countryCode, firstAirDate }: Props) => {
	return (
		<h1 className="fade-in-top mb-5 text-[32px] leading-[32px] font-bold">
			{countryCodeToEmoji(countryCode)} <TextFade>{name}</TextFade>{' '}
			<span className="font-normal text-white/65">
				({format(firstAirDate, 'yyyy')})
			</span>
		</h1>
	);
};

export default Title;
