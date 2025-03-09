import { useForm } from "@inertiajs/react";
import { FormEvent, useEffect, useState } from "react";
import { EmojiWithoutId, PollFormType, PollType } from "./types";
import { Combobox } from "@/components/Combobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmojiList } from "@/components/EmojiList";
import { SubmitButton } from "@/components/SubmitButton";
import { upperFirst } from "es-toolkit/string";

// Temporary fix for InertiaFormProps not being exported from @inertiajs/react
type InertiaFormProps<TForm extends Record<string, any>> = ReturnType<typeof useForm<TForm>>;

interface FormProps {
  poll: PollType;
  onSubmit: (form: InertiaFormProps<PollFormType>) => void;
  submitText: string;
}

const mockEmojis = [
  {
    name: "approval",
    image: "https://placehold.co/40x40.png",
  },
  {
    name: "til-today-i-learned",
    image: "https://placehold.co/40x40.png",
  },
  {
    name: "chill-guy",
    image: "https://placehold.co/40x40.png",
  },
  {
    name: "its_time",
    image: "https://placehold.co/40x40.png",
  },
  {
    name: "focus-lebron",
    image: "https://placehold.co/40x40.png",
  },
];

export default function Form({ poll, onSubmit }: FormProps) {
  const originalEmojis = mockEmojis;
  const form = useForm<PollFormType>({
    votesPerParticipant: poll.votesPerParticipant ?? "1",
    emojis: poll.emojis?.map(({ name, image }) => ({ name, image })) ?? [],
  });
  const { data, setData, errors, processing } = form;

  const setEmojis = (emojis: EmojiWithoutId[]) => {
    setData("emojis", emojis);
  };
  const [sinceFilter, setSinceFilter] = useState("");
  const [untilFilter, setUntilFilter] = useState("");
  const [step, setStep] = useState(1);
  const setVotesPerParticipant = (value: string) => {
    setData("votesPerParticipant", value);
  };

  useEffect(() => {
    const sinceEmojiIndex = originalEmojis.findIndex((emoji) => emoji.name === sinceFilter);
    const untilEmojiIndex = originalEmojis.findIndex((emoji) => emoji.name === untilFilter);
    const filteredEmojis = originalEmojis.slice(
      sinceEmojiIndex !== -1 ? sinceEmojiIndex : 0,
      untilEmojiIndex !== -1 ? untilEmojiIndex + 1 : undefined,
    );
    setEmojis(filteredEmojis);
  }, [sinceFilter, untilFilter, originalEmojis]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Slack Emoji Of The Year</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 ? (
          <StepOne
            sinceFilter={sinceFilter}
            setSinceFilter={setSinceFilter}
            untilFilter={untilFilter}
            setUntilFilter={setUntilFilter}
            votesPerParticipant={data.votesPerParticipant}
            setVotesPerParticipant={setVotesPerParticipant}
            emojisCount={data.emojis.length}
            onNext={() => setStep(2)}
            originalEmojis={originalEmojis}
            errors={errors}
          />
        ) : (
          <StepTwo
            isSubmitting={processing}
            emojis={data.emojis}
            setEmojis={setEmojis}
            votesPerParticipant={data.votesPerParticipant}
            onBack={() => setStep(1)}
          />
        )}
      </form>
    </div>
  );
}

function StepOne({
  sinceFilter,
  setSinceFilter,
  untilFilter,
  setUntilFilter,
  votesPerParticipant,
  setVotesPerParticipant,
  emojisCount,
  onNext,
  originalEmojis,
  errors,
}: {
  sinceFilter: string;
  setSinceFilter: (value: string) => void;
  untilFilter: string;
  setUntilFilter: (value: string) => void;
  votesPerParticipant: string;
  setVotesPerParticipant: (value: string) => void;
  emojisCount: number;
  onNext: () => void;
  originalEmojis: EmojiWithoutId[];
  errors: Record<string, string[]>;
}) {
  const emojiOptions = originalEmojis.map((emoji) => ({
    value: emoji.name,
    label: emoji.name,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">
          Since emoji (optional)
          <Combobox
            name="sinceEmoji"
            value={sinceFilter}
            onChange={setSinceFilter}
            options={emojiOptions}
          />
        </label>
      </div>

      <div>
        <label className="text-sm font-medium">
          Until emoji (optional)
          <Combobox
            name="untilEmoji"
            value={untilFilter}
            onChange={setUntilFilter}
            options={emojiOptions}
          />
        </label>
      </div>

      <div>
        <label htmlFor="votesPerParticipant" className="text-sm font-medium">
          Votes per participant
        </label>
        <Input
          type="number"
          name="votesPerParticipant"
          id="votesPerParticipant"
          min="1"
          value={votesPerParticipant}
          onChange={(e) => setVotesPerParticipant(e.target.value)}
          className="mt-1"
        />
        {errors.votesPerParticipant?.map((error) => (
          <p key={error} className="text-sm text-red-600">
            {upperFirst(error)}
          </p>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <p className="text-sm text-gray-600">{emojisCount} emojis</p>
        <Button type="button" onClick={onNext} className="ml-auto">
          Next
        </Button>
      </div>
    </div>
  );
}

function StepTwo({
  emojis,
  setEmojis,
  votesPerParticipant,
  onBack,
  isSubmitting,
}: {
  emojis: EmojiWithoutId[];
  setEmojis: (emojis: EmojiWithoutId[]) => void;
  votesPerParticipant: string;
  onBack: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="space-y-4">
      <EmojiList
        emojis={emojis}
        actionLabel="Remove"
        actionClass="text-red-600 hover:text-red-800 hover:bg-red-100"
        onAction={(emojiName) => setEmojis(emojis.filter((e) => e.name !== emojiName))}
      />

      <input type="hidden" name="emojis" value={JSON.stringify(emojis)} />
      <input type="hidden" name="votesPerParticipant" value={votesPerParticipant} />

      <div className="flex justify-between items-center mt-8">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <p className="text-sm text-gray-600">{emojis.length} emojis</p>
        <SubmitButton label="Create" isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
