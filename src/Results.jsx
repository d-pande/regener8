import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

export default function Results() {
  return (
    <Container header={<Header variant="h1">Results</Header>}>
      <SpaceBetween size="l">
        <p>Results page content goes here</p>
      </SpaceBetween>
    </Container>
  );
}