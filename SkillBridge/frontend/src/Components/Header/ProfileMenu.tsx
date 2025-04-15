import { Menu, rem, Avatar, Switch, Modal } from '@mantine/core';
import { openPDF } from '../../Services/Utilities';
import {
  IconMessageCircle,
  IconLogout2,
  IconUserCircle,
  IconFileText,
  IconSun,
  IconMoonStars,
  IconMoon,
} from '@tabler/icons-react';
import { useState } from 'react';
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

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(removeJwt());
  };

  const openChatModal = async () => {
    try {
      const allMessages: Message[] = await getReceiverChat(user.email);

      const grouped: { [key: string]: Message[] } = {};
      allMessages.forEach((msg) => {
        // Group received messages
        if (!grouped[msg.senderId]) {
          grouped[msg.senderId] = [];
        }
        grouped[msg.senderId].push(msg);

        // Group sent messages under user.email for reconstruction
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
  
      // Optimistically update the UI only for the active chat
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

      {/* Chat Inbox Modal */}
      <Modal opened={chatOpened} onClose={() => setChatOpened(false)} size="lg" title="Inbox">
        {Object.keys(groupedMessages).length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedMessages).map(([senderId, messages]) => {
              if (senderId === user.email) return null; // Skip user's own sent list in inbox
              return (
                <div
                  key={senderId}
                  className="border rounded p-2 shadow-sm cursor-pointer"
                  onClick={() => openChatWithSender(senderId)}
                >
                  <h2 className="font-bold text-md mb-1">From: {senderId}</h2>
                  <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
                    {messages.map((msg, index) => (
                      <li key={index} className="text-gray-700 border-b pb-1">
                        {msg.content}{' '}
                        <span className="text-xs text-gray-400">
                          ({new Date(msg.timestamp).toLocaleString()})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </Modal>

      {/* Chat Window Modal */}
      {activeSenderId && (
        <Modal
          opened={true}
          onClose={() => setActiveSenderId(null)}
          size="lg"
          title={`Chat with ${activeSenderId}`}
        >
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {groupedMessages[activeSenderId]?.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.senderId === user.email ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-2 rounded-lg ${
                    msg.senderId === user.email ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="text-xs text-gray-400">
                    ({new Date(msg.timestamp).toLocaleString()})
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="p-2 border rounded-lg flex-1"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProfileMenu;
