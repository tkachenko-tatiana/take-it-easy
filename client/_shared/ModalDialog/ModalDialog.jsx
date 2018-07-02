// @flow
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import getDialogActions from './dialogActions'
import type { DialogAction, DialogActionButtonConfig } from './dialogActions.js'
import type { RouterHistory, Location, Match, StaticRouterContext } from 'react-router-dom'

type Props = {
  title?: string;
  dialogType?: DialogAction;
  dialogActions?: Array<DialogActionButtonConfig>;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  handleOk?: () => void;
  onClose?: () => void;
  onSaveClose?: () => void;
  contentClassName?: string;
  children: React.Node | Array<React.Node>;
  history: RouterHistory;
  location: Location,
  match: Match,
  staticContext?: StaticRouterContext
}

export const ModalDialog = (props: Props) => {
  const { dialogType,
    handleOk,
    onClose,
    onSaveClose,
    dialogActions,
    contentClassName,
    history,
    location,
    match,
    staticContext,
    ...other } = props
  const actions: ?Array<DialogActionButtonConfig> = dialogType
    ? getDialogActions(dialogType, handleOk, onClose, onSaveClose)
    : dialogActions

  return (
    <Dialog
      onClose={onClose}
      {...other}
    >
      {
        props.title &&
         <DialogTitle>
           { props.title }
         </DialogTitle>
      }

      <DialogContent className={contentClassName}>
        { props.children }
      </DialogContent>

      <DialogActions>
        {
          actions && actions.map(({ title, handler, ...other }) => (
            <Button
              id={`modal-button-${title.toLowerCase().replace(/\s/g, '-')}`}
              key={title}
              onClick={handler}
              {...other}
            >
              { title }
            </Button>
          ))
        }
      </DialogActions>
    </Dialog>
  )
}

ModalDialog.defaultProps = {
  title: '',
  disableEscapeKeyDown: false,
  disableBackdropClick: true
}

export default withRouter(ModalDialog)
