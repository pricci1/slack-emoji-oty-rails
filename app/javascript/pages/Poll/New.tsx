import { Head, Link } from "@inertiajs/react";
import Form from "./Form";
import { PollType } from "./types";
import { Button } from "@/components/ui/button";
import { snakeCaseKeysDeep } from "@/lib/snakeCaseKeysDeep";

interface NewProps {
  poll: PollType;
}

export default function New({ poll }: NewProps) {
  return (
    <>
      <Head title="New poll" />

      <h1>New poll</h1>

      <Form
        poll={poll}
        onSubmit={(form) => {
          form.transform((data) => ({ poll: snakeCaseKeysDeep(data) }));
          form.post("/polls");
        }}
        submitText="Create Poll"
      />

      <br />

      <Button asChild variant="secondary">
        <Link href="/polls">Back to polls</Link>
      </Button>
    </>
  );
}
