import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';

import CardElement from './CardElement';
const CardList = ({ url, query }) => {
  const [robots, setRobots] = useState([{ id: '', text: '' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setisEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      setisEmpty(false);
      try {
        const result = await axios(url);
        let newElem = [];
        result.data.hits.forEach((item) => {
          if (item.title != null && item.title.length > 0) {
            if (item.title.toLowerCase().includes(query.toLowerCase())) {
              const robot = {
                id:
                  item.url +
                  item.title.slice(
                    1,
                    Math.random() * (item.title.length - 1) + 1,
                  ),
                text: item.title,
              };
              newElem.push(robot);
            }
            if (newElem.length === 0) {
              setisEmpty(true);
            }
          }
        });
        setRobots(newElem);
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const cardList = robots.map((robot) => (
    <CardElement key={robot.id} id={robot.id} text={robot.text} query={query} />
  ));
  return (
    <>
      {isError && (
        <div className="flex h-screen">
          <div className=" m-auto">
            <h1 className="text-gray-50">
              Something went wrong during fetching. Please refresh page...
            </h1>
          </div>
        </div>
      )}
      {isEmpty && (
        <div className="flex h-screen">
          <div className=" m-auto">
            <h1 className="text-gray-50">
              Nothing found. Please try something else...
            </h1>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="flex h-screen ">
          <div className="m-auto">
            <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
          </div>
        </div>
      ) : (
        <div className="grid 2xl:grid-cols-8 xl:grid-cols-6  lg:grid-cols-5 md:grid-cols-4  sm:grid-cols-3 gap-x-3.5 h-auto ">
          {cardList}
        </div>
      )}
    </>
  );
};

export default CardList;
