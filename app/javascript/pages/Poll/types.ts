export interface PollType {
  id: number
}

export interface Emoji {
  id: number
  name: string
  image: string
}

export type EmojiWithoutId = Omit<Emoji, 'id'>
export type PollFormType = Omit<PollType, 'id'>
