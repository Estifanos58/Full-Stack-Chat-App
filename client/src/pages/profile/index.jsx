import React, { useState } from "react";
import { useAppStore } from "@/store";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "../../lib/utils";

const Profile = () => {
  const { userInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const saveChange = async () => {};

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text=4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-ful w-32 m:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {Image ? (
                <AvatarImage
                  src={Image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {
              
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
