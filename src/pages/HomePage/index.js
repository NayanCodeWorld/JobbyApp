import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

import './index.css'

const HomePage = () => (
  <>
    <Navbar />
    <div className="home-container">
      <div className="home-text-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job thar fits your abilities and potential.
        </p>

        <Link to="/jobs">
          <button className="home-findJob-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default HomePage
