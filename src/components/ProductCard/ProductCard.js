import { ellipsis, numberFormatter } from '@/utils/formatter'
import React, { Component } from 'react'
import ReactStars from 'react-rating-stars-component'
import dummyProduct from '@/assets/images/dummy.png'

import './product-card.scss'

export class ProductCard extends Component {
  render() {
    return (
      <div className="product-card">
        <div className="product-card__image">
          <img src={dummyProduct} />
        </div>

        <div className="product-card__info p-12 font-comfortaa">
          <h3>{ellipsis('Product 1 very very long very very long ', 30)}</h3>

          <div className="product-card__discount">
            <div className="product-card__discount--label">
              <strong>55% OFF</strong>
            </div>
            <div className="product-card__discount--bf-price">
              <strong>{numberFormatter(6000000, 'Rp')}</strong>
            </div>
          </div>

          <div className="product-card__price">
            <strong>{numberFormatter(2000000, 'Rp')}</strong>
          </div>

          <div className="product-card__rating">
            <ReactStars
              count={5}
              value={4}
              size={20}
              isHalf
              edit={false}
              activeColor="#ffd700"
            />
            <span>(190)</span>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductCard
