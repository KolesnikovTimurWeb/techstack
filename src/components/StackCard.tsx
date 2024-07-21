import React from 'react'
import styles from '@/styles/Stacks.module.scss'
import Image from 'next/image'


interface StackCardProps{
   title:String,
}

const StackCard = () => {
  return (
    <div className={styles.stacks_card}>
      <div className={styles.stacks_card_text}>
          <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVs-3wFGo3YNa7pvF7s1gpGpEmsN5FLTUUUg&s'} alt='image' width={50} height={50}/>
         <div>
            <h2>Title of The project</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore incidunt voluptatem in consequuntur vitae ad beatae! Corporis alias omnis minima, temporibus totam ipsam maiores ducimus assumenda, unde adipisci repudiandae quas.</p>
         </div>
      </div>
      <div className={styles.stacks_card_actions}>
         <span>Stack</span>
            <p>likes</p>
            <p>Commetns</p>
            <p>Share</p>
      </div>
    </div>
  )
}


export default StackCard
