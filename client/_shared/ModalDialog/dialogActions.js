// @flow

import type { Color } from '@material-ui/core/Button/Button'

export type DialogAction = 'OK_CLOSE' | 'PROCEED' | 'OK'

export type DialogActionsType = {
  [DialogAction]: DialogAction
}

export const OK: DialogAction = 'OK'
export const PROCEED: DialogAction = 'PROCEED'
export const OK_CLOSE: DialogAction = 'OK_CLOSE'

export const DialogActions: DialogActionsType = {
  OK,
  PROCEED,
  OK_CLOSE
}

export type DialogActionButtonConfig = {
  title: string,
  color: Color,
  variant?: string,
  handler?: () => void
}

const DIALOG_ACTION_HANDLERS: {
  [DialogAction]: (onOK?: () => void, onClose?: () => void, onSaveClose?: () => void) => Array<DialogActionButtonConfig>
} = {
  [OK_CLOSE]: (onOK, onClose) => {
    return [{
      title: 'Ok',
      handler: onOK,
      variant: 'raised',
      color: 'primary'
    }, {
      title: 'Close',
      handler: onClose,
      color: 'primary'
    }]
  },

  [PROCEED]: (onOK, onClose) => {
    return [{
      title: 'Proceed',
      handler: onOK,
      color: 'primary'
    }, {
      title: 'Cancel',
      handler: onClose,
      color: 'primary'
    }]
  },

  [OK]: (onOK) => {
    return [{
      title: 'Ok',
      handler: onOK,
      color: 'primary'
    }]
  }
}

export default (type: DialogAction, onOK?: () => void, onClose?: () => void, onSaveClose?: () => void): Array<DialogActionButtonConfig> => {
  const handler = DIALOG_ACTION_HANDLERS[type]

  return handler(onOK, onClose, onSaveClose)
}
