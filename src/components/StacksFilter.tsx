"use client"
import React from 'react'
import styles from '@/styles/Stacks.module.scss'
import Button from './ui/Button'
import { redirect } from 'next/navigation'
import Select from 'react-select'
import { stacksArray } from '../../stacks'
import "@/styles/Ui.scss"

const transformedArray = Object.entries(stacksArray).map(([key, value]) => ({
  value: key,
  label: key,
}));

const options = [...transformedArray]

const StacksFilter = () => {

  const onSubmit = () => {
    const searchParams = new URLSearchParams({
      req: 'string',
      page: '1'
    });

    return `/stacks?${URLSearchParams.toString()}`;

  }
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.stacks_form_input}>
        <label htmlFor="req">Type your Request</label>
        <input name='req' id='req' type='text' />
      </div>
      <div className={styles.stacks_form_input}>
        <label htmlFor="category">Choose your language</label>
        <Select className={styles.stacks_select} name='select' options={options} isMulti />
      </div>

      <Button size='sm' color='white'>Apply filters</Button>
    </form>
  )
}

export default StacksFilter
