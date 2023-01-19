import React from 'react';
import { useNavigate } from 'react-router'

import { Save,ArrowLeftRight,ChatDots } from 'react-bootstrap-icons'
import './cardgallery.css'

export default function CardGallery({ id,src,creator,createdDate,mirrors,collects,comments }) {

    const navigate = useNavigate()

    const newEndpoint = src.substring(7)
    const url = (`https://ipfs.io/ipfs/${newEndpoint}`);

    const date = createdDate.substring(0, createdDate.length - 14);

    function goToPost(id) {
        localStorage.setItem('idPost',id);
        navigate('/post')
    }

    return (
        <div className='cardGallery' onClick={() => goToPost(id)}>
            <figure>
                <img src={ url } alt={ src }/>
                <div className='cardGallery-hover'>
                    <h3 className='cardGallery-hover-title'>@{ creator }</h3>
                    <p className='cardGallery-hover-info'>Created at { date }</p>
                    <div className='cardGallery-hover-info-container'>
                        <Save className='cardGallery-hover-icon'/>
                        <p className='cardGallery-hover-info'>{ collects }</p>
                    </div>
                    <div className='cardGallery-hover-info-container'>
                        <ArrowLeftRight className='cardGallery-hover-icon'/>
                        <p className='cardGallery-hover-info'>{ mirrors }</p>
                    </div>
                    <div className='cardGallery-hover-info-container'>
                        <ChatDots className='cardGallery-hover-icon'/>
                        <p className='cardGallery-hover-info'>{ comments }</p>
                    </div>
                </div>
            </figure>
        </div>
    )
}
