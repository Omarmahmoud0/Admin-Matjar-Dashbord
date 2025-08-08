import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Globe, Bell } from "lucide-react";
import { Link } from "react-router";

const dummyNotifications = [
  {
    id: 1,
    message: "New order received!",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: 2,
    message: "Product stock low: Headphones",
    timestamp: "10 min ago",
    read: true,
  },
  {
    id: 3,
    message: "User John Doe updated profile",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: 1,
    message: "New order received!",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: 2,
    message: "Product stock low: Headphones",
    timestamp: "10 min ago",
    read: true,
  },
  {
    id: 3,
    message: "User John Doe updated profile",
    timestamp: "1 hour ago",
    read: false,
  },
];

const dummyUser = {
  name: "John Doe",
  avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random&size=40",
};

export default function Navbar() {
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(dummyNotifications);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm z-40">
      {/* Left: Logo or Brand */}
      <div className="lg:hidden flex items-center gap-2">
        <span className="font-bold text-lg tracking-tight">Dashboard</span>
      </div>

      {/* Center: Responsive Spacer */}
      <div className="flex-1" />

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Change Language"
              className="cursor-pointer"
            >
              <Globe className="w-5 h-5" />
              <span className="sr-only">Change Language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleLanguageChange("en")}
              className={language === "en" ? "font-semibold" : ""}
            >
              English
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleLanguageChange("ar")}
              className={language === "ar" ? "font-semibold" : ""}
            >
              Arabic
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              className="cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="sr-only">Notifications</span>
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-2 right-2 block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b font-semibold text-base">
              Notifications
            </div>
            <ul className="max-h-60 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
              {notifications.length === 0 ? (
                <li className="p-4 text-center text-sm text-gray-500">
                  No notifications
                </li>
              ) : (
                notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`flex items-start gap-2 px-4 py-3 ${
                      n.read
                        ? "bg-transparent"
                        : "bg-gray-50 dark:bg-gray-900/40"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 mt-2 rounded-full ${
                        n.read ? "bg-gray-300" : "bg-blue-500 animate-pulse"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {n.message}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {n.timestamp}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </PopoverContent>
        </Popover>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 cursor-pointer"
              aria-label="User Profile"
            >
              <img
                src={dummyUser.avatar}
                alt={dummyUser.name}
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 object-cover"
              />
              <span className="hidden sm:inline text-sm font-medium text-gray-900 dark:text-white">
                {dummyUser.name}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex items-center gap-3 ">
                <img
                  src={dummyUser.avatar}
                  alt={dummyUser.name}
                  className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 object-cover"
                />
                <div className="flex flex-col gap-1 ">
                  <span className=" text-sm font-medium text-gray-900 dark:text-white">
                    {dummyUser.name}
                  </span>
                  <p className="text-gray-400 text-xs">omar@gmail.com</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/settings"} className="cursor-pointer w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
