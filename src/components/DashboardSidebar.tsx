'use client';

import { Button } from '@/components/ui/button';
import { LayoutDashboard, Settings, User } from 'lucide-react';

const DashboardSidebar = ({ loginToken }: any) => {
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
    <div className='flex flex-col justify-between border-r-2  h-[100vh] w-[11%]'>
      <div className=''>
        <div className='flex items-center px-4 py-2'>
          <h2 className='text-lg font-bold font-serif'>App Dashboard</h2>
        </div>
        <div className='flex flex-col '>
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
        </div>
      </div>
      {loginToken != '' ? (
        <Button
          variant='outline'
          className=' mx-3 mb-2.5 hover:text-white cursor-pointer hover:bg-black'
          onClick={() => {
            logoutFunction();
          }}
        >
          Logout
        </Button>
      ) : null}
    </div>
  );
};

export default DashboardSidebar;
