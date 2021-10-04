const products = [
  {
    title: 'Painting One',
    artist: 'Artist 1',
    slug: 'painting-1',
    category: '60d43b2c4270af09182737ef',
    images: [
      { filename: '1.jpg' },
      { filename: '2.jpg' },
      { filename: '4.jpg' },
      { filename: '5.jpg' },
      { filename: '6.jpg' }
    ],
    description:
      'This is Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    mywork: true,
    original: true,
    highlights: [
      { title: 'Painting Style', value: 'Acrylic on canvas' },
      { title: 'Material', value: 'wood' },
      { title: 'Artist', value: 'Nandan Bhosale' }
    ],
    weight: {
      value: 10
    },
    dimensions: {
      l: 10,
      w: 11,
      h: 14
    },
    origin: 'india',
    deliveryCharge: 0,
    returns: false,
    certificate: true,
    sku: '46654DSG64H44DFH',
    price: 1000,
    stockQty: 1,
    seller: '611ebcf0ec2e8323cc9ce026'
  },
  {
    title: 'Painting Two',
    artist: 'Artist 2',
    slug: 'painting-2',
    category: '60d43b2c4270af09182737ef',
    images: [
      { filename: '2.jpg' },
      { filename: '3.jpg' },
      { filename: '4.jpg' },
      { filename: '5.jpg' },
      { filename: '6.jpg' }
    ],
    description:
      'This is Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    mywork: false,
    original: true,
    highlights: [
      { title: 'Painting Style', value: 'Acrylic on canvas' },
      { title: 'Material', value: 'wood' },
      { title: 'Artist', value: 'Nandan Bhosale' }
    ],
    weight: {
      value: 10
    },
    dimensions: {
      l: 20,
      w: 51,
      h: 94
    },
    origin: 'france',
    deliveryCharge: 0,
    returns: false,
    certificate: true,
    sku: '46654DSG64H44DFH',
    price: 1500,
    stockQty: 1,
    seller: '611ebcf0ec2e8323cc9ce026'
  },
  {
    title: 'Painting Three',
    artist: 'Artist 3',
    slug: 'painting-3',
    category: '60d43b2c4270af09182737ef',
    images: [
      { filename: '3.jpg' },
      { filename: '2.jpg' },
      { filename: '4.jpg' },
      { filename: '5.jpg' },
      { filename: '6.jpg' },
      { filename: '3.jpg' },
      { filename: '2.jpg' },
      { filename: '4.jpg' },
      { filename: '1.jpg' },
      { filename: '5.jpg' }
    ],
    description:
      'This is Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    mywork: false,
    original: false,
    highlights: [
      { title: 'Painting Style', value: 'Acrylic on canvas' },
      { title: 'Material', value: 'wood' },
      { title: 'Artist', value: 'Nandan Bhosale' }
    ],
    weight: {
      value: 12
    },
    dimensions: {
      l: 20,
      w: 21,
      h: 54
    },
    origin: 'usa',
    deliveryCharge: 15,
    returns: true,
    certificate: false,
    sku: '54DF46DS4G4',
    price: 12000,
    stockQty: 1,
    seller: '611ebcf0ec2e8323cc9ce026'
  },
  {
    title: 'Painting Four',
    artist: 'Artist 4',
    slug: 'painting-4',
    category: '60d43b2c4270af09182737ef',
    images: [
      { filename: '4.jpg' },
      { filename: '2.jpg' },
      { filename: '4.jpg' },
      { filename: '5.jpg' },
      { filename: '6.jpg' }
    ],
    description:
      'This is Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    mywork: true,
    original: true,
    highlights: [
      { title: 'Painting Style', value: 'Acrylic on canvas' },
      { title: 'Material', value: 'wood' },
      { title: 'Artist', value: 'Nandan Bhosale' }
    ],
    weight: {
      value: 10
    },
    dimensions: {
      l: 10,
      w: 11,
      h: 14
    },
    origin: 'india',
    deliveryCharge: 0,
    returns: false,
    certificate: true,
    sku: '46654DSG64H44DFH',
    price: 1000,
    stockQty: 1,
    seller: '611ebcf0ec2e8323cc9ce026'
  },
  {
    title: 'Painting Five',
    artist: 'Artist 5',
    slug: 'painting-5',
    category: '60d43b2c4270af09182737ef',
    images: [
      { filename: '5.jpg' },
      { filename: '3.jpg' },
      { filename: '4.jpg' },
      { filename: '5.jpg' },
      { filename: '6.jpg' }
    ],
    description:
      'This is Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    mywork: false,
    original: true,
    highlights: [
      { title: 'Painting Style', value: 'Acrylic on canvas' },
      { title: 'Material', value: 'wood' },
      { title: 'Artist', value: 'Nandan Bhosale' }
    ],
    weight: {
      value: 10
    },
    dimensions: {
      l: 20,
      w: 51,
      h: 94
    },
    origin: 'france',
    deliveryCharge: 0,
    returns: false,
    certificate: true,
    sku: '46654DSG64H44DFH',
    price: 1500,
    stockQty: 1,
    seller: '611ebcf0ec2e8323cc9ce026'
  },
  {
    title: 'Painting Six',
    artist: 'Artist 6',
    slug: 'painting-6',
    category: '60d43b2c4270af09182737ef',
    images: [
      { filename: '6.jpg' },
      { filename: '2.jpg' },
      { filename: '4.jpg' },
      { filename: '5.jpg' },
      { filename: '6.jpg' },
      { filename: '3.jpg' },
      { filename: '2.jpg' },
      { filename: '4.jpg' },
      { filename: '1.jpg' },
      { filename: '5.jpg' }
    ],
    description:
      'This is Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    mywork: false,
    original: false,
    highlights: [
      { title: 'Painting Style', value: 'Acrylic on canvas' },
      { title: 'Material', value: 'wood' },
      { title: 'Artist', value: 'Nandan Bhosale' }
    ],
    weight: {
      value: 12
    },
    dimensions: {
      l: 20,
      w: 21,
      h: 54
    },
    origin: 'usa',
    deliveryCharge: 15,
    returns: true,
    certificate: false,
    sku: '54DF46DS4G4',
    price: 12000,
    stockQty: 1,
    seller: '611ebcf0ec2e8323cc9ce026'
  },
  {
    title: 'Painting Seven',
    artist: 'Artist 7',
    slug: 'painting-7',
    category: '60d43b2c4270af09182737ef',
    images: [
      { filename: '1.jpg' },
      { filename: '2.jpg' },
      { filename: '4.jpg' },
      { filename: '5.jpg' },
      { filename: '6.jpg' }
    ],
    description:
      'This is Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    mywork: true,
    original: true,
    highlights: [
      { title: 'Painting Style', value: 'Acrylic on canvas' },
      { title: 'Material', value: 'wood' },
      { title: 'Artist', value: 'Nandan Bhosale' }
    ],
    weight: {
      value: 10
    },
    dimensions: {
      l: 10,
      w: 11,
      h: 14
    },
    origin: 'india',
    deliveryCharge: 0,
    returns: false,
    certificate: true,
    sku: '46654DSG64H44DFH',
    price: 1000,
    stockQty: 1,
    seller: '611ebcf0ec2e8323cc9ce026'
  },
  {
    title: 'Painting Eight',
    artist: 'Artist 2',
    slug: 'painting-8',
    category: '60d43b2c4270af09182737ef',
    images: [
      { filename: '2.jpg' },
      { filename: '3.jpg' },
      { filename: '4.jpg' },
      { filename: '5.jpg' },
      { filename: '6.jpg' }
    ],
    description:
      'This is Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    mywork: false,
    original: true,
    highlights: [
      { title: 'Painting Style', value: 'Acrylic on canvas' },
      { title: 'Material', value: 'wood' },
      { title: 'Artist', value: 'Nandan Bhosale' }
    ],
    weight: {
      value: 10
    },
    dimensions: {
      l: 20,
      w: 51,
      h: 94
    },
    origin: 'france',
    deliveryCharge: 0,
    returns: false,
    certificate: true,
    sku: '46654DSG64H44DFH',
    price: 1500,
    stockQty: 1,
    seller: '611ebcf0ec2e8323cc9ce026'
  },
  {
    title: 'Painting Nine',
    artist: 'Artist 9',
    slug: 'painting-9',
    category: '60d43b2c4270af09182737ef',
    images: [
      { filename: '3.jpg' },
      { filename: '2.jpg' },
      { filename: '4.jpg' },
      { filename: '5.jpg' },
      { filename: '6.jpg' },
      { filename: '3.jpg' },
      { filename: '2.jpg' },
      { filename: '4.jpg' },
      { filename: '1.jpg' },
      { filename: '5.jpg' }
    ],
    description:
      'This is Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    mywork: false,
    original: false,
    highlights: [
      { title: 'Painting Style', value: 'Acrylic on canvas' },
      { title: 'Material', value: 'wood' },
      { title: 'Artist', value: 'Nandan Bhosale' }
    ],
    weight: {
      value: 12
    },
    dimensions: {
      l: 20,
      w: 21,
      h: 54
    },
    origin: 'usa',
    deliveryCharge: 15,
    returns: true,
    certificate: false,
    sku: '54DF46DS4G4',
    price: 12000,
    stockQty: 1,
    seller: '611ebcf0ec2e8323cc9ce026'
  },
  {
    title: 'Painting Ten',
    artist: 'Artist 1',
    slug: 'painting-10',
    category: '60d43b2c4270af09182737ef',
    images: [
      { filename: '3.jpg' },
      { filename: '2.jpg' },
      { filename: '4.jpg' },
      { filename: '5.jpg' },
      { filename: '6.jpg' },
      { filename: '3.jpg' },
      { filename: '2.jpg' },
      { filename: '4.jpg' },
      { filename: '1.jpg' },
      { filename: '5.jpg' }
    ],
    description:
      'This is Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    mywork: false,
    original: false,
    highlights: [
      { title: 'Painting Style', value: 'Acrylic on canvas' },
      { title: 'Material', value: 'wood' },
      { title: 'Artist', value: 'Nandan Bhosale' }
    ],
    weight: {
      value: 12
    },
    dimensions: {
      l: 20,
      w: 21,
      h: 54
    },
    origin: 'usa',
    deliveryCharge: 15,
    returns: true,
    certificate: false,
    sku: '54DF46DS4G4',
    price: 12000,
    stockQty: 1,
    seller: '611ebcf0ec2e8323cc9ce026'
  }
]
export default products
