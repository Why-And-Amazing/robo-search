import React, { useState, useEffect } from 'react';

import Loader from 'react-loader-spinner';
import axios from 'axios';

import SearchBox from '../src/components/SearchBox';
import CardList from '../src/components/CardList';

export default function Home() {
  const RandomCharsToUse =
    'abcdefghijkmnpqrstuvwxyz23456789ABCDEFGHJKLMNPQRSTUVWXYZ./*-+';
  const randomQuery = RandomCharsToUse.charAt(
    Math.random() * (RandomCharsToUse.length - 1) + 1,
  );
  const [query, setQuery] = useState('');
  const [robots, setRobots] = useState([{ id: '', text: '' }]);
  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/search?query=${randomQuery}`,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSearchChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value.trim());
    setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        const newElem = [];
        result.data.hits.forEach((item) => {
          if (item.title.toLowerCase().includes(query.toLowerCase())) {
            const robot = {
              id: item.url,
              text: item.title,
            };
            newElem.push(robot);
          }
        });
        setRobots(newElem);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <>
      <div className="bg-gradient-to-b bg-gray-900 to-blue-300">
        <div className="p-6 ">
          <div className="p-6">
            <SearchBox onSearchChange={onSearchChange} />
          </div>
          {isError && (
            <div className="flex h-screen ">
              <div className=" m-auto">
                <h1 className="text-gray-50">
                  Something went wrong during fetching. Please refresh page...
                </h1>
              </div>
            </div>
          )}
          {isLoading ? (
            <div className="flex h-screen ">
              <div className="m-auto">
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={80}
                  width={80}
                />
              </div>
            </div>
          ) : (
            <div className="flex h-screen ">
              <div className="p-2">
                <CardList key={robots.id} robots={robots} query={query} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
