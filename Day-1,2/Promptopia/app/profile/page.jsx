"use client";

import React, { useEffect, useState } from 'react'
import Profiles from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState()
  const router  =useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      console.log(data)
      setPosts(data)
    }
    fetchPost()
  }, [session?.user.id])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        console.log(post)
        const filteredPosts = posts?.filter((item) => item._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Profiles
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default Profile