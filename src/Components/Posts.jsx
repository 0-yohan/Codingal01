import React, { useState, useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import { motion } from 'framer-motion'
import Layout from './Layout'
import { useLocation } from 'react-router-dom'

const fetchPosts = async ({ pageParam = 1 }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  return { data, nextPage: pageParam + 1, totalPages: 10 }
}

const fetchPassengers = async ({ pageParam = 0 }) => {
    const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${pageParam}&size=10`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return { 
      data: data.data, 
      nextPage: pageParam + 1, 
      totalPages: 10
    }
  }

const Posts = () => {
    const location = useLocation()  
  const [dataType, setDataType] = useState('posts')

  useEffect(() => {
    setDataType(location.pathname === '/passengers' ? 'passengers' : 'posts')
  }, [location])

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery(
    ['data', dataType],
    dataType === 'posts' ? fetchPosts : fetchPassengers,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
    }
  )
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if (status === 'loading') return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );
  if (status === 'error') return <div className="text-center text-red-500">Error: {error.message}</div>

  return (
    <><Layout />
    <div className="px-4 sm:px-6 lg:px-24  bg-amber-50">
      <div 
        className="space-y-5 overflow-y-auto"
        style={{ height: 'calc(100vh - 120px)' }}
        onScroll={handleScroll}
        
      >
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
          {page.data.map((item) => (
            <motion.div
              key={item.id || item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-lg shadow"
            >
              {dataType === 'posts' ? (
                <>
                  <h2 className="text-lg sm:text-xl font-semibold">{item.title}</h2>
                  <p className="text-sm sm:text-base text-gray-600">{item.body}</p>
                </>
              ) : (
                <>
                  <h2 className="text-lg sm:text-xl font-semibold">{item.name}</h2>
                  <p className="text-sm sm:text-base text-gray-600">{item.trips} trips</p>
                </>
              )}
            </motion.div>
          ))}
        </React.Fragment>
        ))}
        {isFetchingNextPage && (
          <div className="text-center py-4">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear'}}
              className="inline-block w-12 h-12 border-4 border-blue-500 rounded-full"
            />
          </div>
        )}
        {!hasNextPage && <div className="text-center py-4 text-gray-500">No more items to load</div>}
      </div>
    </div>
    </>
  )
}

export default Posts

