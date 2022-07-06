import { gql, useMutation } from '@harmon.ie/collabria-frontend-shared';

interface shareMailProps {
  messageId: string;
}
export const SHARE_MESSAGE = gql`
  mutation CreateMessage($messageId: String!) {
    createMessage(args: { messageId: $messageId }) {
      _id
    }
  }
`;
export const useShareMessage = () => {
  const [shareMail, { data, error, loading }] = useMutation(SHARE_MESSAGE);
  return { data, error, loading, shareMail };
};
