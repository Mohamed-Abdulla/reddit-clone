import Image from "next/image";
import { BeakerIcon, HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  BellIcon,
  PlusIcon,
  SparklesIcon,
  VideoCameraIcon,
  GlobeAltIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Bars3Icon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import { signIn, useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const { data: session } = useSession();
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm items-center">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Link href="/">
          <Image src="/logo.png" layout="fill" objectFit="contain" />
        </Link>
      </div>
      <Link href="/">
        <div className="flex items-center mx-7 xl:min-w-[300px]">
          <HomeIcon className="h-5 w-5 cursor-pointer" />
          <p className="flex-1 ml-2 hidden lg:inline">Home</p>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </Link>
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        <input className="flex-1 bg-transparent outline-none" type="text" placeholder="Search Reddit" />
        <button type="submit" hidden />
      </form>
      <div className="text-gray-500 space-x-2 items-center hidden lg:inline-flex mx-5">
        <SparklesIcon className="icon" />
        <GlobeAltIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatBubbleOvalLeftEllipsisIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <MegaphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <Bars3Icon className="icon" />
      </div>

      {/* Signin */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="lg:flex hidden items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
        >
          <div className="h-5 w-5 relative flex-shrink-0">
            <Image objectFit="contain" src="/logoMini.png" layout="fill" />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>
          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
        >
          <div className="h-5 w-5 relative flex-shrink-0">
            <Image objectFit="contain" src="/logoMini.png" layout="fill" />
          </div>
          <p className="text-gray-400">Sign In </p>
        </div>
      )}
    </div>
  );
};

export default Header;
