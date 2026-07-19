 import React,{useState,useEffect} from 'react'
 import { useParams,Navigate } from 'react-router-dom'
 import { dbService } from '../appwrite/config'
 import { useSelector } from 'react-redux'
 function Post() {
    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const user = useSelector((state)=>state.user)
    const navigate = useNavigate()
    useEffect(()=>{
        if(slug){
            const fetchPost = async()=>{
                const response = await dbService.getPost(slug).then((post)=>{
                    if(post){
                        setPost(post)
                    }
                    else{
                        navigate('/')
                    }
                })
            }
            fetchPost()
        }
    },[slug])
    if(!user){
        return <Navigate to="/login" />
    }
   return (
     <div>Post</div>
   )
 }
 
 export default Post