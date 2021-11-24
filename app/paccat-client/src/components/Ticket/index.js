import React from 'react';
import { Card } from 'react-bootstrap'

const ticket = (props) => {

    const { image, title, description }  = props;

    return (
        <Card style={{ width: '18rem', height: "16em"}}>
        <Card.Img variant="top" src={image} />
        <Card.Body className="normal-text">
            <Card.Title>{title}</Card.Title>
            <Card.Text>
                <span>{description}</span>
            </Card.Text>
        </Card.Body>
        </Card>
    )
}


export default ticket