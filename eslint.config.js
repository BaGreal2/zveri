import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	globalIgnores(['dist/**']),
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: {
			globals: globals.browser
		},
		plugins: { js },
		extends: ['js/recommended']
	},
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		rules: {
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
					disallowTypeAnnotations: false
				}
			],
			semi: 'error'
		}
	}
]);
