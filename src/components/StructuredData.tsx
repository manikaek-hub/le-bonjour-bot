const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "FortJoret Resort",
    "description": "Resort de luxe en Normandie face à la Manche, à Fermanville",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Fermanville",
      "addressLocality": "Fermanville",
      "postalCode": "50840",
      "addressRegion": "Normandie",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.6833",
      "longitude": "-1.6500"
    },
    "url": "https://fortjoret-resort.lovable.app",
    "telephone": "+33761976041",
    "email": "contact@fortjoret-resort.fr",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Vue sur océan"
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": "Architecture normande"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Suites panoramiques"
      }
    ],
    "priceRange": "€€€€",
    "checkInTime": "15:00",
    "checkOutTime": "11:00"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;