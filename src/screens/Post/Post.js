import React, { useState,useEffect } from 'react';
import { ArrowLeftRight, ChatDots, Save } from 'react-bootstrap-icons';
import CardComments from '../../components/CardComments/CardComments';
import { getPost } from '../../lensQueries/getPost';
import { getPostComments } from '../../lensQueries/getPostComments';

import './post.css';

export default function Post() {

  const [post,setPost] = useState();
  const [img, setImg] = useState('');
  const [comments,setComments] = useState([]);
  const [userImg,setUserImg] = useState('')

  const postId = localStorage.getItem('idPost');

  useEffect(() => {
    const foundPost = async() => {
      const postFound = await getPost(postId);
      setPost(postFound.data.publication);
      const newEndpoint = postFound.data.publication.metadata.media[0].original.url.substring(7);
      const url = `https://ipfs.io/ipfs/${newEndpoint}`;
      setImg(url);
      const endpointUser = postFound.data.publication.profile.picture.original.url;
      if(endpointUser.startsWith('https://lens.infura-ipfs.io')) {
        let endUser = postFound.data.publication.profile.picture.original.url
        setUserImg(endUser)
      } else {
        let endUser = postFound.data.publication.profile.picture.original.url.substring(7)
        const urlUser = `https://ipfs.io/ipfs/${endUser}`;
        setUserImg(urlUser);
      }
    }
    foundPost()
  }, [postId])

  useEffect(() => {
    const foundPostComments = async(id) => {
        const postComments = await getPostComments(id);
        setComments(postComments.data.publications.items);
    }
    if(post) {    
      foundPostComments(post.id)
    }
    },[post])
  
  
  return (
    <div className='post'>
     {
      post &&
      <>
        <div className='post-illustration'>
          <img className='post-illustation-image'  src={ img } alt='ilustration'/>
          <div className='post-illustration-container'>
            <div className='post-illustration-container-icons'>
              <Save className='post-illustration-container-icons-i'/>
              <p className='post-illustration-container-icons-p'>{ post.stats.totalAmountOfCollects }</p>
            </div>
            <div className='post-illustration-container-icons'>
              <ArrowLeftRight className='post-illustration-container-icons-i'/>
              <p className='post-illustration-container-icons-p'>{ post.stats.totalAmountOfMirrors }</p>
            </div>
            <div className='post-illustration-container-icons'>
              <ChatDots className='post-illustration-container-icons-i'/>
              <p className='post-illustration-container-icons-p'>{ post.stats.totalAmountOfComments }</p>
            </div>
          </div>
        </div>

        <div className='post-information'>
          <div className='post-infomation-container'>
            <img className='post-information-picture' src={ userImg } alt='illustration'/>
            <h2 className='post-information-creator'>@{ post.profile.handle }</h2>
          </div>
          <p className='post-information-description'>{ post.metadata.description }</p>
          {
            comments.length > 0 ?
              <div style={{overflowY: 'scroll'}}>
              {
                comments.map(comment => (
                  <CardComments
                    key= { comment.id }
                    profile={ comment.profile.picture}
                    creator={ comment.profile.handle }
                    comment={ comment.metadata.content }
                  />         
                ))
              }
              </div>
              :
              <p className='nocomments'>
                NO COMMENTS
              </p>
          }
        </div>
    </>
    }
  </div>
  )
}
