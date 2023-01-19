import React, { useState,useEffect } from 'react';
import CardGallery from '../../components/CardGallery/CardGallery';
import { explorePublications } from '../../lensQueries/explorePublications';
import { PostFilters } from '../../utils/PostFilters';


import './gallery.css';

export default function Gallery() {

  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [postCriteria,setPostCriteria] = useState(PostFilters.latest)

  const init = async (criteria) => {
    try{
        const request = {
            sortCriteria: criteria,
            noRandomize:true,
            sources:["5bba5781-78b5-4927-8d2f-122742817583"],
            publicationTypes: ["POST"],
            cursor:"{\"timestamp\":1,\"offset\":0}", 
            limit:24
          }
        const response = await explorePublications(request)
        setPosts(response.data.explorePublications.items);
    }catch(err){
        console.log(err)
    }
  }

  

  useEffect(() => {
      init(postCriteria);
      if(posts.length > 0) {
        setLoading(false)
      } 
  },[postCriteria, posts])

  useEffect(() => {
    if(!loading) {
      const buttons = document.getElementsByClassName('gallery-filter-buttons');
        if(postCriteria === PostFilters.latest) {
          buttons[0].className += ' selected';
          buttons[1].className = 'gallery-filter-buttons';
          buttons[2].className = 'gallery-filter-buttons';
          buttons[3].className = 'gallery-filter-buttons';
        } else if(postCriteria === PostFilters.commented) {
          buttons[0].className = 'gallery-filter-buttons';
          buttons[1].className += ' selected';
          buttons[2].className = 'gallery-filter-buttons';
          buttons[3].className = 'gallery-filter-buttons';
        } else if(postCriteria === PostFilters.collected) {
          buttons[0].className = 'gallery-filter-buttons';
          buttons[1].className = 'gallery-filter-buttons';
          buttons[2].className += ' selected';
          buttons[3].className = 'gallery-filter-buttons';
        } else if(postCriteria === PostFilters.mirrored) {
          buttons[0].className = 'gallery-filter-buttons';
          buttons[1].className = 'gallery-filter-buttons';
          buttons[2].className = 'gallery-filter-buttons';
          buttons[3].className += ' selected';
        }
      }
  },[loading, postCriteria])



  return (
    <div className='gallery'>
    {
      loading? 
      <h2 style={{color: '#fff', fontWeight:300,height:'100vh'}}>Getting galery</h2>
      :
      <>
        <h1 className='gallery-title'>Novusmundi has shared beautiful artworks!</h1>
        <div className='gallery-filter'>
          <button onClick={() => setPostCriteria(PostFilters.latest)} className='gallery-filter-buttons'>Latest</button>
          <button onClick={() => setPostCriteria(PostFilters.commented)} className='gallery-filter-buttons'>Most commented</button>
          <button onClick={() => setPostCriteria(PostFilters.collected)} className='gallery-filter-buttons'>Most collected</button>
          <button onClick={() => setPostCriteria(PostFilters.mirrored)} className='gallery-filter-buttons'>Most mirrored</button>
        </div>
        <div className='gallery-imgs'>
          {
            posts.length > 0 &&
            posts.map(post => (
              <CardGallery
                key={ post.id }
                id= { post.id }
                src={ post.metadata.media[0].original.url }
                creator= { post.profile.handle }
                createdDate={ post.createdAt }
                mirrors={ post.stats.totalAmountOfMirrors }
                collects={ post.stats.totalAmountOfCollects }
                comments={ post.stats.totalAmountOfComments }
              />
            ))
          }
        </div>
      </>
      }
    </div>
  )
}
