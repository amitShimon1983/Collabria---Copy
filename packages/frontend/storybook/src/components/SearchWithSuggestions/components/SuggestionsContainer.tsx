import React, { forwardRef, ReactElement } from 'react';
import { FocusZone, Callout, DirectionalHint } from '@fluentui/react';

export interface SuggestionsContainerProps {
  width?: number;
  hidden: boolean;
  onDismiss?: () => void;
  onBlur?: () => void;
  children: ReactElement;
}

const SuggestionsContainer = forwardRef(
  ({ hidden, onDismiss, children, width, onBlur }: SuggestionsContainerProps, ref: any) => {
    return (
      <FocusZone disabled={true}>
        <Callout
          dismissOnTargetClick={true}
          onBlur={onBlur}
          ariaLabelledBy={'callout-suggestions'}
          gapSpace={10}
          coverTarget={false}
          // preventDismissOnEvent={() => false}
          preventDismissOnScroll={true}
          preventDismissOnResize={true}
          alignTargetEdge={true}
          directionalHint={DirectionalHint.bottomLeftEdge}
          onDismiss={onDismiss}
          hidden={hidden}
          calloutMaxHeight={320}
          calloutWidth={width}
          target={ref.current}
          shouldUpdateWhenHidden={false}
          isBeakVisible={false}
        >
          {children}
        </Callout>
      </FocusZone>
    );
  }
);

export default SuggestionsContainer;
