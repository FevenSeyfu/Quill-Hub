import React from 'react'
import PostCard from './PostCard'

const PostsList = ({sidebarVisible, posts}) => {
  // const posts = [
  //   {
  //     title: 'Lorem ipsum dolor sit amet consectetur', 
  //     author: 'Author 1',
  //     date: new Date().toJSON().slice(0, 10),
  //     votes: 3,
  //     description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem maiores ea eos eveniet, tempora corrupti similique. ',
  //     imageUrl:'https://source.unsplash.com/user/wsanter',
  //     tag : 'food'
  //   }
  // ]
  return (
    <div className={`grid ${posts.length === 1 ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 p-4 ${sidebarVisible ? 'ml-64' : 'ml-16'}`}> 
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  )
}

export default PostsList