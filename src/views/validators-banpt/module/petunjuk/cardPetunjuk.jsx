import React from 'react'
import { Helmet } from 'react-helmet';
import ContentCard from '../../../../components/card-content/ContentCard';
import HeroTitle from '../../../../components/hero-title/HeroTitle';
const petunjuk = () => {
  return (
    <div>
      <Helmet>
        <title>Kemenag | Petunjuk</title>
      </Helmet>
      <HeroTitle title="Petunjuk" />
      <ContentCard>
        hehe
      </ContentCard>
    </div>
  );
}

export default petunjuk