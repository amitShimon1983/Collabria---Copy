import { gql, mixpanelEvent, useQuery } from '@harmon.ie/collabria-frontend-shared';

export const LICENSE_STATUS_QUERY = gql`
  query GetLicenseStatus {
    getLicenseStatus {
      status
      emailsShared
      walkthroughCompleted
      isNotifyOnCreateTask
    }
  }
`;

let isSent = false;

const sendUserReachedShareLimitEvent = (user: { status?: string; emailsShared: number }) => {
  if (user.status === 'active' || !user.status) {
    return;
  }

  const emailSharesLeft = Math.max(10 - user.emailsShared, 0);
  if (emailSharesLeft <= 0 && !isSent) {
    isSent = true;
    mixpanelEvent('User reached share limit', { ...user });
  }
};

export default function useUserStatus() {
  const { data, refetch: refetchUserStatus } = useQuery(LICENSE_STATUS_QUERY);
  const userStatus = data ? data.getLicenseStatus : {};
  sendUserReachedShareLimitEvent(userStatus);
  return [userStatus, refetchUserStatus];
}
