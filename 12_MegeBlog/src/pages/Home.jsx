import React,{useState,useEffect} from 'react'
import  {dbService} from '../appwrite/config'
import {PostCard,Container} from '../components'
function Home() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        const fetchPosts = async()=>{
            await dbService.getPosts().then((posts)=>{
                if(posts){
                    setPosts(posts.documents)
                }
            })
        }
        fetchPosts()
    },[])
    if (posts.length === 0) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap gap-4'>
                        <p>No posts available.</p>
                    </div>
                </Container>
            </div>
        )
    }
    else{
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap gap-4'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home