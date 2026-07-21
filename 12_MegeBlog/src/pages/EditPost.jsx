import React,{useState,useEffect} from 'react'
import PostForm from '../components/PostForm'
import {useParams,useNavigate} from 'react-router-dom'

import {Container} from '../components'
import { dbService } from '../appwrite/config'
function EditPost() {
    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        console.log("[EditPost] slug from params:", slug)
        if(slug){
            const fetchPost = async()=>{
                await dbService.getPost(slug).then((post)=>{
                    if(post){
                        setPost(post)
                    }
                })
            }
            fetchPost()
        }
    },[slug,navigate])
  return (
    post? (
    <div className='w-full py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
    ): null
  )
}

export default EditPost