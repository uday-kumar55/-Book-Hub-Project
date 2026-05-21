import {useEffect, useState} from 'react'

import Cookies from 'js-cookie'

import {ClipLoader} from 'react-spinners'

import {Link} from 'react-router-dom'

import './index.css'

import HeaderComponent from '../HeaderComponent'

import TopRatedBookItem from '../TopRatedBookItem'

import Footer from '../Footer'

const HomeRoute = () => {
  const [booksList, setBooksList] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [isFailure, setIsFailure] = useState(false)

  useEffect(() => {
    getTopBooks()
  }, [])

  const getTopBooks = async () => {
    setIsLoading(true)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(
        'https://apis.ccbp.in/book-hub/top-rated-books',
        options,
      )

      const data = await response.json()

      if (response.ok === true) {
        setBooksList(data.books)

        setIsFailure(false)
      } else {
        setIsFailure(true)
      }
    } catch (error) {
      setIsFailure(true)
    }

    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div data-testid="loader" className="loader-container">
        <ClipLoader />
      </div>
    )
  }

  if (isFailure) {
    return (
      <div>
        <HeaderComponent />

        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />

          <p>Something went wrong. Please try again</p>

          <button
            type="button"
            onClick={getTopBooks}
          >
            Try Again
          </button>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="home-container">
      <HeaderComponent />

      <div className="home-content">
        <h1>Find Your Next Favorite Books?</h1>

        <p>
          You are in the right place. Tell us what titles or
          genres you have enjoyed in the past, and we will
          give you surprisingly insightful recommendations.
        </p>

        <Link to="/bookshelves">
          <button
            type="button"
            className="find-books-btn"
          >
            Find Books
          </button>
        </Link>
      </div>

      <div className="top-books-section">
        <h1 className="heading">
          Top Rated Books
        </h1>

        <div className="top-books-container">
          {booksList.map(eachBook => (
            <div
              key={eachBook.id}
              className="top-book-card"
            >
              <TopRatedBookItem
                bookDetails={eachBook}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomeRoute