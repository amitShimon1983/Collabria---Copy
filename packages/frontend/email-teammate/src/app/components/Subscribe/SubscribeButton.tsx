import { mixpanelEvent } from '@harmon.ie/collabria-frontend-shared';
import React from 'react';
import appConfig from '../../../configuration/configuration';
function SubscribeButton({ tid, upn, style = {}, className }) {
  return (
    <span
      className={className}
      style={style}
      onClick={() => {
        mixpanelEvent('Subscribe Clicked', {
          tid,
          upn,
        });
        window.open(
          `https://${appConfig.chargebeeEnv}.chargebee.com/hosted_pages/plans/${appConfig.chargebeePlan}?subscription[cf_tid]=${tid}&customer[email]=${upn}&subscription[plan_quantity]=10`,
          '',
          'toolbar=0,status=0,width=800,height=800'
        );
      }}
    >
      Subscribe
    </span>
  );
}
export default SubscribeButton;
