'use client';

import Button from '@/components/button/Button';
import Dialog from '@/components/dialog/Dialog';
import DialogContent from '@/components/dialog/dialogContent/DialogContent';
import DialogFooter from '@/components/dialog/dialogFooter/DialogFooter';
import DialogTitle from '@/components/dialog/dialogTitle/DialogTitle';
import { Chat } from '@/types/chat';
import React from 'react';

type ChatRoomInfoDialogProps = {
  room: Chat;
  open: boolean;
  onClose: () => void;
};

function ChatRoomInfoDialog(props: ChatRoomInfoDialogProps): React.JSX.Element {
  return (
    <Dialog className="chat-room-dialog" role="dialog" open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.room.title}</DialogTitle>
      <DialogContent className="chat-room-dialog-content">{props.room.description}</DialogContent>
      <DialogFooter>
        <Button variant="text" onClick={props.onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ChatRoomInfoDialog;
