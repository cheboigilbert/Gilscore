
import React, {useState}  from 'react'

import {ActionBtn} from './buttons2'

import {
  UserDisplay,
  UserPicture2,
  UserPicture
} from '../profiles'

export function ParentComment(props){
    const {comment} = props
    return comment.parent ? <Comment isRetweet retweeter={props.retweeter} hideActions className={' '} comment={comment.parent} /> : null
  }
  export function Comment(props) {
      const {comment, didRetweet, hideActions, isRetweet, retweeter} = props
      const [actionComment, setActionComment] = useState(props.comment ? props.comment : null)
      let className = props.className ? props.className : 'col-10 mx-auto col-md-6'
      className = isRetweet === true ? `${className} p-2 border rounded` : className
      const path = window.location.pathname
      const match = path.match(/(?<commentid>\d+)/)
      const urlCommentId = match ? match.groups.commentid : -1
      const isDetail = `${comment.id}` === `${urlCommentId}`
      
      const handleLink = (event) => {
        event.preventDefault()
        window.location.href = `/${comment.id}`
      }
      const handlePerformAction = (newActionComment, status) => {
        if (status === 200){
          setActionComment(newActionComment)
        } else if (status === 201) {
          if (didRetweet){
            didRetweet(newActionComment)
          }
        }
        
      }
      
      return <div className={className}>
         {isRetweet === true && <div className='mb-2'>
          <span className='small text-muted'>Retweet via <UserDisplay user={retweeter} /></span>
        </div>}
        <div className='d-flex'>
       
          <div className=''>
            <UserPicture user={comment.user} />
          </div>
          <div className='col-11'> 
              <div>
             
                <p>
                  <UserDisplay includeFullName user={comment.user} />
                </p>
                 <div align = 'center'  className=''>


                  <p>

                   <UserPicture2 user={comment.user} />
                   </p>

                 </div>
                <p>{comment.content}</p>
               <img src = {comment.image} width="400" height="200" className="d-inline-block align-top" alt=""/>
               
                <ParentComment comment={comment} retweeter={comment.user} />

              </div>
          <div className='btn btn-group px-5'>
          {(actionComment && hideActions !== true) && <React.Fragment>
                 <div> <ActionBtn comment={actionComment} didPerformAction={handlePerformAction} action={{type: "like", display:"Likes"}}/></div>

                 <div> <ActionBtn comment={actionComment} didPerformAction={handlePerformAction} action={{type: "unlike", display:"comment"}}/></div>

                 <div> <ActionBtn comment={actionComment} didPerformAction={handlePerformAction} action={{type: "retweet", display:"Retweet"}}/></div>
                </React.Fragment>
          }
                  {isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>check</button>}
                </div>
                </div>
      </div>
      </div>
    }
  