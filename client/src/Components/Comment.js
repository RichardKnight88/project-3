import React, { useState  } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Button, Form, Segment, Grid, Image, Rating } from 'semantic-ui-react'
import { getTokenFromStorage } from './Authentification/auth'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { comment } from 'postcss'


const Comment = () => {

  const history = useHistory()

  // Handling user input
  const [commentData, setCommentData] = useState({
    text: '',
    rating: '',
    textHeader: '',
  })

  // Handling error
  const [errors, setErrors] = useState('')

  // Handling incoming data from comment section
  const handleCommentData = (event) => {
    console.log('NAME OF THE COMMENT >>', event.target.name)
    const getUserComment = { ...commentData, [event.target.name]: event.target.value }
    console.log('getUserComment >>>', getUserComment)
    const newError = { ...errors, [event.target.name]: '' }
    setCommentData(getUserComment)
    setErrors(newError)
  }

  // Submit data from comment to the backend
  const setComment = async event => {
    try {
      event.preventDefault()
      const token = window.localStorage.getItem('token')
      console.log('TOKEN >>>', token)
      await axios.post('/api/gods/zeus/comments', commentData, 
        {
          headers: {
            Authorization: `Bearer ${token}` },
        }
      ) 
  
      history.push('/home')
    } catch (err) {
      console.log(err)
      // setErrors(err.response.data.errors)
      window.alert('Something went wrong 😬')
    }
  }

  // const [rating, setRating] = useState(0)

  // function handleChangeOnRate(event, data, { rating }) {
  //   event.preventDefault()
  //   const getRatingNumber = { ...commentData, [data.name]: data.value }
  //   setRating(rating)
  // }

  const checkingRating = (event, data) => {
    const getRatingNumber = { ...commentData, [data.name]: data.rating }
    console.log('data >>>', data)
    // alert(data.rating)
    console.log('event.target.rating >>>', data.rating)
    const newError = { errors, [event.target.name]: '' }
    setCommentData(getRatingNumber)
    setErrors(newError)
    console.log('DATA.VALUE >>', data.value)
  }
  console.log('RATING NUMBER >>', commentData)
  console.log('TYPE OF RATING >>', typeof(commentData.rating))

  

  return (

    <>
      
      <div className='display-god-top-part-margin'>
        <Grid className='comment-top-part'>
          <Grid.Column className='info-page-width-two'>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Grid.Column>
        </Grid>
      
        <div className="comment-background">

          <Segment className='comment-box'>
      
            <div className="container-area-text">
              <h3 className='comment-heading'>Rate your recent experience</h3>


              <Form onSubmit={setComment}>

                {<Rating 
                  maxRating={5} 
                  
                  icon='star' 
                  size='massive'
                  name='rating' 
                  rating={commentData.rating}
                  onRate={checkingRating}
                />}
             

                <h3 className='comment-heading'>Tell us about your experience</h3>

                <p className='comment-parahraph'>Read our Guidelines for Reviewers</p>

                <div className='max-comment-form-width'>
                  <Form.TextArea
                    fluid 
                    className='form-field-height'
                    type="text"
                    placeholder='This is where you write your review. Explain what happened, and leave out offensive words. Keep your feedback honest, helpful, and constructive.' 
                    required 
                    name='text'
                    value={commentData.text}
                    onChange={handleCommentData}
                  />
                </div>

                <p className='comment-parahraph'>How to write a useful review</p>

                <h3 className='comment-heading'>Tell us about your experience</h3>
                
                <Form.Field>
                  <input
                    type="text" 
                    placeholder='Write the title of your review here?' 
                    required 
                    name='textHeader'
                    value={commentData.textHeader}
                    onChange={handleCommentData}
                  />
                </Form.Field>

                <Button className='comment-submit-button' type='submit'>Submit</Button>

              </Form>

            </div>
          </Segment>
        </div>
      </div>
    </>
  )
}

export default Comment