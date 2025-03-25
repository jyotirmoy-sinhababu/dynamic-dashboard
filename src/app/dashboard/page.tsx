'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { AlertCircle, Loader2 } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Dashboard = () => {
  const [loginToken, setLoginToken] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'title' | 'id'>('title');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        router.push('/login');
      }
      setLoginToken(token);
    };
    checkAuth();
    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        setPosts(response.data);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter((post) => {
      if (filterType === 'title') {
        return post.title.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return post.id.toString().includes(searchTerm);
      }
    });

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterType, posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='flex sm:flex-row flex-col'>
      <DashboardSidebar loginToken={loginToken} />
      <div className='space-y-4 sm:mx-[5%] mx-[3%] sm:mt-[11%] mt-[3%]'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-1 items-center gap-2'>
            <Input
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='max-w-xs font-serif'
            />
            <Select
              value={filterType}
              onValueChange={(value) => setFilterType(value as 'title' | 'id')}
            >
              <SelectTrigger className='w-32'>
                <SelectValue placeholder='Filter by' />
              </SelectTrigger>
              <SelectContent className='bg-[#706666]'>
                <SelectItem value='title' className='font-serif'>
                  Title
                </SelectItem>
                <SelectItem value='id' className='font-serif'>
                  ID
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='text-sm text-muted-foreground'>
            Showing {indexOfFirstPost + 1}-
            {Math.min(indexOfLastPost, filteredPosts.length)} of{' '}
            {filteredPosts.length} posts
          </div>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-16 font-serif'>No.</TableHead>
                <TableHead className='font-serif'>Title</TableHead>
                <TableHead className='hidden md:table-cell font-serif'>
                  Content
                </TableHead>
                <TableHead className='w-16 font-serif'>User ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => {
                  return (
                    <TableRow key={post.id}>
                      <TableCell className='font-serif'>{post.id}</TableCell>
                      <TableCell className='font-medium font-serif'>
                        {post.title}
                      </TableCell>
                      <TableCell className='hidden max-w-xs truncate md:table-cell font-serif'>
                        {post.body}
                      </TableCell>
                      <TableCell className='font-serif'>
                        {post.userId}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className='h-24 text-center font-serif'
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                />
              </PaginationItem>
              <div className='flex flex-wrap'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={page === currentPage}
                          className='cursor-pointer'
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                )}
              </div>

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
