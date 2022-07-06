import React from 'react';
import { ChoiceGroup as ChoiceGroupPersona, IChoiceGroupProps } from '@fluentui/react';

const ChoiceGroup = (props: IChoiceGroupProps) => {
  return <ChoiceGroupPersona {...props} />;
};

export default ChoiceGroup;
