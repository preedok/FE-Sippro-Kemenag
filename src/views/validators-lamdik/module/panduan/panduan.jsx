import React from 'react';
import ContentCard from '../../../../components/card-content/ContentCard';
import HeroTitle from '../../../../components/hero-title/HeroTitle';

const Panduan = () => {
    return (
        <>
            <HeroTitle
                title="Panduan Sistem Penilaian Evaluator Prodi Baru"
            />
            <ContentCard>
                <div
                    className='px-3 relative w-full bg-transparent'
                >
                    <iframe
                        src='https://www.youtube.com/embed/NBYzsC-2KAc?si=LtJhHU0mhi4PXjP1'
                        width="100%"
                        height="600"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Panduan"
                        className='mt-16 bg-transparent'
                    />
                </div>
            </ContentCard>
        </>
    );
};

export default Panduan;