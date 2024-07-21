import React from 'react'
import styles from '@/styles/Stacks.module.scss'
import Button from './ui/Button'

const StacksFilter = () => {
  return (
    <form className={styles.stacks_form}>
      <div className={styles.stacks_form_input}>
         <label htmlFor="req">Type your Request</label>
         <input name='req' id='req' type='text'/>
      </div>
      <div className={styles.stacks_form_input}>
         <label htmlFor="req">Type your Request</label>
         <input name='req' id='req' type='text'/>
      </div>
      <div className={styles.stacks_form_input}>
         <label htmlFor="req">Type your Request</label>
         <input name='req' id='req' type='text'/>
      </div>

      <Button size='sm' color='white'>Apply filters</Button>
    </form>
  )
}

export default StacksFilter
