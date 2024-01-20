import React from 'react'
import { Link } from 'react-router-dom'


export const CustomCard = ({title, linkTo, linkText, average, description, additionalContent }) => {
  return (
    <div className="p-3 mt-5 rounded-5 bg-transparent border border-secondary-subtle" style={{ width: '45vh' }}>
      <h6 className='d-flex justify-content-between'>{title} {linkTo && <Link to={linkTo}>{linkText}</Link>}</h6>
      <hr />
      <div>
        <h3>{average}</h3>
        <p>{description}</p>
        {additionalContent}
      </div>
    </div>
  )
}
