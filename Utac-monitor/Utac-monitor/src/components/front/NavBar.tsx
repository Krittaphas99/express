import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import AuthPopup from "@/pages/form";
import { AuthenAPI } from "@/service/auth";
import { user } from "@/types/User";
const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "About", href: "/about", current: false },
  { name: "Contacts", href: "/contacts", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [User, setUser] = useState<user>();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      const fetchCurrentUser = async () => {
        try {
          const response = await AuthenAPI.currentUser();
          console.log(response.data);
          setUser(response.data);
        } catch (error) {
          setIsLoggedIn(false);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          console.error("Failed to fetch user data", error);
        }
      };
      fetchCurrentUser();
     // เรียกใช้งาน
    }
    else{
      setIsLoggedIn(false);}
  }
  , []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // ลบ token
    setIsLoggedIn(false);
  };

  return (
    <Disclosure as="nav" className="bg-sky-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="/images/girl.png"
                className="h-8 w-auto"
                color="bg-white"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            

            <div className="relative ml-3">
              <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="relative flex items-center gap-2 rounded-full bg-purple-800 p-2 text-cyan-50 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                  >
                    <span className="sr-only">View notifications</span>
                    <PlusIcon className="h-5 w-5 text-cyan-50" aria-hidden="true" />
                   <span className="text-sm font-semibold">Add</span>
                  </button>
                {isLoggedIn ? (
                  // ปุ่ม Logout ถ้าเข้าสู่ระบบแล้ว

                  <div>
                    {
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              alt=""
                              src={User?.image}
                              className="size-8 rounded-full"
                            />
                          </MenuButton>
                        </div>
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                          <MenuItem>
                            <a
                              href="/profile"
                              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                              Your Profile
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                              Settings
                            </a>
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={`block px-4 py-2 text-sm text-gray-700 ${
                                  active ? "bg-gray-100" : ""
                                }`}
                              >
                                Sign out
                              </button>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Menu>
                    }
                  </div>
                ) : (
                  // ปุ่ม Login ถ้ายังไม่ได้ล็อกอิน
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                  >
                    Login
                  </button>
                )}

                {/* Popup Login */}
                {isLoginOpen && (
                  <AuthPopup
                    isOpen={isLoginOpen}
                    setIsOpen={setIsLoginOpen}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
