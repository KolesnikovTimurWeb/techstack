'use client';

import { makeComment, putLike } from '@/lib/actions';
import { useEffect, useState } from 'react';
import styles from '@/styles/Main.module.scss';
import Image from 'next/image';
import avatar from '@/assets/icons/avatar.svg';
import heart from '@/assets/icons/heart.svg';
import heartRed from '@/assets/icons/heart-active.svg';
import Heart from './ui/Heart';
import { toast } from 'react-toastify';
import prisma from '@/lib/prisma';

const ActionStack = ({
  stackId,
  likes,
  coments,
  username,
  likeBoolean,
  userId,
  userImage,
}: {
  userId: string,
  username: any,
  stackId: any;
  likes: any;
  coments: any;
  likeBoolean: true | false,
  userImage: any
}) => {
  const [like, setLike] = useState<number>(likes || 0);
  const [liked, setLiked] = useState(likeBoolean);
  const [commentText, setCommentText] = useState('');
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleCommentChange = (event: any) => {
    setCommentText(event.target.value);
  };
  const id = stackId;


  const handleLike = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    try {
      if (!userId) {
        return toast.error("You should be registered")
      }
      if (liked === false) {
        setLike(prev => prev + 1)
      } else {
        setLike(prev => prev - 1)

      }
      setLiked(!liked);
      await putLike(id);
    } catch (error) {
      console.error('Error upvoting product:', error);
    }
  };

  const hadnleAddComment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    try {
      if (!userId) {
        return toast.error("You should be registered")
      }
      if (commentText.length < 5) return toast.error("Text of comments should be longer")

      setLoading(true)
      await makeComment(id, commentText);
      //@ts-ignore
      setComment([...comment, commentText])
      setLoading(false)
      setCommentText('')
      toast.success("Your comment is created")
    } catch (error) {
      console.error('Error upvoting product:', error);
    }
  };
  return (
    <div className={styles.actionstack}>
      <div className={styles.actionstack_like}>
        <button onClick={handleLike}><Heart click={liked} /></button>
        <p>{like}</p>
      </div>
      <h2>Comments</h2>
      <div className={styles.actionstack_commentInput}>
        <input
          type="text"
          placeholder="Write your comment here"
          value={commentText}
          onChange={handleCommentChange}
        />
        <button onClick={hadnleAddComment} disabled={loading}>Submit</button>
      </div>

      <div>
        {comment.map((item: any) => (
          <div className={styles.actionstack_comment} key={item.id}>
            <Image src={userImage || avatar} width={24} height={24} alt='avatar' />
            <div className={styles.actionstack_comment_avatar}>
              <h2>{username}</h2>
              <p>{item}</p>
            </div>
          </div>
        ))}
        {coments.map((item: any) => (
          <div className={styles.actionstack_comment} key={item.id}>
            <Image src={item.profilePicture || avatar} width={24} height={24} alt='avatar' />
            <div className={styles.actionstack_comment_avatar}>
              <h2>{item?.username}</h2>
              <p>{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionStack;
