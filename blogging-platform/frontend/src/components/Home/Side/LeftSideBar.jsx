import React from 'react'
import {Search} from './Search'
import {RecentPosts} from './RecentPosts'
import {PopularStories} from './PopularStories'

const LeftSideBar = () => {
  return (
    <div>
      <Search />
      <RecentPosts />
      <PopularStories />
    </div>
  )
}

export default LeftSideBar