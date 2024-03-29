import { FormEvent, useState } from 'react'

import {
  useFeedbackContext,
  FeedbackType
} from '../../../contexts/FeedbackContext'

import CloseButton from '../../CloseButton'
import ScreenshotButton from '../ScreenshotButton'
import Loading from '../../Loading'

import { ArrowLeft } from 'phosphor-react'

export default function FeedbackContentStep() {
  const {
    feedbackType,
    feedbackTypes,
    handleRestartFeedback,
    setFeedbackSent
  } = useFeedbackContext()

  const feedbackTypeInfo = feedbackTypes[feedbackType as FeedbackType]

  //Estados e funções exclusivas deste componente

  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()

    setIsSendingFeedback(true)

    await fetch(`${import.meta.env.VITE_API_URL}/feedbacks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type: feedbackType, comment, screenshot })
    })

    setIsSendingFeedback(false)

    setFeedbackSent(true)
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 lef-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={handleRestartFeedback}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            className="w-6 h-6"
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
          />

          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            onScreenshotTook={setScreenshot}
            screenshot={screenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}
