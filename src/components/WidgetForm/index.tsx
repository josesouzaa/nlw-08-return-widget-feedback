import { useFeedbackContext } from '../../contexts/FeedbackContext'

import FeedbackTypeStep from './Steps/FeedbackTypeStep'
import FeedbackContentStep from './Steps/FeedbackContentStep'
import FeedbackSuccessStep from './Steps/FeedbackSuccessStep'

export default function WidgetForm() {
  const { feedbackType, feedbackSent } = useFeedbackContext()

  return (
    <div
      className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col 
      items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto"
    >
      {feedbackSent ? (
        <FeedbackSuccessStep />
      ) : (
        <>{!feedbackType ? <FeedbackTypeStep /> : <FeedbackContentStep />}</>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela{' '}
        <a
          className="underline underline-offset-2"
          href="https://rocketseat.com.br"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  )
}
