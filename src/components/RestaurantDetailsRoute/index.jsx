/* eslint-disable react-hooks/set-state-in-effect */
import {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsPlus} from 'react-icons/bs'
import {FaRupeeSign, FaStar} from 'react-icons/fa'
import {HiOutlineMinusSm} from 'react-icons/hi'

import HeaderComponent from '../HeaderComponent'
import Footer from '../Footer'
import Loader from '../Loader'
import {addCartItem, decrementCartItem, getCartData} from '../../utils/cartUtils'

import './index.css'

const getFormattedFoodItem = foodItem => ({
  id: foodItem.id,
  name: foodItem.name,
  cost: foodItem.cost,
  foodType: foodItem.food_type,
  imageUrl: foodItem.image_url,
  rating: foodItem.rating,
})

const getFormattedRestaurantDetails = details => ({
  id: details.id,
  name: details.name,
  cuisine: details.cuisine,
  costForTwo: details.cost_for_two,
  imageUrl: details.image_url,
  location: details.location,
  rating: details.rating,
  reviewsCount: details.reviews_count,
  foodItems: (details.food_items || []).map(getFormattedFoodItem),
})

const RestaurantDetailsRoute = () => {
  const {id} = useParams()
  const [restaurantDetails, setRestaurantDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)
  const [cartItems, setCartItems] = useState(getCartData())

  const getRestaurantDetails = useCallback(async () => {
    setIsLoading(true)
    setIsFailure(false)

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(
        `https://apis.ccbp.in/restaurants-list/${id}`,
        options,
      )
      const data = await response.json()
      const details = data.restaurant_details || data

      if (response.ok) {
        setRestaurantDetails(getFormattedRestaurantDetails(details))
      } else {
        setIsFailure(true)
      }
    } catch {
      setIsFailure(true)
    }

    setIsLoading(false)
  }, [id])

  useEffect(() => {
    getRestaurantDetails()
  }, [getRestaurantDetails])

  const getItemQuantity = itemId => {
    const cartItem = cartItems.find(eachItem => eachItem.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  const onIncrementItem = foodItem => {
    const item = {
      cost: Number(foodItem.cost),
      id: foodItem.id,
      imageUrl: foodItem.imageUrl,
      name: foodItem.name,
    }
    setCartItems(addCartItem(item))
  }

  const onDecrementItem = foodItemId => {
    setCartItems(decrementCartItem(foodItemId))
  }

  const renderCounter = foodItem => {
    const quantity = getItemQuantity(foodItem.id)

    if (quantity === 0) {
      return (
        <button
          type="button"
          className="add-food-btn"
          onClick={() => onIncrementItem(foodItem)}
        >
          ADD
        </button>
      )
    }

    return (
      <div className="quantity-control">
        <button
          type="button"
          className="quantity-btn"
          testid="decrement-count"
          data-testid="decrement-count"
          onClick={() => onDecrementItem(foodItem.id)}
        >
          <HiOutlineMinusSm />
        </button>
        <p
          className="quantity-count"
          testid="active-count"
          data-testid="active-count"
        >
          {quantity}
        </p>
        <button
          type="button"
          className="quantity-btn"
          testid="increment-count"
          data-testid="increment-count"
          onClick={() => onIncrementItem(foodItem)}
        >
          <BsPlus />
        </button>
      </div>
    )
  }

  const renderRestaurantDetails = () => (
    <>
      <section className="restaurant-banner">
        <img
          src={restaurantDetails.imageUrl}
          alt="restaurant"
          className="details-restaurant-image"
        />
        <div className="restaurant-banner-content">
          <h1 className="details-restaurant-name">{restaurantDetails.name}</h1>
          <p className="details-cuisine">{restaurantDetails.cuisine}</p>
          <p className="details-location">{restaurantDetails.location}</p>
          <div className="restaurant-meta-row">
            <div className="meta-block">
              <div className="meta-heading">
                <FaStar className="details-star" />
                <p>{restaurantDetails.rating}</p>
              </div>
              <p className="meta-caption">
                {restaurantDetails.reviewsCount}+ Ratings
              </p>
            </div>
            <div className="meta-separator" />
            <div className="meta-block">
              <div className="meta-heading">
                <FaRupeeSign />
                <p>{restaurantDetails.costForTwo}</p>
              </div>
              <p className="meta-caption">Cost for two</p>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-heading-section">
        <h1 className="menu-heading">Menu</h1>
        <p className="menu-description">Choose an item and tap ADD to place it in your cart.</p>
      </section>

      <ul className="food-items-list">
        {restaurantDetails.foodItems.map(foodItem => (
          <li
            key={foodItem.id}
            className="food-item-card"
            testid="foodItem"
            data-testid="foodItem"
          >
            <img src={foodItem.imageUrl} alt={foodItem.name} className="food-image" />
            <div className="food-details">
              <h1 className="food-name">{foodItem.name}</h1>
              <p className="food-cost">
                <FaRupeeSign /> {foodItem.cost}
              </p>
              <div className="food-rating-row">
                <FaStar className="star-icon" />
                <p>{foodItem.rating}</p>
              </div>
              {renderCounter(foodItem)}
            </div>
          </li>
        ))}
      </ul>
    </>
  )

  const renderContent = () => {
    if (isLoading) {
      return <Loader testId="restaurant-details-loader" />
    }

    if (isFailure) {
      return (
        <div className="details-failure-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="failure-image"
          />
          <p>Something went wrong. Please try again</p>
          <button type="button" onClick={getRestaurantDetails}>
            Try Again
          </button>
        </div>
      )
    }

    return renderRestaurantDetails()
  }

  return (
    <div className="page-shell">
      <HeaderComponent />
      <main className="restaurant-details-main">{renderContent()}</main>
      <Footer />
    </div>
  )
}

export default RestaurantDetailsRoute
