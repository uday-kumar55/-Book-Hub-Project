import {useEffect, useState} from 'react'

import {useParams} from 'react-router-dom'

import Cookies from 'js-cookie'

import {ClipLoader} from 'react-spinners'

import HeaderComponent from '../HeaderComponent'
import Footer from '../Footer'

import './index.css'

const BookItemDetails = () => {
  const {id} = useParams()

  const [bookDetails, setBookDetails] = useState({})

  const [isLoading, setIsLoading] = useState(true)

  const [isFailure, setIsFailure] = useState(false)

  useEffect(() => {
    getBookDetails()
  }, [])

  const getBookDetails = async () => {
    setIsLoading(true)

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      setBookDetails(data.book_details)

      setIsFailure(false)
    } else {
      setIsFailure(true)
    }

    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div data-testid="loader">
        <ClipLoader />
      </div>
    )
  }

  if (isFailure) {
    return (
      <div>
        <HeaderComponent />

        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />

        <p>Something went wrong. Please try again</p>

        <button type="button" onClick={getBookDetails}>
          Try Again
        </button>

        <Footer />
      </div>
    )
  }

  return (
    <div>
      <HeaderComponent />

      <div>
        <img src={bookDetails.cover_pic} alt={bookDetails.title} />

        <h1>{bookDetails.title}</h1>

        <p>{bookDetails.author_name}</p>

        <p>Avg Rating {bookDetails.rating}</p>

        <p>Status: {bookDetails.read_status}</p>

        <h1>About Author</h1>

        <p>{bookDetails.about_author}</p>

        <h1>About Book</h1>

        <p>{bookDetails.about_book}</p>
      </div>

      <Footer />
    </div>
  )
}

export default BookItemDetails
