import { getLanguagesCode } from '../utils/api'
const DEFAULT_LANG = import.meta.env.STORYBLOK_DEFAULT_LANG

const LANGUAGE_LABELS = {
  en: 'English',
  lv: 'Latviešu'
}

const LANGUAGE_FLAGS = {
  en: `<g clip-path="url(#a)"><rect width="22" height="16" x="-3" fill="#1A47B8" rx="2"/><path fill="#fff" fill-rule="evenodd" d="M-.66 0H-3v2.667L16.647 16H19v-2.667L-.66 0Z" clip-rule="evenodd"/><path fill="#F93939" d="M-2.22 0 19 14.438V16h-.762L-3 1.547V0h.78Z"/><path fill="#fff" fill-rule="evenodd" d="M16.905 0H19v2.667S5.391 11.55-.905 16H-3v-2.667L16.905 0Z" clip-rule="evenodd"/><path fill="#F93939" d="M19 0h-.71L-3 14.45V16h.78L19 1.559V0Z"/><path fill="#fff" fill-rule="evenodd" d="M5 0h6.018v4.935H19v6.127h-7.982V16H5v-4.938H-3V4.935h8V0Z" clip-rule="evenodd"/><path fill="#F93939" fill-rule="evenodd" d="M6.263 0h3.474v6.154H19v3.692H9.737V16H6.263V9.846H-3V6.154h9.263V0Z" clip-rule="evenodd"/></g><defs><clipPath id="a"><rect width="22" height="16" x="-3" fill="#fff" rx="2"/></clipPath></defs>`,
  lv: `<g clip-path="url(#a)"><rect width="22" height="16" x="-3" fill="#fff" rx="2"/><path fill="#9D2235" d="M-3 0h22v16H-3z"/><path fill="#fff" d="M-3 6.4h22v3.2H-3z"/></g><defs><clipPath id="a"><rect width="22" height="16" x="-3" fill="#fff" rx="2"/></clipPath></defs>`
}


const getLanguages = async () => {
  const storyblokLanguages = await getLanguagesCode()

  // Merge default language with other languages and remove duplicates
  return Array.from(
    new Set([DEFAULT_LANG, ...storyblokLanguages])
  )
}

const getLanguageLabel = (locale) => LANGUAGE_LABELS[locale]

const getLanguageFlag = (locale) => LANGUAGE_FLAGS[locale]

function getTransLink(language, slug) {
	return language === DEFAULT_LANG ? slug : `/${language}${slug}`
}

export { getLanguages, getLanguageLabel, getLanguageFlag, getTransLink }
