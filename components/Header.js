import {
  CalendarIcon,
  LightningBoltIcon,
  LockOpenIcon,
  LoginIcon,
  PlusCircleIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/outline";

import HeaderItem from "./HeaderItem";
import Link from "next/link";
import { useAuth } from "../auth/auth";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center content-center h-auto">
      <nav className="flex flex-end flex-end max-w-2xl">
        <HeaderItem title="EVENTS" href="/" Icon={LightningBoltIcon} />
        {user && (
          <>
            <HeaderItem title="NEW" href="/newevent" Icon={PlusCircleIcon} />
            <HeaderItem title="CALENDAR" href="/" Icon={CalendarIcon} />
            <HeaderItem title="ACCOUNT" href="/profile" Icon={UserCircleIcon} />
          </>
        )}
        {!user && (
          <>
            <HeaderItem title="LOGIN" href="/login" Icon={LockOpenIcon} />
          </>
        )}
      </nav>
      <Link href="/">
        <a className="text-2xl font-black">eventually</a>
      </Link>
    </header>
  );
}
