import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import TheHeader from '@/components/TheHeader/TheHeader'
import HeaderObserver from '@/components/HeaderObserver/HeaderObserver'
import BottomNavigation from '@/components/BottomNavigation/BottomNavigation'
import ProductCard from '@/components/ProductCard/ProductCard'
import TrustedReview from '@/components/TrustedReview/TrustedReview'
import messageBuble from '@/assets/images/svg/message-buble.svg'
import dummy from '@/assets/images/dummy.png'

import './dashboard.scss'
class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <HeaderObserver>
        {
          shouldHeaderSticking => (
            <div className="dashboard">
              <TheHeader shouldSticking={shouldHeaderSticking} />
              <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={85}
                totalSlides={3}
                className="carousel-container"
              >
                <Slider>
                  <Slide index={0}>
                    <img src={dummy} className="dummy" />
                  </Slide>
                  <Slide index={1}>
                    <img src={dummy} className="dummy" />
                  </Slide>
                  <Slide index={2}>
                    <img src={dummy} className="dummy" />
                  </Slide>
                </Slider>
              </CarouselProvider>

              <section className="product-list-container">
                <h1>Recommendation</h1>
                <div className="product-list">
                  <div className="product-list__wrapper">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                  </div>
                </div>
              </section>

              <section className="best-seller-container">
                <h1>Best Seller</h1>
                <div className="best-seller">
                  <div className="best-seller__wrapper">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                  </div>
                </div>
              </section>

              <section className="trusted-reviews-container">
                <h1>Trusted Review</h1>
                <div className="trusted-reviews">
                  <div className="trusted-reviews__wrapper">
                    <TrustedReview />
                    <TrustedReview />
                    <TrustedReview />
                  </div>
                </div>
              </section>

              <img
                src={messageBuble}
                className="message-buble"
              />
              <BottomNavigation />
            </div>
          )
        }
      </HeaderObserver>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Dashboard)