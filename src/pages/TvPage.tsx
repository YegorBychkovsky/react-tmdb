import React from 'react';
import { useParams } from 'react-router-dom';

const TvPage = () => {
  const { tvId } = useParams();

  return <div>TvPage</div>;
};
export default TvPage;
