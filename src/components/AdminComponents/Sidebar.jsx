import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname(); // Get the current pathname

  const links = [
    {
      href: "/admin/addBlog",
      label: "Add Blogpost",
      icon: "/admin-img/add.png",
    },
    {
      href: "/admin/addService",
      label: "Add Service",
      icon: "/admin-img/add.png",
    },
    {
      href: "/admin/blogList",
      label: "Blog List",
      icon: "/admin-img/write.png",
    },
    {
      href: "/admin/servicesList",
      label: "Service List",
      icon: "/services.png",
    },
    {
      href: "/admin/subcriptions",
      label: "Subscriptions",
      icon: "/admin-img/email.png",
    },
  ];

  return (
    <div className="flex flex-col min-h-[100vh] bg-blue-100 border-r dark:bg-[#0F0F0F] dark:text-[#eee]">
      {/* Sidebar container with responsive width */}
      <div className="w-[112px] sm:w-[320px] h-full relative py-6 border-r dark:border-gray-700 transition-all duration-300">
        <div className="flex flex-col items-center sm:items-start">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 font-medium mt-5 px-3 py-2 rounded-xl w-full ${
                pathname === link.href
                  ? "shadow-[-5px_5px_0px_#000000] dark:shadow-[-5px_5px_0px_#242323] dark:bg-[#242323] bg-gray-200"
                  : "bg-white text-black"
              }`}
            >
              <Image
                src={link.icon}
                alt={link.label}
                width={28}
                height={28}
              />
              <p className="text-[8px]">{link.label}</p> {/* Show label only on larger screens */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
