import ChatList from './ChatList';

const Sidebar = ({ sidebarOpen, setSidebarOpen, onChatSelect }) => (
  <div className={`md:block ${sidebarOpen ? 'block' : 'hidden'}`}>
    <ChatList onChatSelect={onChatSelect} />
  </div>
);

export default Sidebar;
