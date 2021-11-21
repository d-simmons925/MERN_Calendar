import { E_ERROR } from './enum'

export interface UserI {
  name: string
  id: string
}

export interface MsgI {
  msg: string | null
}

export interface ErrorI {
  id: E_ERROR
  msg: MsgI
}

export interface AuthI {
  token: string
  isAuthenticated: boolean
  isLoading: boolean
  user: UserI
}

export interface LogoutPropsI {
  logout(): void
}

export interface AppNavbarI {
  auth?: {
    isAuthenticated: boolean
    user: UserI
  }
}

export interface AuthReduxPropsI {
  auth: { isAuthenticated: boolean }
  error: ErrorI
}

export interface NewEventReduxPropsI {
  auth: AuthI
}

export interface CalendarHeaderI {
  onNext(): void
  onBack(): void
  dateDisplay: string
  isAuthenticated?: boolean
}

export interface DayI {
  day: {
    value: string
    isCurrentDay: boolean
    events: EventI[]
    date: string
  }
  isAuthenticated?: boolean
}

export interface EventI {
  title?: string
  date?: string
  author?: string
  _id?: any
  id?: string
}

export interface EventReduxPropsI extends AuthReduxPropsI {
  event: {
    events: EventI[]
  }
}

export interface ModalI {
  error: ErrorI
  isAuthenticated: boolean
  clearErrors(): void
}

export interface AuthFuncI {
  name?: string
  password?: string
}

export interface ConfigHeadersI {
  headers: {
    [index: string]: string
  }
}

export interface NewEventI {
  clearErrors(): void
  auth: AuthI
}

export interface UseDateI {
  events: EventI[]
  nav: number
}
