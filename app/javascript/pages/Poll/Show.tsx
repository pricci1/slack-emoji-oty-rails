import { Head, Link } from '@inertiajs/react'
import Poll from './Poll'
import { PollType } from './types'

interface ShowProps {
  poll: PollType
  flash: { notice?: string }
}

export default function Show({ poll, flash }: ShowProps) {
  return (
    <>
      <Head title={`Poll #${poll.id}`} />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Poll #{poll.id}</h1>

      <Poll poll={poll} />

      <div>
        <Link href={`/polls/${poll.id}/edit`}>Edit this poll</Link>
        {' | '}
        <Link href="/polls">Back to polls</Link>

        <br />

        <Link
          href={`/polls/${poll.id}`}
          as="button"
          method="delete"
        >
          Destroy this poll
        </Link>
      </div>
    </>
  )
}
