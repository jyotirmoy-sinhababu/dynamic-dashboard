'use client';

import { Button } from '@/components/ui/button';
import { LayoutDashboard, Settings, User } from 'lucide-react';

interface DashboardSidebarProps {
  loginToken: string | null;
}

const DashboardSidebar = ({ loginToken }: DashboardSidebarProps) => {
  const navItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Profile',
      icon: User,
    },
    {
      title: 'Settings',
      icon: Settings,
    },
  ];

  const logoutFunction = () => {
    localStorage.removeItem('auth_token');
  };

  return (
    <div className='flex flex-col gap-2.5 border-r-2  sm:h-[100vh] sm:w-[11%] sm:mb-0 mb-6'>
      <div className='flex items-center px-4 py-2'>
        <h2 className='text-lg font-bold font-serif'>App Dashboard</h2>
      </div>
      <div className='flex sm:flex-col flex-row items-center '>
        {navItems.map((item, index) => {
          return (
            <div key={index} className='mx-1'>
              <Button className='mt-5 w-full  hover:bg-[#635f5f]  hover:text-white cursor-pointer'>
                <item.icon className='h-4 w-4' />
                <span>{item.title}</span>
              </Button>
            </div>
          );
        })}
        {loginToken ? (
          <Button
            variant='outline'
            className=' mt-9 sm:w-full  hover:bg-[#635f5f]  hover:text-white cursor-pointer'
            onClick={() => {
              logoutFunction();
            }}
          >
            Logout
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default DashboardSidebar;
