import { getChatRoomData } from '@/actions/chat/getChatData';
import ChatRoom from '@/features/chat/ChatRoom';

type Params = {
  id: number;
};

export default async function Page({ params }: { params: Params }) {
  const id = params.id;
  const data = await getChatRoomData(id);

  return <ChatRoom room={data} />;
}
