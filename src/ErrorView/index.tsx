import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Index = () => {
  const [image, setImage] = useState();

  useEffect(() => {
    axios
      .get('https://http.cat/404')
      .then((res) => {
        setImage(res.data);
        console.log(res);
      })
      .catch();
  }, []);
  return (
    <div>
      TTEEEEEEEEEEEEST
      <div>{image}</div>
    </div>
  );
};

export default Index;
