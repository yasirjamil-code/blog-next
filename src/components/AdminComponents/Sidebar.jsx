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
      label: "Subcriptions",
      icon: "/admin-img/email.png",
    },
  ];

  return (
    <div className="flex flex-col min-h-[100vh] bg-blue-100 border-r dark:bg-[#0F0F0F] dark:text-[#eee]">
      <div className="w-28 sm:w-80 h-full relative py-12 border border-black ">
        <div className="w-[50%] sm:w-[80%] absolute right-0">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mr-3 rounded-xl flex items-center border dark:border dark:border-white border-black gap-3 font-medium mt-5 px-3 py-2 ${
                pathname === link.href
                  ? "shadow-[-5px_5px_0px_#000000] bg-gray-200"
                  : "bg-white text-black"
              } `}
            >
              <Image
                className={
                  pathname === link.href && ""
                }
                src={link.icon}
                alt={link.label}
                width={28}
                height={28}
              />
              <p>{link.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
