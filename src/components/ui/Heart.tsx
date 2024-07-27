"use client"
import React, { useState } from 'react'
import '@/styles/Ui.scss'
const Heart = ({ click }: { click: boolean }) => {
   return (
      <div className={click ? "HeartAnimation animate" : "HeartAnimation"}>
      </div>
   )
}

export default Heart 
