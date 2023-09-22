import React from 'react';
import 'bulma/css/bulma.min.css';

export default function HomeContent() {
  return (
    <section className="container">
        <div className="columns features">
            <div className="column is-4">
                <div className="card is-shady">
                    <div className="card-image has-text-centered">
                        <i className="fa fa-paw"></i>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            <h4>Energy conservation</h4>
                            <p>At Voltwise Motors, our unwavering dedication to energy efficiency and sustainability is revolutionizing industry norms. Join us as we lead the way towards a brighter, greener future for all.</p>
                            <p><a href="/">Learn more</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
                <div className="card is-shady">
                     <div className="card-image has-text-centered">
                        <i className="fa fa-empire"></i>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            <h4>Water conservation</h4>
                            <p>We recognize water's significance at Voltwise Motors. We implement water-saving practices in manufacturing and facilities. Choose Voltwise for energy efficiency and responsible water use.</p>
                            <p><a href="/">Learn more</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
                <div className="card is-shady">
                    <div className="card-image has-text-centered">
                        <i className="fa fa-apple"></i>
                    </div>
                     <div className="card-content">
                        <div className="content">
                            <h4>Solar energy</h4>
                            <p>Harnessing solar power is central to our mission at Voltwise Motors. We integrate solar tech into vehicles and facilities to reduce our carbon footprint. Drive with us toward a solar-powered future.</p>
                            <p><a href="/">Learn more</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
