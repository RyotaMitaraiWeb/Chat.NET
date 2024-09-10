import Button from '@/components/button/Button';
import Dialog from '@/components/dialog/Dialog';
import DialogContent from '@/components/dialog/dialogContent/DialogContent';
import DialogFooter from '@/components/dialog/dialogFooter/DialogFooter';
import DialogTitle from '@/components/dialog/dialogTitle/DialogTitle';
import Typography from '@/components/typography/Typography';
// eslint-disable-next-line max-len
import { PunishmentNotificationContext } from '@/context/punishmentNotification/PunishmentNotificationContext';
import { use } from 'react';

function PunishmentNotificationDialog(): React.JSX.Element {
  const data = use(PunishmentNotificationContext);

  return (
    <Dialog open={data.isOpen} onClose={data.close}>
      <DialogTitle>{data.notification.title}</DialogTitle>
      <DialogContent>
        {data.notification?.message ? (
          <Typography>
            <strong>Reason for punishment:</strong> {data.notification.message}
          </Typography>
        ) : null}
        <Typography>{data.notification.details}</Typography>
      </DialogContent>
      <DialogFooter>
        <Button variant="text" onClick={data.close}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default PunishmentNotificationDialog;
