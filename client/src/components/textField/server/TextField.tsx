import '../TextField.scss';
import { HelperTextProps, LabelTextProps } from '../../types/BaseInput';
import { ServerTextFieldProps } from './types';
import { _generatePlaceholderText } from '../generatePlaceholderText';
/**
 * An uncontrolled text field, suitable for server components. Note that
 * this text field does not support automatic resizing; use the client
 * one for this purpose.
 */
function TextField(props: ServerTextFieldProps): React.JSX.Element {
  const {
    className = '',
    label = '',
    placeholder,
    helperText,
    size = 'medium',
    type = 'text',
    required,
    list,
    readonly,
    value,
    name,
    disabled,
    form,
    pattern,
    max,
    min,
    minLength,
    maxLength,
    step,
    ...others
  } = props;
  const placeholderText = _generatePlaceholderText(placeholder, required);

  return (
    <label className={`component-helper-text-wrapper ${className}`} {...others}>
      <LabelText disabled={disabled} size={size} labelText={label} />
      <input
        type={type}
        className={`component-text-field ${size}`}
        placeholder={placeholderText}
        form={form}
        disabled={disabled}
        name={name}
        readOnly={readonly}
        required={required}
        list={list}
        min={min}
        max={max}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        step={step}
        defaultValue={value}
      />
      <HelperText disabled={disabled} helperText={helperText} />
    </label>
  );
}

function HelperText(props: HelperTextProps): React.JSX.Element {
  if (!props.helperText) {
    return <></>;
  }

  const disabledClass = props.disabled ? 'disabled' : '';

  return <div className={`component-helper-text ${disabledClass}`}>{props.helperText}</div>;
}

function LabelText(props: LabelTextProps): React.JSX.Element {
  if (!props.labelText) {
    return <></>;
  }

  const disabledClass = props.disabled ? 'disabled' : '';
  return (
    <div className={`component-label-text ${props.size} ${disabledClass}`}>{props.labelText}</div>
  );
}

export default TextField;
