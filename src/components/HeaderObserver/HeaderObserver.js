import React, { Component } from 'react'

class HeaderObserver extends Component {
  constructor(props) {
    super(props)
    this.intersectionEl = null
    this.setIntersectionRef = el => {
      this.intersectionEl = el
    }

    this.state = {
      observer: null,
      shouldHeaderSticking: false
    }
  }

  componentDidMount() {
    this.initIntersectionObserver()
  }

  componentWillUnmount() {
    this.destroyIntersectionObserver()
  }

  initIntersectionObserver = () => {
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) {
        this.setState({ shouldHeaderSticking: true })
        return
      }
      this.setState({ shouldHeaderSticking: false  })
    }, { rootMargin: '25% 0px 0px 0px' })

    this.setState({ observer }, () => {
      this.state.observer.observe(this.intersectionEl)
    })
  }

  destroyIntersectionObserver = () => {
    this.state.observer.disconnect()
  }

  render() {
    return (
      <div>
        <div ref={this.setIntersectionRef} />
        {this.props.children(this.state.shouldHeaderSticking)}
      </div>
    )
  }
}

export default HeaderObserver
