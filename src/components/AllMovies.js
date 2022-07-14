import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import styles from './AllMovies.module.css'

import Modal from 'react-modal';



import { AnimationOnScroll } from 'react-animation-on-scroll';
import "animate.css/animate.min.css";


Modal.setAppElement('#root');
function AllMovies() {
    const [allPostsData, setAllPosts] = useState(null);
    const [data, setData] = useState({});

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(item) {
      setData(item);
      setIsOpen(true);
    }
  
  
    function closeModal() {
      setIsOpen(false);
    }

    useEffect(()=>{
        sanityClient
          .fetch(
            ` *[_type == "movie"]{
                title,
                slug,
            overview,
            releaseDate,
            externalId,
            popularity,
            "posterImage": poster.asset->url
            }`
          )
          .then((data) => setAllPosts(data))
          .catch(console.error);
    },[])
  return (
    <div>

    Movie Data 
    <div className={styles["main"]}>
  <h1>All Movies</h1>
  <ul className={styles["cards"]}>
   
    {
        allPostsData && allPostsData.map((item, index)=> <AnimationOnScroll key={index}  className={styles["cards_item"]} animateIn="animate__fadeInLeftBig">
        
     <li>
        <div className={styles["card"]}>
          <div className={styles["card_image"]}><img src={item.posterImage}/></div>
          <div className={styles["card_content"]}>
            <h2 className={styles["card_title"]}>{item.title}</h2>
            <p className={styles["card_text"]}>{`${(item.overview[0].children[0].text).slice(0, 100)}...`}</p>
            <button className={`${styles["btn"]} ${styles["card_btn"]}` } onClick={()=>openModal(item)}>Read More</button>
          </div>
        </div>
      </li> </AnimationOnScroll>)
    }



  </ul>
</div>

<Modal
        isOpen={modalIsOpen }
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
    
      >
        <div className={styles['modal-data']}>
        {data.title &&
          <>        <img src={data.posterImage} alt={data.title}>
        </img>
        <div>
          <h3>{data.title}</h3>
        <p>
          {data.overview[0].children[0].text}
        </p>

        <p>

        <strong>Release Date:</strong>{data.releaseDate}
        </p>

        <p>

        <strong>Rating:</strong> 8/10
        </p>

        <button className={styles['action']}>Action</button>
        </div>
      
        </>
}
</div>


<button className={styles['close-button']} onClick={closeModal}><span>&times;</span></button> 
   
      </Modal>


    </div> )
}

export default AllMovies