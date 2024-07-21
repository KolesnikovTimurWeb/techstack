import React, { CSSProperties } from 'react';
import "@/styles/Button.scss"
import Link from 'next/link';

interface ButtonProps{
  children:React.ReactNode,
  link?:string,
  size?: "sm" | "default" | "lg", 
  color?: "black" | "white", 
}

const Button = ({children,link,  size = "default" , color ='black' }:ButtonProps) => {
  if(link) return(
    <Link href={link}>
    <button  className={`button ${color} ${size}`}>
     {children}
    </button>
    </Link>

  )
  return (
    <button  className={`button ${color} ${size}`}>
      {children}
    </button>
  );
};

export default Button;