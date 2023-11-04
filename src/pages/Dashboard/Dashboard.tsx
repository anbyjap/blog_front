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
import { useQuery } from 'react-query';
import { PostCard } from '../../types/types';
import { fetchAllPosts } from '../../api';
import { useCookies } from 'react-cookie';
import { LoadingSpinner } from '../../components/Loading';

export const Dashboard = () => {
  const [cookies] = useCookies(['yenn_user_id']);
  // Dummy data array to simulate posts
  const {
    isLoading,
    error,
    data: allPosts,
  } = useQuery<PostCard[]>(
    ['allPostOnUser'],
    () => fetchAllPosts({ userId: cookies.yenn_user_id }),
    {
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    },
  );

  // Handlers for delete and edit would go here
  const handleDelete = (id: string) => {
    console.log('Delete post', id);
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
                  <Button
                    onClick={() => handleDelete(post.post_id)}
                    variant='contained'
                    color='secondary'
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
