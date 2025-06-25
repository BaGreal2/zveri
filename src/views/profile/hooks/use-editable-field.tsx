import { useState, useRef, useEffect, useMemo } from 'react';

type Props<T> = {
	value: T;
	fallbackValue?: T;
	onSave: (val: T) => void | Promise<void>;
	as?: 'input' | 'textarea';
	className?: string;
};

export default function useEditableField<T extends string>({
	value,
	fallbackValue,
	onSave,
	as = 'input',
	className = ''
}: Props<T>) {
	const [editing, setEditing] = useState(false);
	const [draft, setDraft] = useState<T>(value);
	const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

	const save = async () => {
		if (draft !== value) {
			await onSave(draft);
		}

		setEditing(false);
		setDraft(value);
	};

	useEffect(() => {
		if (!editing) setDraft(value);
	}, [value, editing]);

	useEffect(() => {
		if (editing && ref.current) ref.current.focus();
	}, [editing]);

	const dirty = draft !== value;

	const field = useMemo(
		() =>
			editing ? (
				as === 'textarea' ? (
					<textarea
						// @ts-expect-error ref type mismatch, but works fine in practice
						ref={ref}
						className={className}
						rows={3}
						value={draft}
						onChange={(e) => setDraft(e.target.value as T)}
						onBlur={save}
						onKeyDown={(e) => e.key === 'Escape' && setEditing(false)}
					/>
				) : (
					<input
						// @ts-expect-error ref type mismatch, but works fine in practice
						ref={ref}
						className={className}
						value={draft}
						onChange={(e) => setDraft(e.target.value as T)}
						onBlur={save}
						onKeyDown={(e) => e.key === 'Escape' && setEditing(false)}
					/>
				)
			) : (
				<span onClick={() => setEditing(true)}>{value ?? fallbackValue}</span>
			),
		[editing, as, className, draft, value]
	);

	return { field, dirty, editing, save };
}
