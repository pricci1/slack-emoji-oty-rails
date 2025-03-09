import { Head, Link } from '@inertiajs/react'
import Poll from './Poll'
import { PollType } from './types'

interface IndexProps {
  polls: PollType[]
  flash: { notice?: string }
}

export default function Index({ polls, flash }: IndexProps) {
  return (
    <>
      <Head title="Polls" />

      {flash.notice && <p style={{ color: 'green' }}>{flash.notice}</p>}

      <h1>Polls</h1>
      <div>
        {polls.map((poll) => (
          <div key={poll.id}>
            <Poll poll={poll} />
            <p>
              <Link href={`/polls/${poll.id}`}>Show this poll</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href="/polls/new">New poll</Link>
    </>
  )
}
