/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"


import { deleteCookie } from 'cookies-next/client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { sidebarData, TMenuItem } from '@/constants/sidebarData'
import { logo } from '@/app/assets/assets'
import { MdLogout } from "react-icons/md";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname === url || pathname.startsWith(`${url}/`);
  };


  const handleLogout = () => {
    toast.loading("Logging out...", {
      id: "logout",
    });

    try {
      deleteCookie("accessToken");
      deleteCookie("userRole");
      toast.success("Logged out successfully", { id: "logout" });
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message, { id: "logout" });
    }
  }

  return (
    <div className='px-2 h-screen flex flex-col bg-[#272727]'>
      <div className='w-full flex items-center justify-center pb-16 pt-8 cursor-pointer'>
        {logo && <Image src={logo} alt="privae Logo" className='w-32 h-auto object-contain' unoptimized />}
      </div>
      <div className='flex-1 flex flex-col justify-between'>
        <div className='flex flex-col justify-between gap-3 py-8'>
          {sidebarData?.map((item: TMenuItem, index) => {
            const isItemActive = isActive(item?.label);
            return (
              <Link
                href={item?.label}
                key={index}
                className={`flex gap-2.5 items-center py-2 px-4 transition-colors duration-500 cursor-pointer rounded-sm ${isItemActive ? 'text-[#FD713F]' : 'text-white'}`}
              >
                <span className='text-lg'>{item.icon}</span>
                <span className='text-sm font-semibold'>{item.title}</span>
              </Link>
            );
          })}
        </div>
        <button
          onClick={handleLogout}
          className='flex gap-2.5 items-center py-2 px-4 text-white hover:text-[#FD713F] transition-colors duration-300 rounded-sm cursor-pointer mb-8'
        >
          <span className='text-lg'>
            <MdLogout />
          </span>
          <span className='font-semibold text-sm'>Log Out</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar;
