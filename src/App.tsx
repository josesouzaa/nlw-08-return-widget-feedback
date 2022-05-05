import FeedbackContextProvider from './contexts/FeedbackContext'

import Widget from './components/Widget'

export default function App() {
  return (
    <>
      <FeedbackContextProvider>
        <Widget />
      </FeedbackContextProvider>
    </>
  )
}
