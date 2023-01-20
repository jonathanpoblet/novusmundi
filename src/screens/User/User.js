import React,{ useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserPosts } from '../../lensQueries/getUserPosts';
import { getUserProfile } from '../../lensQueries/getUserProfile';

import './user.css';

export default function User() {

    const username = localStorage.getItem('username');
    const [user,setUser] = useState('');
    const [userImg,setUserImg] = useState('');
    const [posts,setPosts] = useState([]);
    const [nextPosts,setNextPosts] = useState('');

    const navigate = useNavigate();

    function visitPost(id) {
        localStorage.setItem('idPost', id);
        navigate('/post')
    }
    
    const userPosts = async(id,nextPosts) => {
        const postsFound = await getUserPosts(id,nextPosts);
        if(posts.length === 0) {
            setPosts(postsFound.data.publications.items);
        } else {
            if(postsFound.data.publications.pageInfo.next !== null) {
                for(let i=0; i < postsFound.data.publications.items.length;i++ ) {
                        posts.push(postsFound.data.publications.items[i])
                    }
            } else {
                return
            } 
        }
            setNextPosts(postsFound.data.publications.pageInfo.next);     
    }

    const handleScroll = (e) => {
        const scrollHeight = e.target.documentElement.scrollHeight;
        const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;
        if (currentHeight >= scrollHeight) {
            userPosts(user.id,nextPosts)
        } 
    }

    useEffect(() => {
        const getUser = async(username) => {
            const userFound = await getUserProfile(username);
            setUser(userFound);
        }
        getUser(username)
    }, [username])


    useEffect(() => {
        if(user){ 
            userPosts(user.id);
        }
    }, [user])
    
    useEffect(() => {
        if(posts) {
            window.addEventListener('scroll',handleScroll);
            return () => window.removeEventListener('scroll',handleScroll)
        }
    }, [posts, nextPosts])
    
    useEffect(() => {
        if(!user.picture) {
          setUserImg('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qMiLt9hHswAmJwvufOtozjbeXQovf-ojYQ&usqp=CAU');
        } else if (user.picture.original) {
          if(user.picture.original.url) {
            if(user.picture.original.url.startsWith('https://lens.infura-ipfs.io')) {
              setUserImg(user.picture.original.url);
            } else {
              const endpoint = user.picture.original.url.substring(7);
              const url = `https://ipfs.io/ipfs/${endpoint}`
              setUserImg(url)
            }
          }
        }
    }, [user.picture])  


    return (
        <div className={ posts.length < 4 ? 'user few-posts' : 'user' } id='user'>
            <div className='user-information'>
                <img className='user-information-image' src={ user? userImg : 'https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-pure-color-simple-gray-background-image_557014.jpg' } alt='userImg' />
                <h1 className='user-information-username'>@{ user.handle }</h1>
                <div className='user-information-container'>
                    <div className='user-information-container-stats'>
                        <p className='user-information-container-stats-numbers'>{ user? user.stats.postsTotal : 0 }</p>
                        <p className='user-information-container-stats-name'>Posts</p>                      
                    </div>
                    <div className='user-information-container-stats'>
                        <p className='user-information-container-stats-numbers'>{ user? user.stats.totalFollowers: 0 }</p>
                        <p className='user-information-container-stats-name'>Followers</p>                   
                    </div>
                    <div className='user-information-container-stats'>
                        <p className='user-information-container-stats-numbers'>{ user? user.stats.totalFollowing : 0 }</p>
                        <p className='user-information-container-stats-name'>Following</p>                 
                    </div>
                </div>
            </div>
            <div className='user-posts' id='posts'>
            {
                posts.length !== 0 ? 
                <>
                    {
                        posts.map(post => (
                            <img
                                src={`https://ipfs.io/ipfs/${post.metadata.media[0].original.url.substring(7)}`}
                                key={ post.id }
                                alt={ post.id }
                                className='user-posts-images'
                                onClick={() => visitPost(post.id)}
                            />
                        ))
                    }
                </>
                :
                <p>no hay posts</p>
            }
            </div>
        </div>
    )
}
