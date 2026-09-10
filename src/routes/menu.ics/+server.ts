import { getMenu } from '$lib/getMenu'
import { getRecipes } from '$lib/getRecipes'
import type { RequestHandler } from './$types'

export const prerender = true
export const trailingSlash = 'never'

function toIcsDate(date: string): string {
  return date.replace(/-/g, '')
}

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function escapeText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

export const GET: RequestHandler = async () => {
  const menu = getMenu()
  const recipes = await getRecipes()
  const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const events = Object.entries(menu)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, slugs]) => {
      const titles = slugs
        .map((slug) => recipes.find((recipe) => recipe.slug === slug)?.title ?? slug)
        .join(', ')

      return [
        'BEGIN:VEVENT',
        `UID:${date}@middag.czigler.se`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART;VALUE=DATE:${toIcsDate(date)}`,
        `DTEND;VALUE=DATE:${toIcsDate(addDays(date, 1))}`,
        `SUMMARY:${escapeText(`🥣 ${titles}`)}`,
        'END:VEVENT'
      ].join('\r\n')
    })

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//middag.czigler.se//Middag//SV',
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
