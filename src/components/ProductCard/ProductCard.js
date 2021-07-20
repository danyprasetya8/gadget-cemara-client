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

        <div className="product-card__info">
          <div>{ellipsis('Product 1 very very long very very very long ', 40)}</div>

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
