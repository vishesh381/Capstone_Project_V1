import { Menu, rem, Avatar, Switch, Drawer, Box } from '@mantine/core';
import { openPDF } from '../../Services/Utilities';
import { useMantineTheme } from "@mantine/core";
import { getUserByEmail } from '../../Services/UserService';
import {
  IconMessageCircle,
  IconLogout2,
  IconUserCircle,
  IconFileText,
  IconSun,
  IconMoonStars,
  IconMoon,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../../Slices/UserSlice';
import { removeJwt } from '../../Slices/JwtSlice';
import { clearLatestMessage } from '../../Slices/MessageSlice';
import { getReceiverChat, sendMessage } from '../../Services/MessageService';

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
}

const ProfileMenu = () => {
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const latestMessage = useSelector((state: any) => state.messages.latestMessage);
  const [opened, setOpened] = useState(false);
  const [chatOpened, setChatOpened] = useState(false);
  const [checked, setChecked] = useState(false);
  const [groupedMessages, setGroupedMessages] = useState<{ [key: string]: Message[] }>({});
  const [activeSenderId, setActiveSenderId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(removeJwt());
  };
  const [userNames, setUserNames] = useState<{ [email: string]: string }>({});

  useEffect(() => {
    const fetchNames = async () => {
      const senderEmails = Object.keys(groupedMessages).filter(email => email !== user.email);
      const uniqueEmails = Array.from(new Set(senderEmails)); // makes it a normal array
  
      uniqueEmails.forEach(async (email) => {
        if (!userNames[email]) {
          try {
            const userDetails = await getUserByEmail(email); // fetch user object
            console.log("userDetails+++"+userDetails.name);
            setUserNames((prev) => ({ ...prev, [email]: userDetails.name }));
          } catch (err) {
            console.error("Failed to fetch user for email:", email);
          }
        }
      });
    };
  
    fetchNames();
  }, [groupedMessages]);
  
  const openChatModal = async () => {
    try {
      const allMessages: Message[] = await getReceiverChat(user.email);

      const grouped: { [key: string]: Message[] } = {};
      allMessages.forEach((msg) => {
        if (!grouped[msg.senderId]) {
          grouped[msg.senderId] = [];
        }
        grouped[msg.senderId].push(msg);

        if (msg.senderId === user.email) {
          if (!grouped[user.email]) grouped[user.email] = [];
          grouped[user.email].push(msg);
        }
      });

      setGroupedMessages(grouped);
      setChatOpened(true);
      dispatch(clearLatestMessage());
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const openChatWithSender = (senderId: string) => {
    const allMessages = groupedMessages[senderId] || [];
    const sorted = allMessages.sort((a, b) => a.timestamp - b.timestamp);
    setGroupedMessages((prev) => ({ ...prev, [senderId]: sorted }));
    setActiveSenderId(senderId);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeSenderId) return;

    const message: Message = {
      senderId: user.email,
      receiverId: activeSenderId,
      content: newMessage.trim(),
      timestamp: Date.now(),
    };

    try {
      await sendMessage(message);
      setGroupedMessages((prev) => {
        const updated = { ...prev };
        const existing = updated[activeSenderId] || [];
        updated[activeSenderId] = [...existing, message];
        return updated;
      });

      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };
  const formatTimestamp = (timestamp: number) => {
    const messageDate = new Date(timestamp);
    const today = new Date();

    // Check if the message is from today
    if (messageDate.toDateString() === today.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }) + ' ' + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };
  return (
    <>
      <Menu shadow="md" width={220} opened={opened} onChange={setOpened}>
        <Menu.Target>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="xs-mx:hidden">{user.name}</div>
            <Avatar
              src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : '/avatar.png'}
              alt="avatar"
            />
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Link to="/profile">
            <Menu.Item leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}>
              Profile
            </Menu.Item>
          </Link>

          <Menu.Item
            onClick={openChatModal}
            leftSection={
              <div style={{ position: 'relative' }}>
                <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
                {latestMessage && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -4,
                      right: -6,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'red',
                    }}
                  />
                )}
              </div>
            }
          >
            Messages
          </Menu.Item>

          {latestMessage && (
            <Menu.Item onClick={openChatModal}>
              <div>
                <div className="text-sm font-semibold">New message</div>
                <div className="text-xs text-gray-500 truncate max-w-[140px]">
                  {latestMessage.content}
                </div>
              </div>
            </Menu.Item>
          )}

          <Menu.Item
            leftSection={<IconFileText style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => {
              if (profile?.resume) {
                openPDF(profile.resume);
              } else {
                alert('Resume not available.');
              }
            }}
          >
            Resume
          </Menu.Item>

          <Menu.Item
            leftSection={<IconMoon style={{ width: rem(14), height: rem(14) }} />}
            rightSection={
              <Switch
                size="sm"
                color="dark"
                className="cursor-pointer"
                onLabel={<IconSun style={{ width: rem(14), height: rem(14) }} stroke={2.5} color="yellow" />}
                offLabel={<IconMoonStars style={{ width: rem(14), height: rem(14) }} stroke={2.5} color="cyan" />}
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
              />
            }
          >
            Dark Mode
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            onClick={handleLogout}
            color="red"
            leftSection={<IconLogout2 style={{ width: rem(14), height: rem(14) }} />}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Drawer
  opened={chatOpened}
  onClose={() => {
    setChatOpened(false);
    setActiveSenderId(null);
  }}
  size="xl"
  position="right"
  title="Messages"
  padding="md"
  styles={{
    body: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  }}
>
  <Box
    maw="100%" // Ensures Box takes the full width of Drawer
    h="100%"   // Ensures Box takes the full height of Drawer
    bg={theme.colors.mineShaft?.[9] || "dark"}
    p="md"
    style={{ borderRadius: 12, boxShadow: "0 0 12px rgba(0,0,0,0.5)" }}
  >
    <div className="flex h-full">
      {/* Chat List */}
      <div className="w-1/2 flex flex-col overflow-y-auto pr-2">
  {Object.entries(groupedMessages).map(([senderId, messages]) => {
    if (senderId === user.email) return null;
    const name = userNames[senderId] || senderId;

    return (
      <div
        key={senderId}
        className={`p-3 cursor-pointer hover:bg-gray-100 ${
          activeSenderId === senderId ? 'bg-gray-200' : ''
        }`}
        onClick={() => openChatWithSender(senderId)}
      >
        <h2 className="font-medium text-sm">From: {name}</h2>
        <p className="text-xs text-gray-500 truncate">
          {messages[messages.length - 1]?.content}
        </p>
      </div>
    );
  })}
</div>


      {/* Active Chat */}
      <div className="w-1/2 flex flex-col overflow-hidden">
        {activeSenderId ? (
          <>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 border-l">
              {groupedMessages[activeSenderId]?.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.senderId === user.email ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-2 rounded-lg ${
                      msg.senderId === user.email ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs text-gray-500">
  {formatTimestamp(msg.timestamp)}
</span>

                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 border-l">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  </Box>
</Drawer>


    </>
  );
};

export default ProfileMenu;
