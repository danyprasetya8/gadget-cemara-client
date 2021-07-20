import { ellipsis, numberFormatter } from '@/utils/formatter'
import React, { Component } from 'react'
import ReactStars from 'react-rating-stars-component'
import male from '@/assets/images/svg/male.svg'
import female from '@/assets/images/svg/female.svg'
import dummy from '@/assets/images/dummy.png'

import './trusted-review.scss'

class TrustedReview extends Component {
  render() {
    return (
      <section className="trusted-review">
        <section className="trusted-review__user">
          <img src={male} />
          <div className="trusted-review__user-info">
            <div className="trusted-review__user-info--name">
              User 001
            </div>
            <div className="trusted-review__user-info--time">
              10 hours ago
            </div>
          </div>
        </section>

        <section className="trusted-review__product">
          <img
            src={dummy}
            className="trusted-review__product-image"
          />

          <div className="trusted-review__product-info">
            <div className="trusted-review__product-info--name">
              <strong>{ellipsis('Product Item 01 very very long', 40)}</strong>
            </div>
            <div className="trusted-review__product-info--rating">
              <ReactStars
                count={5}
                value={5}
                size={14}
                isHalf
                edit={false}
                activeColor="#ffd700"
              />
              <div>(190)</div>
            </div>
            <div className="trusted-review__product-info--price">
              <strong>{numberFormatter(6000000, 'Rp')}</strong>
            </div>
          </div>
        </section>

        <section className="trusted-review__my-rating">
          <ReactStars
            count={5}
            value={5}
            size={20}
            isHalf
            edit={false}
            activeColor="#ffd700"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ducimus ut mollitia sit. A assumenda voluptates nulla facere, commodi porro?
          </p>
        </section>
      </section>
    )
  }
}

export default TrustedReview
