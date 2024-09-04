import Button from '@/components/button/Button';
import Dialog from '@/components/dialog/Dialog';
import DialogContent from '@/components/dialog/dialogContent/DialogContent';
import DialogFooter from '@/components/dialog/dialogFooter/DialogFooter';
import DialogTitle from '@/components/dialog/dialogTitle/DialogTitle';
// eslint-disable-next-line max-len
import { PunishmentNotificationContext } from '@/context/punishmentNotification/PunishmentNotificationContext';
import { use } from 'react';

function PunishmentNotificationDialog(): React.JSX.Element {
  const data = use(PunishmentNotificationContext);

  return (
    <Dialog open={data.isOpen} onClose={data.close}>
      <DialogTitle>You have been banned</DialogTitle>
      <DialogContent>{data.notification?.message}</DialogContent>
      <DialogFooter>
        <Button variant="text" onClick={data.close}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default PunishmentNotificationDialog;
