import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser/lib/index'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, CheckOutlined } from '@ant-design/icons';
import {  useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select; 

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistory} = useGetCryptoHistoryQuery({coinId, timePeriod})
  const cryptoDetails = data?.data?.coin;
  
  console.log(cryptoDetails)
  if(isFetching) return <Loader />;
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [ 
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  console.log(data)

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails.name} ({cryptoDetails.slug}) Price
        </Title>
        <p>
            {cryptoDetails.name} live price in US dollars.
             View value statistics, market cap and supply.
        </p>
      </Col>
      <Select 
          defaultValue="7d"
          className='select-timeperiod' 
          placeholder="Select Time Period" 
          onChange={(value) => setTimePeriod(value)}
          >
            {time.map((date) => <Option key={date}>{date}</Option>)}              
      </Select>
      <LineChart coinHistory = {coinHistory} currentPrice = {millify(cryptoDetails?.price)} coinName = { cryptoDetails?.name }/>
      <Col className='stats-container'>
         <Col className='coin-value-statistics'>
            <Col className='coin-value-statistics-heading'>
              <Title level={3} className='coin-details-heading'>
                {cryptoDetails.name} Value Statistics
              </Title>
              <p>
                An overview showing the stats of {cryptoDetails.name}
              </p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))}
         </Col>
         
         <Col className='other-stats-info'>
            <Col className='coin-value-statistics-heading'>
              <Title level={3} className='coin-details-heading'>
                Other Statistics
              </Title>
              <p>
                An overview showing the stats of all cryptocurrencies. 
              </p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))}
         </Col>
      </Col>
      
      <Col className='coin-desc-link'>
            <Row className='coin-desc'>
                <Title level={3} className='coin-details-heading'>
                    What is {cryptoDetails.name}<br />
                    <Text>
                      {HTMLReactParser(cryptoDetails.description)}Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla assumenda odio, aliquam cum quibusdam iusto sapiente ullam in facilis minima ducimus maxime quod libero, tempore ratione, aspernatur facere itaque ipsam. Obcaecati quam maiores necessitatibus iste autem veritatis adipisci ipsa officia quisquam aperiam. Veritatis est incidunt fuga, repudiandae a porro tenetur vitae! Animi atque optio accusamus blanditiis debitis reprehenderit minima dicta nesciunt earum mollitia eius dolor, adipisci, id eaque modi laborum inventore doloremque, eum quos velit aperiam? Esse aliquam quas non tempora aliquid ex maiores, ea animi quia error consequatur omnis possimus nostrum aspernatur repellendus illum voluptatibus inventore, quae officiis temporibus.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum odio minus et beatae dolor tempore, corporis quam in inventore. Velit ab repellat, dicta culpa molestias nisi repudiandae! Ducimus illo recusandae similique tenetur consequuntur a fugiat officiis quas ut iusto quam cum, repellat dolor facilis quasi eveniet velit, veniam sapiente dolorem perspiciatis at pariatur! Placeat natus dolorem recusandae eveniet eaque haru.
                    </Text>
                </Title>
                
            </Row>
            <Col lg={24} className='coin-links'>
              <Title level={3} className='coin-details-heading'>
                  {cryptoDetails.name} Links 
              </Title>
                {cryptoDetails.links.map((link) => (
                  <Row className='coin-link' key={link.name}>
                    <Title level={5} className='link-name'>
                      {link.type}
                    </Title>
                    <a href={link.url} target='_blank' rel='noreferrer'>
                      {link.name}
                    </a>
                  </Row>
                ))}
            </Col>
      </Col>
    </Col>    
  )
}

export default CryptoDetails
