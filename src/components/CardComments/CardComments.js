import React,{ useState,useEffect } from 'react';

import './cardcomments.css'

export default function CardComments({ profile,creator,comment,gotouser }) {

  const [src,setSrc] = useState()
    //crear switch
    // if(profile.original) {
    //   console.log(profile.original.original.url);
    //   if(profile.original.url.startsWith('https://lens.infura-ipfs.io')) {
    //     //setSrc(profile.original.url);
    //     console.log(profile.original.url);
    //   } else {
    //     const endpoint = profile.original.url.substring(7);
    //     const url = `https://ipfs.io/ipfs/${endpoint}`
    //     console.log(url);
    //     //setSrc(url)
    //   }
    // } else if (profile) {
    //   console.log(profile.uri);
    // } else  {
    //   console.log('no hay url');
    // }

    useEffect(() => {
      if(!profile) {
        setSrc('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qMiLt9hHswAmJwvufOtozjbeXQovf-ojYQ&usqp=CAU');
      } else if (profile.original) {
        if(profile.original.url) {
          if(profile.original.url.startsWith('https://lens.infura-ipfs.io')) {
            setSrc(profile.original.url);
          } else {
            const endpoint = profile.original.url.substring(7);
            const url = `https://ipfs.io/ipfs/${endpoint}`
            setSrc(url)
          }
        }
      }
    }, [profile])  

  return (
    <div className='cardcomments'>
      <img className='cardcomments-image' src={ src? src : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9qMiLt9hHswAmJwvufOtozjbeXQovf-ojYQ&usqp=CAU' } alt={ creator }/>
      <div className='cardcomments-comment'>
          <h3 className='cardcomments-message-creator' onClick={() => gotouser(creator)}>@{ creator }</h3>
          <p className='cardcomments-message-content'>{ comment }</p>
        </div>
    </div>
  )
}
