import UserDetailContent from "@features/users/screens/UserDetailScreen";
import { Container } from "@mui/material";

export default function UserDetailPage({ params }: { params: { id: string } }) {
  return (
    <Container>
      <UserDetailContent userId={params.id} />
    </Container>
  );
}
