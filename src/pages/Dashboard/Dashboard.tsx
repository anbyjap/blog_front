import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { PostCard } from '../../types/types';
import { deletePost, fetchAllPosts } from '../../api';
import { useCookies } from 'react-cookie';
import { LoadingSpinner } from '../../components/Loading';

export const Dashboard = () => {
  const [cookies] = useCookies(['yenn_user_id', 'yenn_token']);
  const token = cookies.yenn_token;
  // Dummy data array to simulate posts
  const {
    isLoading,
    error,
    data: allPosts,
    refetch,
  } = useQuery<PostCard[]>(
    ['allPostOnUser'],
    () => fetchAllPosts({ userId: cookies.yenn_user_id }),
    {
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    },
  );

  const {
    mutate,
    isLoading: isDeleteLoading,
    error: deleteError,
  } = useMutation(deletePost, {
    onSuccess: () => {
      refetch();
    },
    // You might want to handle the error state as well
    onError: (error) => {
      // Handle the error here
      console.error('Delete failed:', error);
      alert('delete failed');
    },
  });

  // Handlers for delete and edit would go here
  const handleDelete = (postId: string) => {
    confirm('are you sure to delete this post?');
    if (typeof token === 'string') {
      mutate({ postId, token });
    }
    // Implement delete functionality
  };

  return (
    <TableContainer component={Paper}>
      <Button component={Link} to={'/editor/'} variant='contained' color='primary'>
        Create new
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            allPosts &&
            allPosts.map((post) => (
              <TableRow key={post.post_id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/editor/${post.post_id}`}
                    variant='contained'
                    color='primary'
                  >
                    Edit
                  </Button>
                  {isDeleteLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <Button
                      onClick={() => handleDelete(post.post_id)}
                      variant='contained'
                      color='secondary'
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
