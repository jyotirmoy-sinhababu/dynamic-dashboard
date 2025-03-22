'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { LayoutDashboard, Settings, User } from 'lucide-react';

const DashboardSidebar = ({ loginToken }: any) => {
  const pathname = usePathname();

  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Profile',
      href: '/dashboard/profile',
      icon: User,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
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
          <h2 className='text-lg font-bold'>App Dashboard</h2>
        </div>
        <div>
          {navItems.map((item) => (
            <div key={item.href}>
              <Button
                asChild
                // isActive={pathname === item.href}
                // tooltip={item.title}
              >
                <Link href={item.href}>
                  <item.icon className='h-4 w-4' />
                  <span>{item.title}</span>
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
      {loginToken ? (
        <Button
          variant='outline'
          className=' mx-3 mb-2.5'
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
