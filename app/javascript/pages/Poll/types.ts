export interface PollType {
  id: number
}

export type PollFormType = Omit<PollType, 'id'>
