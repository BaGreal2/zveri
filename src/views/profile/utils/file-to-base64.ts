export default function fileToBase64(file: File): Promise<string> {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === 'string') res(reader.result);
			else rej(new Error('cannot convert file'));
		};
		reader.onerror = rej;
		reader.readAsDataURL(file);
	});
}
