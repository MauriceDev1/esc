"use client"

import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const storedValue = localStorage.getItem('selectedCity');
    if (storedValue) {
      setData(storedValue); // Safe assignment
    }
  }, []);

  return (
    <div>
      <h1>Stored Data:</h1>
      <p>{data || 'No data found'}</p>
    </div>
  );
};

export default App;
