"use client"
import { motion } from "framer-motion";
import styles from '@/styles/Main.module.scss'
import Image from "next/image";
import Link from "next/link";
import heartActive from "@/assets/icons/heart-active.svg";
import commentsIcon from "@/assets/icons/comments.svg";
import { deleteStack } from "@/lib/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import deleteIcon from '@/assets/icons/delete.svg'
import { toast } from "react-toastify";



const MyStacksCard = ({ image, id, title, website, status, likes, comments, index }: { image: any, id: string, status: boolean, title: string, website: any, index: number, likes: number, comments: number }) => {

   const [modalIsOpen, setIsOpen] = useState(false);
   const router = useRouter();

   function openModal() {
      setIsOpen(true);
   }


   function closeModal() {
      setIsOpen(false);
   }
   const handleDelete = async () => {
      if (!id) return null;
      const deleteProduct = await deleteStack(id)
      router.push("/my-stacks")
      setIsOpen(false);
      toast.success("You successfully deleted your stack.")

   }
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: index * .2, ease: "easeInOut" }}
      >
         {modalIsOpen && (
            <div className={styles.myStacks_modal}>
               <div className={styles.myStacks_modal_block}>
                  <h2>Do you want to delete this post?</h2>
                  <p>If you delete this stack. Your comments and likes on the stack are going to be deleted</p>
                  <div className={styles.myStacks_modal_buttons}>
                     <button onClick={closeModal} className={styles.myStacks_modal_cancel}>
                        Cancel
                     </button>
                     <button onClick={handleDelete} className={styles.myStacks_modal_sure}>
                        Yes, I am sure
                     </button>
                  </div>

               </div>
            </div>
         )}

         <div className={styles.myStacks_card}>
            <div className={status ? styles.myStacks_card_status_published : styles.myStacks_card_status_moderation}>
               <span>{status ? 'Published' : "In moderation"}</span>
            </div>
            <div className={styles.myStacks_card_avatar}>
               <Image src={image} width={30} height={30} alt="stackCard image" />
               <Link href={`/stack/${id}`}>
                  <h2>{title}</h2>
                  <span>{website}</span>
               </Link>
            </div>
            <div className={styles.myStacks_card_buttom}>
               <Link href={`/stack/${id}`} className={styles.myStacks_card_action}>
                  <Image src={heartActive} width={24} height={24} alt="icon" />
                  <span>{likes}</span>
               </Link>
               <Link href={`/stack/${id}`} className={styles.myStacks_card_action}>
                  <Image src={commentsIcon} width={24} height={24} alt="icon" />
                  <span>{comments}</span>
               </Link>
               <button onClick={openModal} className={styles.myStacks_card_actionDelete}>
                  <Image src={deleteIcon} width={24} height={24} alt="icon" />
               </button>

            </div>
         </div>

      </motion.div>
   )
}
export default MyStacksCard