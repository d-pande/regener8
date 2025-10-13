import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

export default function Home() {
  return (
    <Container header={<Header variant="h1">Home</Header>}>
      <SpaceBetween size="l">
        <p>Welcome to the home page</p>
      </SpaceBetween>
    </Container>
  );
}