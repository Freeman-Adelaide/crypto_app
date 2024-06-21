import React from 'react';
import { Row, Col, Collapse, Typography, Avatar } from 'antd';
import millify from 'millify';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader'

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const count = 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const exchangesList = cryptosList?.data?.coins;
  console.log(exchangesList)

  if(isFetching) return <Loader />

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={(
                  <Row>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}</strong></Text>
                      <Avatar className='exchange-image' src={exchange.iconUrl}/>
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>{millify(exchange['24hVolume'])}</Col>
                    <Col span={6}>{millify(exchange.marketCap)}</Col>
                    <Col span={6}>{millify(exchange.change)}</Col>
                  </Row>
                )}
              >
                <strong>{exchange.name}</strong>, dolor sit amet consectetur adipisicing elit. A dolorum repudiandae unde vero ratione cupiditate magni, odit beatae incidunt exercitationem quod odio quo eaque, veniam aperiam asperiores animi! Exercitationem, voluptates?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, asperiores. Maiores recusandae ex incidunt suscipit, ipsam distinctio atque a assumenda?
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>

    </>    
  );
};

export default Exchanges;
