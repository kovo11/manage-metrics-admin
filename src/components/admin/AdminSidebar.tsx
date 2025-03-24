
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  LayoutGrid, 
  BarChart3, 
  Settings,
  LogOut 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface AdminSidebarProps {
  isOpen: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: LayoutGrid,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

const AdminSidebar = ({ isOpen }: AdminSidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out",
        {
          "-translate-x-full md:translate-x-0 md:w-20": !isOpen,
        }
      )}
    >
      <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4">
        <div className={cn("flex items-center", !isOpen && "justify-center")}>
          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary mr-2">
            <span className="text-lg font-bold text-white">A</span>
          </div>
          {isOpen && <span className="text-xl font-bold">Admin</span>}
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  {
                    "bg-gray-100": location.pathname === item.href,
                    "justify-center": !isOpen,
                    "hover:bg-gray-50": location.pathname !== item.href,
                  }
                )}
              >
                <item.icon
                  className={cn("h-5 w-5", {
                    "text-primary": location.pathname === item.href,
                    "text-gray-500": location.pathname !== item.href,
                  })}
                />
                {isOpen && (
                  <span
                    className={cn("ml-3", {
                      "text-primary": location.pathname === item.href,
                    })}
                  >
                    {item.title}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-2 border-t border-gray-200">
        <Button 
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 px-3 py-2.5",
            {
              "justify-center": !isOpen,
            }
          )}
        >
          <LogOut className="h-5 w-5" />
          {isOpen && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
