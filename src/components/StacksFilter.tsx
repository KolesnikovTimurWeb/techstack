"use client"
import React, { useState } from 'react'
import styles from '@/styles/Stacks.module.scss'
import Button from './ui/Button'
import Select from 'react-select'
import { stacksArray } from '../../stacks'
import "@/styles/Ui.scss"
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

const transformedArray = Object.entries(stacksArray).map(([key, value]) => ({
  value: key,
  label: key,
}));

const optionsSelect = [...transformedArray]
interface PageProps {
  req?: string;
  select?: string;
}

const StacksFilter = ({ req, select }: PageProps) => {
  const [inputValue, setInputValue] = useState(req)
  const [select2, setSelect2] = useState({})
  const router = useRouter()
  console.log(select)
  const [selectValueDefault, setSelectValueDefault] = useState(select?.split(',') || '')
  const transformedSelectArray = Object.entries(selectValueDefault).map(([key, value]) => ({
    value: value,
    label: value,
  }));
  const onSubmit = async (e: any) => {
    console.log("form")
    e.preventDefault()
    function getFields(input: any, field: string) {
      var output = [];
      for (var i = 0; i < input.length; ++i)
        output.push(input[i][field]);
      return output;
    }
    var result = getFields(select2, "value")
    const searchParamsUrl = new URLSearchParams({
      req: `${inputValue || ''}`,
      select: `${result}`,
      page: '1'
    });

    router.push(`/stacks?${searchParamsUrl.toString()}`)

  }
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.stacks_form_input}>
        <label htmlFor="req">Type your Request</label>
        <input value={inputValue || ''} onChange={(e) => setInputValue(e.target.value)} type='text' />
      </div>
      <div className={styles.stacks_form_input}>
        <label onClick={() => console.log(select2)} htmlFor="category">Choose your language</label>
        <Select className={styles.stacks_select} onChange={setSelect2} defaultValue={transformedSelectArray} options={optionsSelect} isMulti />
      </div>

      <Button size='sm' color='white'>Apply filters</Button>
    </form>
  )
}

export default StacksFilter
