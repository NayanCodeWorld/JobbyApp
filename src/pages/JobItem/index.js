import {Link} from 'react-router-dom'

import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const JobItem = props => {
  const {detail} = props
  //   console.log(detail)
  //   const {
  //     id,
  //     companyLogoUrl,
  //     employmentType,
  //     jobDescription,
  //     location,
  //     packagePerAnnum,
  //     rating,
  //     title,
  //   } = detail

  return (
    <Link to={`/jobs/${detail.id}`}>
      <li className="jobItem-bg-container">
        <div className="jobItem-header">
          <img
            className="jobItem-logo"
            src={detail.company_logo_url}
            alt="company logo"
          />
          <div className="jobItem-header-text-container">
            <h1 className="jobItem-job-name">{detail.title}</h1>
            <div className="jobItem-rating-container">
              <AiFillStar className="jobItem-rating-img" />
              <p className="jobItem-rating">{detail.rating}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="jobItem-mid-container">
            <div className="jobItem-mid-inner-container">
              <div className="jobItem-mid-inner-location-container">
                <MdLocationOn className="jobItem-location-icon" />
                <p className="jobItem-location">{detail.location}</p>
              </div>
              <div className="jobItem-mid-inner-jobType-container">
                <BsFillBriefcaseFill className="jobItem-jobType-icon" />
                <p className="jobItem-jobType">{detail.employment_type}</p>
              </div>
            </div>
            <p className="jobItem-package">{detail.package_per_annum}</p>
          </div>
          <hr className="line" />
          <h1 className="jobItem-description-heading">Description</h1>
          <p className="jobItem-description">{detail.job_description}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
