import React, { ComponentType, useCallback, FC } from 'react'
import _ from 'lodash'

export const withKeyboardA11y = (Wrapped: ComponentType) => {
  const Result: FC<any> = ({ onClick, ...props }) => {
    const handleKeyDown = useCallback(
      (e: KeyboardEvent, ...rest) => {
        if ([32, 13].includes(e.keyCode) && _.isFunction(onClick)) {
          onClick(e, ...rest)
        }
      },
      [onClick],
    )

    return <Wrapped {...props} onClick={onClick} onKeyDown={handleKeyDown} />
  }
  Result.displayName = `WithKeyboardA11y${Wrapped.displayName}`

  return Result
}
