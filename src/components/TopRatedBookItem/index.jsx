import {Link} from 'react-router-dom'

import './index.css'

const TopRatedBookItem = props => {
  const {bookDetails} = props

  return (
    <Link to={`/books/${bookDetails.id}`} className="top-book-link">
      <div>
        <img
          src={bookDetails.cover_pic}
          alt={bookDetails.title}
          className="top-book-image"
        />

        <h1 className="top-book-title">{bookDetails.title}</h1>

        <p className="top-book-author">{bookDetails.author_name}</p>
      </div>
    </Link>
  )
}

export default TopRatedBookItem