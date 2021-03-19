import React from 'react';
import CardElement from './CardElement';
const CardList = ({ robots, query }) => {
  const cardList = robots.map((robot) => (
    <CardElement key={robot.id} id={robot.id} text={robot.text} query={query} />
  ));

  return (
    <div className="grid 2xl:grid-cols-8 xl:grid-cols-6  lg:grid-cols-5 md:grid-cols-4  sm:grid-cols-3 gap-x-3.5 h-auto ">
      {cardList}
    </div>
  );
};

export default CardList;
