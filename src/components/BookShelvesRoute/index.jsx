import {useEffect, useState} from 'react'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import {ClipLoader} from 'react-spinners'

import HeaderComponent from '../HeaderComponent'

import Footer from '../Footer'

import './index.css'

const bookshelvesList = [
  {
    id: '1',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '2',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '3',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '4',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const BookShelvesRoute = () => {
  const [activeShelf, setActiveShelf] = useState('ALL')

  const [booksList, setBooksList] = useState([])

  const [searchInput, setSearchInput] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const [isFailure, setIsFailure] = useState(false)

  useEffect(() => {
    getBooks()
  }, [activeShelf])

  const getBooks = async () => {
    setIsLoading(true)

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeShelf}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)

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

  const getHeading = () => {
    switch (activeShelf) {
      case 'READ':
        return 'Read Books'

      case 'CURRENTLY_READING':
        return 'Currently Reading Books'

      case 'WANT_TO_READ':
        return 'Want to Read Books'

      default:
        return 'All Books'
    }
  }

  const renderLoader = () => (
    <div data-testid="loader">
      <ClipLoader />
    </div>
  )

  if (isFailure) {
    return (
      <div>
        <HeaderComponent />

        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />

          <p>Something went wrong. Please try again</p>

          <button type="button" onClick={getBooks}>
            Try Again
          </button>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div>
      <HeaderComponent />

      <h1>Bookshelves</h1>

      <ul>
        {bookshelvesList.map(eachItem => (
          <li key={eachItem.id}>
            <button
              type="button"
              className={
                activeShelf === eachItem.value
                  ? 'shelf-btn active-btn'
                  : 'shelf-btn'
              }
              onClick={() => setActiveShelf(eachItem.value)}
            >
              {eachItem.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="search-container">
        <input
          type="search"
          aria-label="search"
          placeholder="Search"
          value={searchInput}
          onChange={event => setSearchInput(event.target.value)}
        />

        <button type="button" data-testid="searchButton" onClick={getBooks}>
          Search
        </button>
      </div>

      {isLoading ? (
        renderLoader()
      ) : (
        <>
          <h1>{getHeading()}</h1>

          {booksList.length === 0 ? (
            <div className="no-books-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-books-img.png"
                alt="no books"
              />

              <p>Your search for {searchInput} did not find any matches.</p>
            </div>
          ) : (
            <ul className="books-container">
              {booksList.map(eachBook => (
                <li key={eachBook.id}>
                  <Link to={`/books/${eachBook.id}`}>
                    <img src={eachBook.cover_pic} alt={eachBook.title} />

                    <h1>{eachBook.title}</h1>

                    <p>{eachBook.author_name}</p>

                    <p>Avg Rating {eachBook.rating}</p>

                    <p>Status: {eachBook.read_status}</p>

                    <p>{eachBook.read_status}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <Footer />
    </div>
  )
}

export default BookShelvesRoute
