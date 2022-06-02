import React, { FC } from 'react'

interface ErrorFallbackProps {
  error: Error
}

const ErrorFallback: FC<ErrorFallbackProps> = ({
  error
}) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{color: 'red'}}>{error.message}</pre>
    </div>
  )
}

export default ErrorFallback