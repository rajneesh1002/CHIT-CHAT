import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore"

const HomePage = ({ showPaddingTop }) => {
  const {selectedUser}=useChatStore();
  return (
    <div className="h-screen flex flex-col bg-base-200">
      <div className={`flex  items-center justify-center ${
          showPaddingTop ? "pt-20" : "pt-4"
        } px-4`}
      >
        <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]" >
          <div className="flex h-full rounded-lg overflow-hidden">
         
            <div className={`w-full sm:w-1/3 lg:w-1/4 ${selectedUser ? "hidden" : "block"} sm:block`}>
              <Sidebar />
            </div>

            
            {selectedUser && (
              <div className="w-full sm:w-2/3 lg:w-3/4 block">
                <ChatContainer />
              </div>
            )}

          
            {!selectedUser && (
              <div className="hidden sm:flex w-full sm:w-2/3 lg:w-3/4 items-center justify-center">
                <NoChatSelected />
              </div>
            )}
          </div>

        </div>
      </div>
      
    </div>
  )
}

export default HomePage
