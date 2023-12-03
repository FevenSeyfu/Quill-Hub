import React from 'react'
import PostCard from './PostCard'
import { useSelector } from 'react-redux'

const PostsList = ({sidebarVisible, posts}) => {
  const {isLoading} = useSelector(
    (state) => state.post
  )
  return (
    <div className={`max-w-4/6 grid ${posts.length === 1 ? 'grid-cols-1 w-full' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 p-4 ${sidebarVisible ? 'ml-64' : 'ml-16'}`}> 
      {isLoading ? (
        'Loading posts...'
      ) : posts.length > 0 ? (posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))) : 'No Posts Yet!'}
    </div>
  )
}

export default PostsList