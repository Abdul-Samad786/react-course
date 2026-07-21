import React,{useState,useEffect} from 'react'
import { dbService } from '../appwrite/config'
import {PostCard,Container} from '../components'
function AllPost() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        const fetchPosts = async()=>{
            const response = await dbService.getPosts([]).then((posts)=>{
                if(posts){
                    setPosts(posts.documents)
                }
            })
        }
        fetchPosts()
    },[])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap gap-4'>
            {posts.map((post) => (
                <div key={post.$id} className='w-full md:w-1/2 lg:w-1/3'>
                <PostCard key={post.$id} {...post} />
                </div>
            ))}
            </div>
        </Container>
        </div>
  )
}

export default AllPost