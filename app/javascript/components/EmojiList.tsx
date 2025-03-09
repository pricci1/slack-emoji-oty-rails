import { Emoji } from "@/pages/Poll/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
  emojis: (Omit<Emoji, "id"> & { id?: number })[];
  actionLabel: string;
  actionClass: string;
  onAction: (emojiName: string) => void;
}

export function EmojiList({ emojis, actionLabel, actionClass, onAction }: Props) {
  return (
    <div className="grid gap-4">
      {emojis.map((emoji) => (
        <Card key={emoji.name} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={emoji.image} alt={emoji.name} className="w-8 h-8" />
              <span>:{emoji.name}:</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              className={actionClass}
              onClick={() => onAction(emoji.name)}
            >
              {actionLabel}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
