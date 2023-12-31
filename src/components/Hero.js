import React from 'react';

export default function Hero() {
  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <img src={process.env.PUBLIC_URL + "/energy.jpg"} alt="conserve energy" />
        </div>
      </div>
    </section>
  )
}
