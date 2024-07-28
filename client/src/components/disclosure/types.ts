import { ElementProps } from '../types/Element';

export interface DisclosureProps extends ElementProps {
  /**
   * Will always be displayed, regardless of whether the disclosure is open or closed
   */
  label?: string;

  /**
   * Sets the initial state of the disclosure. Unlike other components,
   * this does not make the disclosure controlled. You will need to manually
   * implement a mechanism to control the state
   */
  open?: boolean;

  /**
   * Triggers when the disclosure is opened. This does not prevent
   * the state from changing, it merely allows you to listen to the
   * event
   */
  onOpen?: () => void;

  /**
   * Triggers when the disclosure is closed. This does not prevent
   * the state from changing, it merely allows you to listen to the
   * event
   */
  onClose?: () => void;

  children: React.ReactNode;

  /**
   * Will add a small left padding to the content (does not affect the summary)
   */
  padded?: boolean;

  /**
   * Label to be displayed when the disclosure is opened. Use in combination
   * with ``closedLabel``.
   *
   * Note that if ``label`` is specified, this label will never render.
   */
  openLabel?: string;

  /**
   * Label to be displayed when the disclosure is closed. Use in combination
   * with ``openLabel``.
   *
   * Note that if ``label`` is specified, this label will never render.
   */
  closedLabel?: string;
}
