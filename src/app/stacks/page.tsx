import React from 'react'
import styles from '@/styles/Stacks.module.scss'
import StacksFilter from '@/components/StacksFilter'
import StackCard from '@/components/StackCard'


const Stacks = async () => {
 
  return (
      <div className={styles.stacks}>
       <div className="container">
         <div className={styles.stacks_block}>
            <div className={styles.stacks_card_block}>
            <StackCard/>
            <StackCard/>
            <StackCard/>
            </div>
            <div>

           <StacksFilter/>
            </div>

         </div>
      </div>
    </div>
  )
}

export default Stacks
