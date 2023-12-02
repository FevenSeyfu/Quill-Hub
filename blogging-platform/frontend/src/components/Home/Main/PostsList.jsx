import React from 'react'
import PostCard from './PostCard'

const PostsList = ({sidebarVisible, posts}) => {

  return (
    <div className={`grid ${posts.length === 1 ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 p-4 ${sidebarVisible ? 'ml-64' : 'ml-16'}`}> 
      {posts > 0 ? (posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))) : 'No Posts Yet!'}
    </div>
  )
}

export default PostsList