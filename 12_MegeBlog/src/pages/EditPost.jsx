import React,{useState,useEffect} from 'react'
import PostForm from '../components/PostForm'
import {useParams,useNavigate} from 'react-router-dom'
function EditPost() {
    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        if(slug){
            const fetchPost = async()=>{
                const response = await dbService.getPost(slug).then((post)=>{
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