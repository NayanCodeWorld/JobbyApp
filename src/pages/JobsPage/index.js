import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import './index.css'

import Navbar from '../Navbar'
import JobItem from '../JobItem'
import Filters from '../Filters'

const apiStatus = {
  initial_state: 'INITIAL',
  success_state: 'SUCCESS',
  failure_state: 'FAILURE',
  progress_state: 'PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsPage extends Component {
  state = {
    jobList: [],
    jobStatus: apiStatus.initial_state,
    profileDetails: {},
    profileStatus: apiStatus.initial_state,
    search: '',
    employmentTypeInput: [],
    salaryRangeInput: '',
    isJobListEmpty: false,
  }

  componentDidMount() {
    this.getProfile()
    this.fetchJobDetails()
  }

  getProfile = async () => {
    this.setState({profileStatus: apiStatus.progress_state})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const profile = await response.json()
    // console.log(response)
    if (response.ok === true) {
      this.setState({
        profileDetails: {...profile.profile_details},
        profileStatus: apiStatus.success_state,
      })
    } else {
      this.setState({
        profileStatus: apiStatus.failure_state,
      })
    }
  }

  fetchJobDetails = async () => {
    const {search, employmentTypeInput, salaryRangeInput} = this.state
    this.setState({jobStatus: apiStatus.progress_state})
    const jwtToken = Cookies.get('jwt_token')
    const tempEmploymentTypeInput = employmentTypeInput.join()
    console.log(tempEmploymentTypeInput)
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeInput}&minimum_package=${salaryRangeInput}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    // console.log(response)
    const jobsList = await response.json()
    // console.log(jobsList)
    // const formattedData = jobsList.jobs.map(each => ({
    //   companyLogoUrl: each.company_logo_url,
    //   employmentType: each.employment_type,
    //   id: each.id,
    //   jobDescription: each.job_description,
    //   location: each.location,
    //   packagePerAnnum: each.package_per_annum,
    //   rating: each.rating,
    //   title: each.title,
    // }))
    // console.log(jobsList)
    if (response.ok === true) {
      if (jobsList.total === 0) {
        this.setState({
          jobList: jobsList,
          jobStatus: apiStatus.success_state,
          isJobListEmpty: true,
        })
      } else {
        this.setState({
          jobList: jobsList,
          jobStatus: apiStatus.success_state,
          isJobListEmpty: false,
        })
      }
    } else {
      this.setState({
        jobStatus: apiStatus.failure_state,
      })
    }
  }

  onSuccessFetchProfile = () => {
    const {profileDetails} = this.state
    return (
      <div className="profile-card">
        <img
          className="profile-img"
          src={profileDetails.profile_image_url}
          alt="profile"
        />
        <h1 className="user-name">{profileDetails.name}</h1>
        <p className="user-bio">{profileDetails.short_bio}</p>
      </div>
    )
  }

  onClickProfileRetryBtn = () => this.getProfile()

  onFailureFetchProfile = () => (
    <div className="failure-profile-card">
      <button
        onClick={this.onClickProfileRetryBtn}
        type="button"
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  onProgressFetchingProfile = () => (
    <div className="loader-container failure-profile-card" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({search: event.target.value})
  }

  onClickSearchButton = () => this.fetchJobDetails()

  renderNoJobFound = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-icon"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  onSuccessFetchJob = () => {
    const {jobList, isJobListEmpty, searchInput} = this.state
    return (
      <div className="job-container">
        <div className="lg-search-container">
          <input
            value={searchInput}
            onChange={this.onChangeSearchInput}
            className="lg-searchInput"
            type="search"
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-icon-container"
            onClick={this.onClickSearchButton}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {isJobListEmpty ? (
          this.renderNoJobFound()
        ) : (
          <ul className="jobs-ul-container">
            {jobList.jobs.map(eachJob => (
              <JobItem key={eachJob.id} detail={eachJob} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  onFailureFetchJob = () => (
    <div className="onFailureFetchJob-container">
      <img
        className="onFailureFetchJob-container-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="onFailureFetchJob-heading">Oops! Something Went Wrong</h1>
      <p className="onFailureFetchJob-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.fetchJobDetails}
      >
        Retry
      </button>
    </div>
  )

  onProgressFetchingJob = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case 'SUCCESS':
        return this.onSuccessFetchProfile()
      case 'FAILURE':
        return this.onFailureFetchProfile()
      default:
        return this.onProgressFetchingProfile()
    }
  }

  renderJobs = () => {
    const {jobStatus} = this.state

    switch (jobStatus) {
      case 'SUCCESS':
        return this.onSuccessFetchJob()
      case 'FAILURE':
        return this.onFailureFetchJob()
      default:
        return this.onProgressFetchingJob()
    }
  }

  onAddEmploymentTypeInput = value => {
    const {employmentTypeInput} = this.state
    const newArr = [...employmentTypeInput, value]
    this.setState({employmentTypeInput: newArr}, this.fetchJobDetails)
    // console.log(newArr.join())
  }

  onRemoveEmploymentTypeInput = value => {
    const {employmentTypeInput} = this.state
    const newArr = employmentTypeInput.filter(each => each !== value)
    this.setState({employmentTypeInput: newArr}, this.fetchJobDetails)
  }

  onChangeSalaryRangeInput = value => {
    console.log(value)
    this.setState({salaryRangeInput: value}, this.fetchJobDetails)
  }

  render() {
    const {search, employmentTypeInput, salaryRangeInput} = this.state
    // console.log(jobList)
    return (
      <>
        <Navbar />
        <div className="job-bg-container">
          <div className="mai-container">
            <div className="profile-container">
              <div className="sm-search-container">
                <input
                  value={search}
                  className="sm-searchInput"
                  type="search"
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-icon-container"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderProfile()}
              <hr className="line" />
              <div className="filter-container">
                <Filters
                  salaryRangeInput={salaryRangeInput}
                  employmentTypeInput={employmentTypeInput}
                  onAddEmploymentTypeInput={this.onAddEmploymentTypeInput}
                  onChangeSalaryRangeInput={this.onChangeSalaryRangeInput}
                  onRemoveEmploymentTypeInput={this.onRemoveEmploymentTypeInput}
                />
              </div>
              <hr className="line" />
            </div>
            <div className="job-list-container">{this.renderJobs()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default JobsPage
