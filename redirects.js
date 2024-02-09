const redirects = [
  {
    source: '/resort/summer',
    destination: '/activities?category=summer',
    permanent: true,
  },
  {
    source: '/resort/summer/lift-access-mountain-biking',
    destination: '/tickets/summer',
    permanent: true,
  },
  {
    source: '/resort/summer/lessons-camps-tours',
    destination: '/lessons/summer',
    permanent: true,
  },
  {
    source: '/resort/summer/bike-and-equipment-rental',
    destination: '/rentals/summer',
    permanent: true,
  },
  {
    source: '/resort/summer/multi-use-xc-trails',
    destination: '/tickets/summer',
    permanent: true,
  },
  {
    source: '/resort/summer/events-amenities-lodging',
    destination: '/activities?category=summer',
    permanent: true,
  },
  {
    source: '/resort/summer/trail-conditions-maps',
    destination: '/tickets/summer',
    permanent: true,
  },
  {
    source: '/resort/summer/summer-safety',
    destination: '/tickets/summer',
    permanent: true,
  },
  {
    source: '/resort/summer/faq',
    destination: '/faq',
    permanent: true,
  },
  {
    source: '/resort/summer/bike-park-trail-map',
    destination: '/tickets/summer',
    permanent: true,
  },
  {
    source: '/resort/summer/multi-use-xc-trail-map',
    destination: '/tickets/summer',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/conditions/snow-report',
    destination: '/conditions',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/conditions/lift-and-terrain-status',
    destination: '/conditions',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/conditions/webcams',
    destination: '/conditions',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/winter-trail-map',
    destination: '/mountain',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/mountain-statistics',
    destination: '/mountain',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/mountain-safety',
    destination: '/mountain',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/transportation',
    destination: '/location',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/blog',
    destination: '/blog',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/blog/item/490-end-season-uphill',
    destination: '/blog',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/blog/item/489-flood-preparation-resources',
    destination: '/blog',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/blog/item/488-20230331',
    destination: '/blog',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/blog/item/487-20230320',
    destination: '/blog',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/blog/item/486-20230315-delayed-lifts',
    destination: '/blog',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/blog/item/485-incoming-storm-03-10-23',
    destination: '/blog',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/blog/item/484-20230303-paradise-lift',
    destination: '/blog',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/blog/item/483-incoming-storm-2-36-23',
    destination: '/blog',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/blog/item/482-incoming-storm-2-21-23',
    destination: '/blog',
    permanent: true,
  },
  {
    source: '/resort/the-mountain/blog/item/481-welcome-to-the-ops-blog',
    destination: '/blog',
    permanent: true,
  },
  {
    source: '/resort/tickets-passes/23-24-season-passes',
    destination: '/tickets',
    permanent: true,
  },
  {
    source: '/resort/tickets-passes/day-night-tickets',
    destination: '/tickets',
    permanent: true,
  },
  {
    source: '/resort/tickets-passes/discounts-and-specials',
    destination: '/tickets',
    permanent: true,
  },
  {
    source: '/resort/tickets-passes/groups',
    destination: '/tickets',
    permanent: true,
  },
  {
    source: '/resort/tickets-passes/groups/groups-inquiry',
    destination: '/tickets',
    permanent: true,
  },
  {
    source:
      '/resort/tickets-passes/groups/groups-inquiry/form/13-general-inquiry',
    destination: '/tickets',
    permanent: true,
  },
  {
    source: '/resort/rentals-tuning',
    destination: '/rentals/winter',
    permanent: true,
  },
  {
    source: '/resort/adventures',
    destination: '/activities',
    permanent: true,
  },
  {
    source: '/resort/snow-sports-school',
    destination: '/lessons/',
    permanent: true,
  },
  {
    source: '/eats',
    destination: '/lodges-and-dinning',
    permanent: true,
  },
  {
    source: '/community-sep',
    destination: '/community',
    permanent: true,
  },
  {
    source: '/community-sep/page-one/helping-our-community-one-tree-at-a-time',
    destination: '/blog/our-commitment-to-sustainability',
    permanent: true,
  },
  {
    source: '/community-sep/page-one/trail-building-triumph-on-powder-mountain',
    destination: '/location',
    permanent: true,
  },
  {
    source: '/community-sep/page-one/hwy-158-driving-tips',
    destination: '/',
    permanent: true,
  },
  {
    source: '/community-sep/page-two/wellness',
    destination: '/community?category=wellness',
    permanent: true,
  },
  {
    source: '/community-sep/page-two/dining-in-eden-and-ogden',
    destination: '/community?category=dining',
    permanent: true,
  },
  {
    source: '/community-sep/page-two/winter-activities',
    destination: '/community?category=activities',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/horizon/horizon-7770',
    destination: 'https://powderstays.com/category/horizon/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/horizon/horizon-7845',
    destination: 'https://powderstays.com/category/horizon/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/horizon/horizon-7851',
    destination: 'https://powderstays.com/category/horizon/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/cascade/cascade-104',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/cascade/cascade-602',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/cascade/cascade-602-a',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/cascade/cascade-602-b',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/cascade/cascade-602-c',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source:
      '/lodging/lodging/vacation-rentals/heartwood-ridgenest/heartwood-7926',
    destination: 'https://powderstays.com/category/heartwood/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/moose-hollow/moose-hollow-102',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/moose-hollow/moose-hollow-104',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/moose-hollow/moose-hollow-809',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/moose-hollow/moose-hollow-503',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/moose-hollow/moose-hollow-1406',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/moose-hollow/moose-hollow-1310',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/moose-hollow/moose-hollow-807',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/moose-hollow/moose-hollow-702',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source:
      '/lodging/lodging/vacation-rentals/copper-crest-east/copper-crest-east-5745',
    destination: 'https://powderstays.com/category/copper-crest-east/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/spring-park/spring-park-8492',
    destination: 'https://powderstays.com/category/spring-park/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-rentals/sugar-pine/sugar-pine-6924',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/seasonal-deals/free-golf-package',
    destination: '/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/seasonal-deals/family-and-group-discount',
    destination: '/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/seasonal-deals/mountaintop-luxury',
    destination: 'https://powderstays.com/',
    permanent: true,
  },
  {
    source: '/lodging/lodging/vacation-guide',
    destination: '/location',
    permanent: true,
  },
  {
    source: '/lodging/lodging/community-guide/wellness',
    destination: '/community?category=wellness',
    permanent: true,
  },
  {
    source: '/lodging/lodging/community-guide/dining-and-supplies',
    destination: '/community?category=dining',
    permanent: true,
  },
  {
    source: '/lodging/lodging/community-guide/winter-activities',
    destination: '/community',
    permanent: true,
  },
  {
    source: '/lodging/lodging/getting-here',
    destination: '/location',
    permanent: true,
  },
  {
    source: '/lodging/lodging/property-management-services',
    destination: '/',
    permanent: true,
  },
  {
    source: '/neighbors-mobile/benefits/how-to-videos/how-to-redeem-day-passes',
    destination: '/',
    permanent: true,
  },
  {
    source:
      '/neighbors-mobile/benefits/how-to-videos/how-to-pay-dues-and-redeem-season-pass',
    destination: '/',
    permanent: true,
  },
  {
    source: '/neighbors-mobile/benefits/additional-benefits/season-pass',
    destination: '/',
    permanent: true,
  },
  {
    source: '/neighbors-mobile/community-guide/wellness',
    destination: '/community',
    permanent: true,
  },
  {
    source: '/neighbors-mobile/community-guide/dining',
    destination: '/community',
    permanent: true,
  },
  {
    source: '/neighbors-mobile/community-guide/winter-activities',
    destination: '/community',
    permanent: true,
  },
  {
    source: '/neighbors-mobile/community-guide/children-activities',
    destination: '/community',
    permanent: true,
  },
  {
    source: '/neighbors-mobile/community-guide/health-care-services',
    destination: '/community',
    permanent: true,
  },
  {
    source: '/realestate',
    destination: '/real-estate',
    permanent: true,
  },
  {
    source: '/season-passes',
    destination: '/tickets',
    permanent: true,
  },
  {
    source: '/info',
    destination: '/about',
    permanent: true,
  },
  {
    source: '/about-powmow',
    destination: '/about',
    permanent: true,
  },
  {
    source: '/press-and-media',
    destination: '/press',
    permanent: true,
  },
  {
    source: '/state-liquor-store',
    destination: '/lodges-and-dinning',
    permanent: true,
  },
  {
    source: '/addresses',
    destination: '/location',
    permanent: true,
  },
  {
    source: '/login',
    destination: '/',
    permanent: true,
  },
  {
    source: '/ski-patrol-information',
    destination: '/',
    permanent: true,
  },
];

module.exports = redirects;
