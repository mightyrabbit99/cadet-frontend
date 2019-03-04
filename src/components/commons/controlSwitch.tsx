import { IconName, ISwitchProps, Switch } from '@blueprintjs/core';
import * as React from 'react';

type controlSwitchOptionals = {
  className?: string;
  fullWidth?: boolean;
  iconOnRight?: boolean;
};

const defaultOptions = {
  className: '',
  fullWidth: false,
  iconOnRight: false
};

export function controlSwitch(
  label: string,
  icon: IconName | null,
  onChange: ((checked: boolean) => void) | null = null,
  disabled: boolean = false,
  options: controlSwitchOptionals = {}
) {
  const onChangeFunction = (event: any) => onChange && !disabled ? onChange(event.target.checked) : null;
  const opts: controlSwitchOptionals = { ...defaultOptions, ...options };
  const props: ISwitchProps = { disabled };
  props.className = opts.className;
  if (onChange) {
    props.onChange = onChangeFunction;
  }
  return <Switch {...props}>{label}</Switch>;
}
