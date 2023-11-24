
import './App.css';
import React, { useState } from 'react'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';


function App() {


  const [clicked, setClicked] = useState(false)
  const [stars, setStars] = useState(1);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);



  const onMouseOver = (rating) => {
    if (clicked) return;


    [...Array(rating)].map((x, i) => {
      document.querySelector(`#star-${i + 1}`).classList.replace('far', 'fas')
    });
  };



  const onMouseOut = (rating) => {
    if (clicked) return;

    [...Array(rating)].map((x, i) => {
      document.querySelector(`#star-${i + 1}`).classList.replace('fas', 'far')
    });
  };



  const onClick = (rating) => {
    setClicked(true);
    setStars(rating);

    //reset stars
    [...Array(5)].map((x, i) => {
      document.querySelector(`#star-${i + 1}`).classList.replace('fas', 'far');
    });

    //highlight
    [...Array(rating)].map((x, i) => {
      document.querySelector(`#star-${i + 1}`).classList.replace('far', 'fas')
    });

  };



  const resetForm = (e) => {
    e.preventDefault();
    //reset stars
    [...Array(5)].map((x, i) => {
      document.querySelector(`#star-${i + 1}`).classList.replace('fas', 'far');
    });

    //reset state
    setStars(1);
    setReview('');
    setClicked(false);
  };


  const submitReview = (e) => {
    e.preventDefault();


    const newReview = {
      rating: stars,
      description: review,
    };

    setReviews([...reviews, newReview]);
    resetForm(e);
  };



  const deleteReview = (e, index) => {
    e.preventDefault();

    const clone = [...reviews];
    const newState = clone.filter((x, i) => index !== i)
    setReviews(newState)
  };



  return (

    <Container fluid className='App text-light text-center'>

      <Col md={{ span: 6, offset: 3 }}>

        <Row className='mt-5'>

          <Col>
            {[...Array(5)].map((s, i) => {
              return (<i
                key={i}
                className='far fa-star display-4'
                onMouseOver={(e) => onMouseOver(i + 1)}
                onMouseOut={(e) => onMouseOut(i + 1)}
                onClick={e => onClick(i + 1)}
                id={`star-${i + 1}`}
                style={{ cursor: 'pointer' }}
              />)
            })}
          </Col>

        </Row>


        <Row className='mt-5'>
          <Col>
            <Form.Group>
              <Form.Control as='textarea' rows={3} value={review} onChange={(e) => setReview(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>



        <Row className='mt-5'>

          <Col>

            <Button className='me-3' variant='warning' onClick={(e) => resetForm(e)}>Reset</Button>

            <Button variant='success' onClick={(e) => submitReview(e)} disabled={review === ''}>Submit</Button>

          </Col>

        </Row>



        <Row className='mt-5'>
          <Col>
            {reviews.map((r, rIndex) => {
              return (

                <Card key={rIndex} className='mt-3 mb-3'>

                  <Card.Body>

                    {[...Array(r.rating)].map((s, sIndex) => {
                      return (<i key={sIndex} className='fas  fa-star text-warning' />)
                    })}
                    <h3 className='text-dark'>{r.description}</h3>

                  </Card.Body>

                  <Card.Footer>

                    <Button variant='danger' onClick={e => deleteReview(e, rIndex)}>Delete</Button>

                  </Card.Footer>

                </Card>
              );

            })}
          </Col>

        </Row>

      </Col >

    </Container >
  );
}

export default App;
