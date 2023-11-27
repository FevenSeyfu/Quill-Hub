import React from 'react'
import PostCard from './PostCard'

const PostsList = () => {
  const posts = [
    {
      title: 'Lorem ipsum dolor sit amet consectetur', 
      author: 'Author 1',
      date: new Date(),
      votes: 3,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem maiores ea eos eveniet, tempora corrupti similique. ',
      imageUrl:'https://source.unsplash.com/user/wsanter',
      tag : 'food'
    },
    {
      title: 'Lorem ipsum dolor sit amet consectetur', 
      author: 'Author 1',
      date: new Date(),
      votes: 3,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem maiores ea eos eveniet, tempora corrupti similique. ',
      imageUrl:'https://source.unsplash.com/user/wsanter',
      tag : 'food'
    },
    {
      title: 'Lorem ipsum dolor sit amet consectetur', 
      author: 'Author 1',
      date: new Date(),
      votes: 3,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem maiores ea eos eveniet, tempora corrupti similique. ',
      imageUrl:'https://source.unsplash.com/user/wsanter',
      tag : 'food'
    },{
      title: 'Lorem ipsum dolor sit amet consectetur', 
      author: 'Author 1',
      date: new Date(),
      votes: 3,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem maiores ea eos eveniet, tempora corrupti similique. ',
      imageUrl:'https://source.unsplash.com/user/wsanter',
      tag : 'food'
    },{
      title: 'Lorem ipsum dolor sit amet consectetur', 
      author: 'Author 1',
      date: new Date(),
      votes: 3,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem maiores ea eos eveniet, tempora corrupti similique. ',
      imageUrl:'https://source.unsplash.com/user/wsanter',
      tag : 'food'
    },{
      title: 'Lorem ipsum dolor sit amet consectetur', 
      author: 'Author 1',
      date: new Date(),
      votes: 3,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem maiores ea eos eveniet, tempora corrupti similique. ',
      imageUrl:'https://source.unsplash.com/user/wsanter',
      tag : 'food'
    }
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  )
}

export default PostsList