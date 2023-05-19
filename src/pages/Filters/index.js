import './index.css'

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

const Filters = props => {
  const {
    onAddEmploymentTypeInput,
    onRemoveEmploymentTypeInput,
    onChangeSalaryRangeInput,
  } = props

  const onHandleSalaryChange = event =>
    onChangeSalaryRangeInput(event.target.value)

  return (
    <>
      <h1 className="employmentType-heading">Type of Employment</h1>
      <ul className="employmentType-ul-container">
        {employmentTypesList.map(each => {
          const onHandleCheckbox = event => {
            if (event.target.checked) {
              onAddEmploymentTypeInput(each.employmentTypeId)
            } else {
              onRemoveEmploymentTypeInput(each.employmentTypeId)
            }
          }
          return (
            <li className="employmentType-list-container">
              <input
                className="employmentType-checkbox"
                type="checkbox"
                id={each.employmentTypeId}
                onClick={onHandleCheckbox}
              />
              <label
                className="employmentType-checkbox-label"
                htmlFor={each.employmentTypeId}
              >
                {each.label}
              </label>
            </li>
          )
        })}
      </ul>
      <hr className="line" />
      <h1 className="salary-heading">Salary Range</h1>
      <ul onChange={onHandleSalaryChange} className="salary-ul-container">
        {salaryRangesList.map(each => (
          <li className="salary-list-container">
            {/* <button className="salary-btn" type="button">
              
            </button> */}

            <label className="salary-options-label">
              <input
                className="salary-options"
                type="radio"
                name="salary"
                value={each.salaryRangeId}
              />
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Filters
