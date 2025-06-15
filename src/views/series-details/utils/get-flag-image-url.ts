const getFlagImageUrl = (countryCode: string) =>
	`https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`;

export default getFlagImageUrl;
