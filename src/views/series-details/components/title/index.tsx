import { format } from 'date-fns';
import TextFade from '@/components/ui/text-fade';
import getFlagImageUrl from '../../utils/get-flag-image-url';

interface Props {
	name: string;
	countryCode: string;
	firstAirDate: string;
}

const Title = ({ name, countryCode, firstAirDate }: Props) => {
	return (
		<h1 className="fade-in-top mb-5 flex items-center gap-2 text-[32px] leading-[32px] font-bold">
			{countryCode && (
				<img
					src={getFlagImageUrl(countryCode)}
					alt={`${countryCode} flag`}
					className="inline-block w-[42px] rounded-sm"
				/>
			)}
			<TextFade>{name}</TextFade>
			<span className="font-normal text-white/65">
				({format(firstAirDate, 'yyyy')})
			</span>
		</h1>
	);
};

export default Title;
