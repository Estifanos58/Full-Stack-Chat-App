import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import { FaPlus } from "react-icons/fa";
  import { useState } from "react";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { apiClient } from "@/lib/api-client";
  import { SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { Avatar } from "@/components/ui/avatar";
  import { AvatarImage } from "@/components/ui/avatar";
  import { getColor } from "@/lib/utils";
  import { HOST } from "@/utils/constants";
  import { useAppStore } from "@/store";
  
  const CreateChannel = () => {
    const { setSelectedChatType, setSelectedChatData} = useAppStore();
    const [openNewContact, setOpenNewContact] = useState(false);
  
    const searchContacts = async (searchTerm) => {
      try {
        if (searchTerm.length > 0) {
          const response = await apiClient.post(
            SEARCH_CONTACTS_ROUTES,
            { searchTerm },
            { withCredentials: true }
          );
          console.log("response data: "+response.data.contacts)
          if (response.status === 200 && response.data.contacts) {
            setSearchedContacts(response.data.contacts);
          }
        } else {
          setSearchedContacts([]);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    const [searchedContacts, setSearchedContacts] = useState([]);
    console.log(searchedContacts)
  
    const selectNewContact = (contact) => {
      setOpenNewContact(false);
      setSelectedChatType("contact");
      setSelectedChatData(contact);
      setSearchedContacts([]);
    }
  
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaPlus
                className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300 "
                onClick={() => setOpenNewContact(true)}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-2 text-white">
              Select New Contact
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Dialog open={openNewContact} onOpenChange={setOpenNewContact}>
          <DialogContent className="bg-[#181920] border-none text-white w-[480px] h-[400px] flex flex-col">
            <DialogHeader>
              <DialogTitle>Please select a contact</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div>
              <Input
                placeholder="Search Contacts"
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
                onChange={(e) => searchContacts(e.target.value)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  export default CreateChannel;