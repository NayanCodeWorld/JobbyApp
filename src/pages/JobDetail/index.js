import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

import Navbar from '../Navbar'

const apiStatus = {
  initial_state: 'INITIAL',
  success_state: 'SUCCESS',
  failure_state: 'FAILURE',
  progress_state: 'PROGRESS',
}

class JobDetail extends Component {
  state = {
    jobDetail: {},
    similarJobDetails: {},
    status: apiStatus.initial_state,
  }

  componentDidMount() {
    this.getSpecificDetails()
  }

  getSpecificDetails = async () => {
    this.setState({status: apiStatus.progress_state})
    const {match, history} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)

    const jwt = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    // console.log(url)

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      //   const formattedJobData = {
      //     id: data.job_details.id,
      //     companyLogoUrl: data.job_details.company_logo_url,
      //     companyWebsiteUrl: data.job_details.company_website_url,
      //     employmentType: data.job_details.employment_type,
      //     jobDescription: data.job_details.job_description,
      //     location: data.job_details.location,
      //     packagePerAnnum: data.job_details.package_per_annum,
      //     rating: data.job_details.rating,
      //     title: data.job_details.title,
      //     skills: data.job_details.skills,
      //     lifeAtCompany: data.job_details.life_at_company,
      //   }
      //   const similarJobData = data.similar_jobs

      this.setState({
        jobDetail: data.job_details,
        similarJobDetails: data.similar_jobs,
        status: apiStatus.success_state,
      })
    } else {
      this.setState({status: apiStatus.failure_state})
      history.replace('/login')
    }
  }

  onSuccessJobDetail = () => {
    const {jobDetail, similarJobDetails} = this.state
    return (
      <>
        <div className="jobDetail-bg-container">
          <div className="jobDetail-header">
            <img
              className="jobDetail-logo"
              src={jobDetail.company_logo_url}
              alt="job details company logo"
            />
            <div className="jobDetail-header-text-container">
              <h1 className="jobDetail-job-name">{jobDetail.title}</h1>
              <div className="jobDetail-rating-container">
                <AiFillStar className="jobDetail-rating-img" />
                <p className="jobDetail-rating">{jobDetail.rating}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="jobDetail-mid-container">
              <div className="jobDetail-mid-inner-container">
                <div className="jobDetail-mid-inner-location-container">
                  <MdLocationOn className="jobDetail-location-icon" />
                  <p className="jobDetail-location">{jobDetail.location}</p>
                </div>
                <div className="jobDetail-mid-inner-jobType-container">
                  <BsFillBriefcaseFill className="jobDetail-jobType-icon" />
                  <p className="jobDetail-jobType">
                    {jobDetail.employment_type}
                  </p>
                </div>
              </div>
              <p className="jobDetail-package">{jobDetail.package_per_annum}</p>
            </div>
            <hr className="line" />
            <div>
              <h1 className="jobDetail-description-heading">Description</h1>
            </div>
            <p className="jobDetail-description">{jobDetail.job_description}</p>
          </div>
          <h1 className="skill-heading">Skills</h1>
          <ul className="skills-container">
            {jobDetail.skills.map(each => (
              <li key={each.image_url} className="skills">
                <img
                  className="skill-icon"
                  src={each.image_url}
                  alt={each.name}
                />
                <p className="skill-name">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="jobDetail-lifeAtCompany-heading">Life at Company</h1>
          <div className="jobDetail-lifeAtCompany-container">
            <p className="jobDetail-lifeAtCompany-description">
              {jobDetail.life_at_company.description}
            </p>
            <img
              className="jobDetail-lifeAtCompany-img"
              src={jobDetail.life_at_company.image_url}
              alt="life at company"
            />
          </div>
        </div>
        <div className="similarJobs-bg-container">
          <h1 className="similarJobs-heading">Similar Jobs</h1>
          <ul className="similarJobs-container">
            {similarJobDetails.map(each => (
              <li className="similar-job-list" key={each.id}>
                <div className="similar-job-item-header">
                  <img
                    className="similar-job"
                    src={each.company_logo_url}
                    alt="similar job company logo"
                  />
                  <div className="similar-job-header-text-container">
                    <h1 className="similar-job-name">{each.title}</h1>
                    <div className="similar-job-rating-container">
                      <AiFillStar className="similar-job-rating-img" />
                      <p className="similar-job-rating">{each.rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="similarJob-description-heading">Description</h1>
                <p className="similarJob-description">{each.job_description}</p>
                <div className="jobDetail-mid-inner-container">
                  <div className="jobDetail-mid-inner-location-container">
                    <MdLocationOn className="jobDetail-location-icon" />
                    <p className="jobDetail-location">{each.location}</p>
                  </div>
                  <div className="jobDetail-mid-inner-jobType-container">
                    <BsFillBriefcaseFill className="jobDetail-jobType-icon" />
                    <p className="jobDetail-jobType">{each.employment_type}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  onFailureJobDetail = () => (
    <div className="onFailureFetchJob-container">
      <img
        className="onFailureFetchJob-container-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="onFailureFetchJob-heading">Oops! Something Went Wrong</h1>
      <p className="onFailureFetchJob-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.getSpecificDetails}
        type="button"
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  onProgressJobSearch = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetail = () => {
    const {status} = this.state

    switch (status) {
      case 'SUCCESS':
        return this.onSuccessJobDetail()
      case 'FAILURE':
        return this.onFailureJobDetail()
      default:
        return this.onProgressJobSearch()
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="jobDetails-main-bg-container">
          {this.renderJobDetail()}
        </div>
      </>
    )
  }
}

export default JobDetail
