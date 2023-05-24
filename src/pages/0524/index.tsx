import { Container, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Post {
  id: number;
  userId: string;
  title: string;
  body: string;
}

function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState<Error>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setPageError(undefined);

        const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(postsResponse.data);
      } catch (error) {
        if (error instanceof Error) {
          setPageError(error);
        }
        console.trace(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <Container>loading...</Container>;

  if (pageError) return <Container>에러 발생</Container>;

  return (
    <Stack>
      {posts.map(post => (
        <Container>{JSON.stringify(post)}</Container>
      ))}
    </Stack>
  );
}

export default Page;
