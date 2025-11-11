import { storyblokApi } from '@storyblok/astro/client'
import { extractStoryMeta } from '../utils/extractStoryMeta'
import { convertedMarkdown } from '../utils/html2md'
import isPreview from '../utils/isPreview'

export const GET = async () => {
	try {
		const stories = await storyblokApi.getAll('cdn/stories', {
			sort_by: 'position:desc',
			version: isPreview() ? 'draft' : 'published',
		})

		const storyExtract = stories.map((story) => {
			// Check if story has richtext content before converting
			const richTextContent = story.content?.content
			const markdownContent = richTextContent
				? convertedMarkdown(richTextContent)
				: 'No content available'

			return extractStoryMeta(story, {
				content: markdownContent,
			})
		})

		const body = `# Global Finance Starter

> Financial clarity tools for modern businesses

This file contains a list of all pages and resources on this website.

***

${storyExtract
	.map(
		(story) =>
			`## ${story.headline}

${story.content}

URL: [${story.headline}](https://astro-storyblok-finance-starter.netlify.app/${story.slug})

***\n`,
	)
	.join('\n')}
## Optional

- [Homepage](https://astro-storyblok-finance-starter.netlify.app)
`
		return new Response(body, {
			headers: {
				'Content-Type': 'text/plain charset=utf-8',
			},
		})
	} catch (error) {
		console.error('Error generating llms-full.txt:', error)
		return new Response(`Failed to generate llms-full.txt \n\n${error.message}\n\n${error.stack}`, {
			status: 500,
		})
	}
}
