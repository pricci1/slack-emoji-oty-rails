import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { PollFormType, PollType } from './types'

// Temporary fix for InertiaFormProps not being exported from @inertiajs/react
type InertiaFormProps<TForm extends Record<string, any>> = ReturnType<typeof useForm<TForm>>

interface FormProps {
  poll: PollType
  onSubmit: (form: InertiaFormProps<PollFormType>) => void
  submitText: string
}

export default function Form({ poll, onSubmit, submitText }: FormProps) {
  const form = useForm<PollFormType>({
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="submit" disabled={processing}>
          {submitText}
        </button>
      </div>
    </form>
  )
}
