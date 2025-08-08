import { Link, useLocation } from "react-router";
import { useTheme, getColorClasses } from "../hooks/useTheme";
import { useSidebar } from "../hooks/useSidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  UsersIcon,
  CubeIcon,
  ShoppingCartIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: HomeIcon },
  { label: "Users", to: "/users", icon: UsersIcon },
  { label: "Products", to: "/products", icon: CubeIcon },
  { label: "Orders", to: "/orders", icon: ShoppingCartIcon },
  { label: "Settings", to: "/settings", icon: Cog6ToothIcon },
];

export default function Sidebar({
  setsideBarForMobile,
}: {
  setsideBarForMobile?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const location = useLocation();
  const { colorTheme } = useTheme();
  const colors = getColorClasses(colorTheme);
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? "4rem" : "16rem",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`h-full ${colors.primary} text-white flex flex-col py-6 px-3 fixed left-0 top-0 z-30 min-h-screen`}
    >
      {/* Header with toggle button */}
      <div className="flex items-center justify-between mb-8">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              key="title"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className={`text-2xl font-bold tracking-tight ${
                !isCollapsed ? "text-nowrap" : ""
              }`}
            >
              Matjar Dashboard
            </motion.div>
          )}
        </AnimatePresence>

        {/* button toggle for Desktop */}
        <div className="lg:block hidden">
          <motion.button
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg ${
              colors.primaryHover
            } transition-colors ${isCollapsed ? "mx-auto" : ""}`}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <AnimatePresence mode="wait">
              {isCollapsed ? (
                <motion.div
                  key="expand"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="collapse"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        {/* button toggle for phones */}
        <div
          className={`block lg:hidden p-2 rounded-lg ${
            colors.primaryHover
          } transition-colors ${isCollapsed ? "mx-auto" : ""}`}
        >
          <motion.div
            key="collapse"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setsideBarForMobile!(false);
            }}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.to);

          return (
            <div key={item.to} className="relative group">
              <Link
                to={item.to}
                className={`flex items-center rounded-lg px-3 py-3 text-lg font-medium transition-all duration-200 ${
                  colors.primaryHover
                } ${isActive ? colors.primaryActive : ""} ${
                  isCollapsed ? "justify-center" : "justify-start"
                }`}
              >
                <Icon className="w-6 h-6 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap shadow-lg">
                  {item.label}
                  {/* Arrow pointing to the sidebar */}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </motion.aside>
  );
}
