import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BiSearchAlt2 } from "react-icons/bi";
import Logo from "../assets/annuaire-ferme.png";
import Profile from "../assets/profile.jpg";
import { SendHorizonal } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMediaQuery } from "react-responsive";
import { MoveLeft } from "lucide-react";

const allMessages = [
  {
    id: 1,
    img: Profile,
    last_message: "Comment tu vas",
    last_name: "Leslie",
    first_name: "Alexander",
    hours: "13h23",
  },
  {
    id: 2,
    img: Profile,
    last_message: "Comment tu vas",
    last_name: "Guy",
    first_name: "Hawkins",
    hours: "13h23",
  },
  {
    id: 3,
    img: Profile,
    last_message: "Comment tu vas",
    last_name: "Leslie",
    first_name: "Alexander",
    hours: "13h23",
  },
  {
    id: 4,
    img: Profile,
    last_message: "Comment tu vas",
    last_name: "Jacob",
    first_name: "Jones",
    hours: "13h23",
  },
  {
    id: 5,
    img: Profile,
    last_message: "Comment tu vas",
    last_name: "Esther",
    first_name: "Howard",
    hours: "13h23",
  },
  {
    id: 6,
    img: Profile,
    last_message: "Comment tu vas",
    last_name: "Annette",
    first_name: "Black",
    hours: "13h23",
  },
  {
    id: 7,
    img: Profile,
    last_message: "Comment tu vas",
    last_name: "Leslie",
    first_name: "Alexander",
    hours: "13h23",
  },
  {
    id: 8,
    img: Profile,
    last_message: "Comment tu vas",
    last_name: "Leslie",
    first_name: "Alexander",
    hours: "13h23",
  },
  {
    id: 9,
    img: Profile,
    last_message: "Comment tu vas",
    last_name: "Leslie",
    first_name: "Alexander",
    hours: "13h23",
  },
  {
    id: 10,
    img: Profile,
    last_message: "Comment tu vas",
    last_name: "Leslie",
    first_name: "Alexander",
    hours: "13h23",
  },
  {
    id: 11,
    img: Profile,
    last_message: "Comment tu vas",
    last_name: "Leslie",
    first_name: "Alexander",
    hours: "13h23",
  },
];

function Chat() {
  const [isOpenChat, setIsOpenChat] = useState(false);

  const openDialog = () => {
    setIsOpenChat(true);
  };

  const closeDialog = () => {
    setIsOpenChat(false);
  };

  const overlayChat = () => {
    return (
      <div className="md:col-span-4 bg-gray-100 absolute top-0 w-full md:flex flex-col h-full overflow-y-auto">
        <div className="flex items-center gap-6 px-6 py-2 bg-white w-full fixed top-0 shadow">
          <button onClick={closeDialog}>
            <MoveLeft className="text-marronFonce w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="">
              <img
                className="w-[50px] h-[48px] rounded-full"
                src={Profile}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-black text-marronFonce font-medium text-xl">
                John Doe
              </h3>
              <p className="text-gray-500 text-sm">En ligne</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 px-6 pt-24 pb-16 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
          <div>
            <span className="text-md bg-gray-200 px-2 py-2 rounded">
              Comment tu vas ?
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-end">
              <span className="text-md bg-marronFonce text-white px-2 py-2 rounded text-end">
                Je vais bien et toi ?
              </span>
            </div>
            <p className="text-end text-sm text-gray-600">Lu</p>
          </div>
        </div>

        <div className="w-full relative bg-white">
          <div className="shadow-md px-6 py-2 fixed bottom-0 left-0 right-0">
            <Input
              className="w-full h-10 bg-white border-none focus:outline-none text-[16px] rounded"
              placeholder="Message"
            />
            <Button className="absolute bg-marronFonce hover:opacity-85 right-6 top-2 h-10 rounded">
              <SendHorizonal className="text-white w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const isMd = useMediaQuery({ maxWidth: 768 });

  const handleClickChat = () => {
    if (isMd) {
      openDialog();
    } else {
      closeDialog();
    }
  };

  return (
    <section>
      <div className="md:grid grid-cols-6 w-full h-screen bg-gray-100">
        <div className="bg-marronFonce flex flex-col gap-8 px-6 py-6 h-full md:col-span-2">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="bg-white rounded-full w-14 h-14 px-2 py-2">
                <img
                  src={Logo}
                  alt="logo annuaire ferme"
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-white text-3xl font-medium">
                Messages
                <span className="font-normal">(29)</span>
              </h3>
            </div>
            <div className="relative w-full">
              <Input
                className="w-full h-10 bg-background focus:outline-none focus:shadow-none text-[16px] leading-[20.16px] font-normal rounded"
                placeholder="Rechercher..."
              />
              <Button className="absolute right-0 top-1/2 transform -translate-y-1/2 px-3 py-2">
                <BiSearchAlt2 className="text-marronFonce w-6 h-6" />
              </Button>
            </div>
          </div>

          <div className="">
            <div className="flex flex-col gap-4 max-h-[calc(91vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent">
              {allMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={handleClickChat}
                  className="flex items-center gap-3 hover:bg-background4 cursor-pointer px-2 py-2 rounded"
                >
                  <div className="relative">
                    <img
                      className="w-[50px] h-[45px] rounded-full"
                      src={message.img}
                      alt=""
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-white font-medium text-base">
                        {message.last_name} {message.first_name}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {message.last_message}
                      </p>
                    </div>
                    <p className="text-gray-300 text-sm">{message.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-4 hidden relative md:flex flex-col h-screen overflow-hidden">
          <div className="bg-white flex items-center gap-3 shadow px-6 py-2">
            <div className="">
              <img
                className="w-[50px] h-[48px] rounded-full"
                src={Profile}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-black text-marronFonce font-medium text-xl">
                John Doe
              </h3>
              <p className="text-gray-500 text-sm">En ligne</p>
            </div>
          </div>

          <div className="flex flex-col gap-8 px-6 pt-12 pb-12 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
            <div>
              <span className="text-md bg-gray-200 px-2 py-2 rounded">
                Comment tu vas ?
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-end">
                <span className="text-md bg-marronFonce text-white px-2 py-2 rounded text-end">
                  Je vais bien et toi ?
                </span>
              </div>
              <p className="text-end text-sm text-gray-600">Lu</p>
            </div>
            <div>
              <span className="text-md bg-gray-200 px-2 py-2 rounded">
                Comment tu vas ?
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-end">
                <span className="text-md bg-marronFonce text-white px-2 py-2 rounded text-end">
                  Je vais bien et toi ?
                </span>
              </div>
              <p className="text-end text-sm text-gray-600">Lu</p>
            </div>  
          </div>

          <div className="w-full relative bg-white">
            <div className="shadow-md px-6 py-2">
              <Input
                className="w-full h-10 bg-white border-none focus:outline-none text-[16px] rounded"
                placeholder="Message"
              />
              <Button className="absolute bg-marronFonce hover:opacity-85 right-6 top-2 h-10 rounded">
                <SendHorizonal className="text-white w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isOpenChat && <>{overlayChat()}</>}
    </section>
  );
}

export default Chat;
