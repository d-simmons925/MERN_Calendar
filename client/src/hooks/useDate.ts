import { useEffect, useState } from 'react'
import { EventI } from '../types/interfaces'

export const useDate = (events: EventI[], nav: number) => {
  const [dateDisplay, setDateDisplay] = useState('')
  const [days, SetDays] = useState<[]>([])

  useEffect(() => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dt = new Date()

    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav)
    }

    const day = dt.getDate()
    const month = dt.getMonth()
    const year = dt.getFullYear()

    const firstDayOfMonth = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })

    setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`)
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0])

    const daysArr: any = []

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`
      const dayEvents = []
      for (let i = 0; i <= events.length; i++) {
        if (events[i] !== undefined && events[i].date === dayString) {
          dayEvents.push(events[i])
        }
      }
      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          events: dayEvents,
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        })
      } else {
        daysArr.push({
          value: 'padding',
          events: [],
          isCurrentDay: false,
          date: '',
        })
      }
    }

    SetDays(daysArr)
  }, [events, nav])

  return {
    days,
    dateDisplay,
  }
}
