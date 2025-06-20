const getFlagImageUrl = (countryCode: string) => {
	if (countryCode.toLowerCase() === 'ru') {
		return 'https://emojiisland.com/cdn/shop/products/Poop_Emoji_7b204f05-eec6-4496-91b1-351acc03d2c7.png?v=1571606036';
	}
	return `https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`;
};

export default getFlagImageUrl;
