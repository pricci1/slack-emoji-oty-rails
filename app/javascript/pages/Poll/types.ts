export interface PollType {
  id: number;
  ownerId: string;
  votesPerParticipant: string;
  teamId: string;
}

export interface Emoji {
  id: number;
  name: string;
  image: string;
}

export type EmojiWithoutId = Omit<Emoji, "id">;
export type PollFormType = Omit<PollType, "id" | "ownerId" | "teamId"> & {
  emojis: EmojiWithoutId[];
};
