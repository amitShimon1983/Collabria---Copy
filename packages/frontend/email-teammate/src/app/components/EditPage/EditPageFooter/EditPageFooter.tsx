import React from 'react';
import classes from '../EditPage.module.scss';
import { Icon, useCustomizations, useDeviceContext } from '@harmon.ie/collabria-frontend-shared';
import { Spinner, Text, Tooltip } from '@harmon.ie/collabria-frontend-storybook';
import { DefaultButton, PrimaryButton } from '@harmon.ie/collabria-frontend-shared/src/components/atoms/fluent/button';

const textStyle = { lineHeight: '32px' };

export default function EditPageFooter({ errorMessage, loading, onBack, doShareMail, disable }) {
  const { isMobile } = useDeviceContext();

  const content = (
    <Tooltip>
      <h1>Share email</h1>
      <div>Click to share a email with you`r teammates</div>
    </Tooltip>
  );
  const { sementicColors } = useCustomizations();
  const { palette } = sementicColors;

  return (
    <div className={classes['bottom']}>
      {errorMessage && (
        <div className={classes['share-error']} style={{ color: palette.redDark }}>
          <Icon iconName="ErrorBadge" />
          <Text>{errorMessage}</Text>
        </div>
      )}

      <DefaultButton disabled={disable} text="Back" onClick={onBack} />

      {doShareMail &&
        (isMobile ? (
          <PrimaryButton disabled={disable} onClick={doShareMail}>
            {loading && (
              <span>
                <Text style={textStyle}>Creating...</Text>
                <Spinner title="loading" />
              </span>
            )}

            {!loading && 'Share email'}
          </PrimaryButton>
        ) : (
          <Tooltip content={content} hidden={disable}>
            <PrimaryButton disabled={disable} onClick={doShareMail}>
              {loading && (
                <span>
                  <Text style={textStyle}>Creating...</Text>
                  <Spinner title="loading" />
                </span>
              )}

              {!loading && 'Share email'}
            </PrimaryButton>
          </Tooltip>
        ))}
    </div>
  );
}
