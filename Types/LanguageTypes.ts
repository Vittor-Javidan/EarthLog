export const languageTags = ['en-US', 'pt-BR'] as const;
export const languageLabels = ['English', 'Português-Brasil'] as const;
export type Languages = (typeof languageTags)[number];
export type LanguageTags = (typeof languageTags)[number];
