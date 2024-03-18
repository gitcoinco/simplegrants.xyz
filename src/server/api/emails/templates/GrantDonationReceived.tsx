type Props = {
  grantName: string;
};

export const GrantDonationReceived = ({ grantName }: Props) => (
  <div>
    <h1>You just received a donation!</h1>
    <h3>Someone made a donation to {grantName}.</h3>
  </div>
);
