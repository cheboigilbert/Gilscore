import React from 'react'
import {apiCommentCreate} from './lookup'


export function CommentCreate(props){
  const textAreaRef = React.createRef()
  const fileInput = React.createRef();
  const handleSubmit = handleSubmit.bind();

  const {didComment} = props
    const handleBackendUpdate = (response, status) =>{
      if (status === 201){
        didComment(response)
      } else {
        console.log(response)
        alert("An error occured please try again")
      }
    }

    const handleSubmit = (event) => {
      event.preventDefault()
       alert(
      `Selected file - {fileInput.current.files[0].name}`
        );
      const newVal = textAreaRef.current.value 
      const SelectedFile = fileInput.current.files[0].name
      // backend api request
      apiCommentCreate(newVal, SelectedFile,  handleBackendUpdate)
      //textAreaRef.current.value = ''
    }
    return <div className={props.className}>
          <form onSubmit={handleSubmit}>
            <textarea ref={textAreaRef} required={true} className='form-control' name='comment'>

            </textarea>
            <label>
                  Upload file:
          <input type="file" ref={fileInput} />
        </label>
            <button type='submit' className='btn btn-primary my-3'>Comment</button>
        </form>
  </div>
}