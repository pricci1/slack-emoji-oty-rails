import { Head, Link } from '@inertiajs/react'
import Form from './Form'
import { PollType } from './types'

interface EditProps {
  poll: PollType
}

export default function Edit({ poll }: EditProps) {
  return (
    <>
      <Head title="Editing poll" />

      <h1>Editing poll</h1>

      <Form
        poll={poll}
        onSubmit={(form) => {
          form.transform((data) => ({ poll: data }))
          form.patch(`/polls/${poll.id}`)
        }}
        submitText="Update Poll"
      />

      <br />

      <div>
        <Link href={`/polls/${poll.id}`}>Show this poll</Link>
        {' | '}
        <Link href="/polls">Back to polls</Link>
      </div>
    </>
  )
}
