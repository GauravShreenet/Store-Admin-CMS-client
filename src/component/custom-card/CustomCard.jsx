import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export const CustomCard = ({title, linkTo, linkText, average, description, additionalContent }) => {
  return (
    <Card className="p-3 mt-2 rounded-5 bg-transparent border border-secondary-subtle">
      <Card.Title className='d-flex justify-content-between'>{title} {linkTo && <Link to={linkTo}>{linkText}</Link>}</Card.Title>
      <hr />
      <Card.Body>
        <h3>{average}</h3>
        <p>{description}</p>
        {additionalContent}
      </Card.Body>
    </Card>
  )
}
