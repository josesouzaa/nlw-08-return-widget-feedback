import { createContext, useContext, useState, ReactNode } from 'react'

import bugImageUrl from '../../assets/bug.svg'
import IdeaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: IdeaImageUrl,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de um balão de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes

interface FeedbackContextProps {
  children: ReactNode
}

interface FeedbackContextData {
  feedbackType: FeedbackType | null
  setFeedbackType: (type: FeedbackType) => void
}

const FeedbackContext = createContext({} as FeedbackContextData)

export function FeedbackContextProvider({ children }: FeedbackContextProps) {
  const [feedbackType, setFeedbackType] = useState<null | FeedbackType>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback() {
    setFeedbackSent(false)
    setFeedbackType(null)
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedbackType,
        setFeedbackType,
        feedbackSent,
        setFeedbackSent,
        handleRestartFeedback
      }}
    ></FeedbackContext.Provider>
  )
}

export const useFeedbackContext = () => useContext(FeedbackContext)
