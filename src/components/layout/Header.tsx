import AvatarImage from "@/components/cui/AvatarImage";
import DashboardTitle from './DashboardTitle';
import { myFetch } from '@/utils/myFetch';
import { formatUrl } from '@/utils/formatUrl';
export const dynamic = "force-dynamic";

export function formatRole(role?: string): string {
  if (!role) return "";
  return role
    .toLowerCase()
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}



const Header = async () => {

  const user = await myFetch(`/user/profile`,
    {
      method: 'GET',
      tags: ['Profile']
    }
  );

  const profile = formatUrl(user?.data?.image);
  // console.log("User Profile : ", profile, user)

  return (
    <div className='flex justify-between items-center px-4 xl:px-6'>
      <DashboardTitle />
      <div className='h-full flex items-center justify-end gap-2 px-2 py-4'>
        <div className='h-full flex gap-3 items-center group bg-gray-50 rounded-lg px-2 py-1.5'>
          <div className='flex items-center justify-center'>
            <AvatarImage src={profile} width={100} height={100} alt="profileImage" className='w-12.5 h-12.5 rounded-full object-fit border' />
          </div>
          <p className='flex flex-col'>
            <span className='font-semibold text-lg text-gray-800 group-hover:text-gray-500 transition-colors duration-300'>{user?.data?.name}</span>
            <span className='font-semibold text-sm text-gray-700 group-hover:text-gray-400 transition-colors duration-300 '>{formatRole(user?.data?.role)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header