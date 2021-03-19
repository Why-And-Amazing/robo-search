import React, { useState } from 'react';

import SearchBox from '../src/components/SearchBox';
import CardList from '../src/components/CardList';

export default function Home() {
  const [query, setQuery] = useState('');
  const RandomCharsToUse =
    'abcdefghijkmnpqrstuvwxyz23456789ABCDEFGHJKLMNPQRSTUVWXYZ./*-+';
  const randomQuery = () => {
    return RandomCharsToUse.charAt(
      Math.random() * (RandomCharsToUse.length - 1) + 1,
    );
  };

  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/search?query=${randomQuery()}`,
  );

  let onSearchChange = (e) => {
    const newQuery = e.target.value.trim();
    e.preventDefault();
    setQuery(newQuery);
    setUrl(`https://hn.algolia.com/api/v1/search?query=${newQuery}`);
  };

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  let optimisedHandleChange = debounce(onSearchChange, 600);

  return (
    <>
      <div className="clearfix bg-gradient-to-b bg-gray-900 to-blue-300">
        <div className="p-6">
          <div className="p-6">
            <SearchBox onSearchChange={optimisedHandleChange} />
          </div>
          <div className="flex h-screen justify-center">
            <div className="p-2">
              <CardList url={url} query={query} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
