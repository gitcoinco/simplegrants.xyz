type Props = {
  grantName: string;
  roundName: string;
};

export const GrantApplies = ({ grantName, roundName }: Props) => (
  <div>
    <h1>
      {grantName} just applied to {roundName}!
    </h1>
  </div>
);
