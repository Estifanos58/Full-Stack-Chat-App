import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { FaPlus } from "react-icons/fa"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
  

const NewDm = () => {
    const [openNewContact, setOpenNewContact] = useState(false)

    const searchContacts = async (searchTerm)=>{}
    const [searchedContacts, setSetsearchedContacts] = useState([]);

  return (
    <>
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaPlus className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300 "  onClick={()=> setOpenNewContact(true)}/>
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
                    <DialogDescription>
                        
                    </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input
                        placeholder="Search Contacts"
                        className="rounded-lg p-6 bg-[#2c2e3b] border-none "
                        onChange={(e)=>searchContacts(e.target.value)}
                       />
                    </div>
                    {
                        searchedContacts.length <=0 && (<div className="text-2xl flex flex-col justify-center items-center h-[100%]">
                            Their is no Contact😒
                        </div>)
                    }
                </DialogContent>
            </Dialog>

    </>
  )
}

export default NewDm