import React from 'react'
import PostCard from './PostCard'
import { useSelector } from 'react-redux'
import Spinner from '../../Spinner'

const PostsList = ({posts}) => {
  const {isLoading} = useSelector(
    (state) => state.post
  )
  return (
    <div className={`max-w-full grid ${posts.length === 1 ? 'grid-cols-1 w-full' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 p-4`}> 
      {isLoading ? (
        <Spinner />
      ) : posts ? (posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))) : ('No Posts Yet!')}
    </div>
  )
}

export default PostsList