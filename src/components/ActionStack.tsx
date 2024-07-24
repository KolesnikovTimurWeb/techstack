"use client"

import { makeComment, putLike } from "@/lib/actions"
import { useState } from "react"

const ActionStack = ({stackId,likes,coments}:{stackId:any,likes:any,coments:any}) => {
  const [like,setLike] = useState<number>(likes || 0)
  const [liked,setLiked] = useState(false)
  console.log(coments)
  const [commentText, setCommentText] = useState("");
  const handleCommentChange = (event: any) => {
    setCommentText(event.target.value);
  };
   const id = stackId
   const handleLike = async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.stopPropagation();
      try {
        setLiked(!liked)
        if(liked === false){
          setLike(prev => prev+1)
        }else{
          setLike(prev => prev-1)

        }
        await putLike(id);
      } catch (error) {
        console.error("Error upvoting product:", error);
      }
    }

    const hadnleAddComment = async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.stopPropagation();
      try {
        await makeComment(id,commentText);
      } catch (error) {
        console.error("Error upvoting product:", error);
      }
    }

  return (
    <div>
      <button onClick={handleLike}>LIKKKKKKE</button>
      {like}

      <h2>Comments</h2>
        <input type="text" placeholder="Text here" value={commentText} onChange={handleCommentChange}/>
        <button onClick={hadnleAddComment}>Submit</button>
        {coments.map((item:any) => (
        <div key={item.id}>
        {item.body}
      </div>
        )
     
        )}
    </div>
  )
}

export default ActionStack
