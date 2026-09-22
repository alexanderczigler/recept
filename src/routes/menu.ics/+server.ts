import { getMenu } from '$lib/getMenu'
import { getRecipes } from '$lib/getRecipes'
import type { RequestHandler } from './$types'

export const prerender = true
export const trailingSlash = 'never'

const CANONICAL_BASE_URL = 'https://alexanderczigler.github.io/recept'
const UID_DOMAIN = 'alexanderczigler.github.io'

function toIcsDateTime(date: string, time: string): string {
  return `${date.replace(/-/g, '')}T${time.replace(':', '')}00`
}

function recipeUrl(slug: string): string {
  return `${CANONICAL_BASE_URL}/recipe/${slug}`
}

function escapeText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n')
}

export const GET: RequestHandler = async () => {
  const menu = getMenu()
  const recipes = await getRecipes()
  const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const events = Object.entries(menu)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, slugs]) => {
      const dayRecipes = slugs.map((slug) => ({
        title: recipes.find((recipe) => recipe.slug === slug)?.title ?? slug,
        url: recipeUrl(slug)
      }))
      const titles = dayRecipes.map((recipe) => recipe.title).join(', ')
      const description = dayRecipes.map((recipe) => `${recipe.title}: ${recipe.url}`).join('\n')

      return [
        'BEGIN:VEVENT',
        `UID:${date}@${UID_DOMAIN}`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART;TZID=Europe/Stockholm:${toIcsDateTime(date, '16:30')}`,
        `DTEND;TZID=Europe/Stockholm:${toIcsDateTime(date, '18:00')}`,
        `SUMMARY:${escapeText(`🥣 ${titles}`)}`,
        `DESCRIPTION:${escapeText(description)}`,
        ...(dayRecipes.length === 1 ? [`URL:${dayRecipes[0].url}`] : []),
        'END:VEVENT'
      ].join('\r\n')
    })

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${UID_DOMAIN}//Middag//SV`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Middagsmeny',
    'REFRESH-INTERVAL;VALUE=DURATION:P1D',
    ...events,
    'END:VCALENDAR'
  ].join('\r\n')

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8'
    }
  })
}
