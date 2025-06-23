'use client';

import type { IconType } from 'react-icons/lib';
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem
} from '@/components/ui/select';

interface Value {
	id: string;
	name: string;
}

interface Props {
	label: string;
	labelIcon: IconType;
	value: string;
	setValue: (value: string) => void;
	options: Value[];
}

export default function FilterSelect({
	label,
	labelIcon,
	value,
	setValue,
	options
}: Props) {
	const LabelIcon = labelIcon;

	return (
		<Select value={value} onValueChange={setValue}>
			<SelectTrigger className="w-[223px]">
				<LabelIcon className="size-4 opacity-60" />
				<span className="text-white/60">{label}:</span>
				<span className="font-semibold">{value}</span>
			</SelectTrigger>

			<SelectContent>
				{options.map(({ id, name }) => (
					<SelectItem key={id} value={id}>
						{name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
