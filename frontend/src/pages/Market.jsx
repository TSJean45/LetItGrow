import React from 'react'
import { Header, MarketNavBar } from '../components'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import './Market.scss'
import { FcExpand } from 'react-icons/fc'

import plant1 from '../assets/marketCarousel-1.png'
import plant2 from '../assets/marketCarousel-2.png'
import plant3 from '../assets/marketCarousel-3.png'
import apples from '../assets/apples.png'
import mango from '../assets/mango.png'
import durian from '../assets/durian.png'
import tomato from '../assets/tomato.png'
import cabbage from '../assets/cabbage.png'
import organic from '../assets/Organic.png'
import pesticide from '../assets/Pesticide.png'
import npk from '../assets/Npk.png'
import serai from '../assets/serai.png'

const productData1 = [
  {
    id: 1,
    seller: '@flowerfarm',
    name: 'Pink Kalanchoe (Large)',
    farm: 'Melaka',
    price: 'RM30',
    image: plant1,
    style: { width: '20000px' }

  },
  {
    id: 2,
    seller: '@flowerfarm',
    name: 'Philodendron',
    farm: 'Johor Bahru',
    price: 'RM30',
    image: plant2,
  },
  {
    id: 3,
    seller: '@cactus520',
    name: 'Cactus Random ',
    farm: 'Penang',
    price: 'RM5',
    image: plant3,
  },
  {
    id: 4,
    seller: '@pakcikfarm',
    name: 'Organic Mango (Box)',
    farm: 'Cameron Highland',
    price: 'RM50',
    image: mango,
  },
]

const productData2 = [
  {
    id: 1,
    seller: '@duriannn',
    name: 'Kampung Durian',
    farm: 'Melaka',
    price: 'RM15/kg',
    image: durian,
  },
  {
    id: 2,
    seller: '@pakcikfarm',
    name: 'Tomato',
    farm: 'Cameron Highlands',
    price: 'RM10/kg',
    image: tomato,
  },
  {
    id: 3,
    seller: '@rebeccajason',
    name: 'Fresh Red Apples',
    farm: 'Overseas',
    price: 'RM50/box',
    image: apples,
  },
  {
    id: 4,
    seller: '@flowerfarm',
    name: 'Cabbages',
    farm: 'Cameron Highlands',
    price: 'RM10/1kg',
    image: cabbage,
  },
]

const productData3 = [
  {
    id: 1,
    seller: '@fahmi',
    name: 'Organic Fertilizer (1KG)',
    farm: 'Batu Pahat',
    price: 'RM18',
    image: organic,
  },
  {
    id: 2,
    seller: '@siti_plants',
    name: 'Serai',
    farm: 'Taiping',
    price: 'RM10/1kg',
    image: serai,
  },
  {
    id: 3,
    seller: '@fahmi',
    name: 'Bacteriacide (1L)',
    farm: 'Batu Pahat',
    price: 'RM120',
    image: pesticide,
  },
  {
    id: 4,
    seller: '@brucewayne',
    name: 'NPK Fertilizer (1KG)',
    farm: 'Alor Setar',
    price: 'RM13',
    image: npk,
  },

]

const Market = () => {
  return (
    <div className="Market">
      <Header />
      <MarketNavBar />

      <Container fluid>
        <sort>
          <div className="dropdown">
            <button className="dropdown-toggle">
              Categories
              <FcExpand style={{ marginLeft: '5px' }} />
            </button>
            <div className="dropdown-content">
              <a href="#">Fruits</a>
              <a href="#">Vegetable</a>
              <a href="#">Flowers</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropdown-toggle">
              Area
              <FcExpand style={{ marginLeft: '5px' }} />
            </button>
            <div className="dropdown-content">
              <a href="#">Melaka</a>
              <a href="#">Johor Bahru</a>
              <a href="#">Selangor</a>
              <a href="#">Cameron Highlands</a>
              <a href="#">Penang</a>
            </div>
          </div>
        </sort>

        <products>
          {productData1.map((product) => (
            <Col key={product.id}>
              <Card className="product">
                <Card.Text>{product.seller}</Card.Text>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title className="title">{product.name}</Card.Title>
                  <Card.Text>Farm: {product.farm}</Card.Text>
                  <Card.Text>Price: {product.price}</Card.Text>
                  <Button variant="primary">ADD TO CART</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </products>
        <products>
          {productData2.map((product) => (
            <Col key={product.id}>
              <Card className="product">
                <Card.Text>{product.seller}</Card.Text>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title className="title">{product.name}</Card.Title>
                  <Card.Text>Farm: {product.farm}</Card.Text>
                  <Card.Text>Price: {product.price}</Card.Text>
                  <Button variant="primary">ADD TO CART</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </products>
        <products>
          {productData3.map((product) => (
            <Col key={product.id}>
              <Card className="product">
                <Card.Text>{product.seller}</Card.Text>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title className="title">{product.name}</Card.Title>
                  <Card.Text>Farm: {product.farm}</Card.Text>
                  <Card.Text>Price: {product.price}</Card.Text>
                  <Button variant="primary">ADD TO CART</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </products>
      </Container>
    </div>
  )
}

export default Market
