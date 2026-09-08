const PROJECTS = [
  {
    id: 'elmarqeb',
    name: 'Elmarqeb',
    category: 'Exhibitions',
    description: 'Commercial 3D design and spatial concept visualization for Elmarqeb, featuring realistic environment modeling and presentation renders.',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', 'City-Billboard-Mockup-03 copy.jpg']
  },
  {
    id: 'hylo',
    name: 'Hylo',
    category: 'Events',
    description: '3D modeling, spatial environment design, and rendering for Hylo — high-resolution visualization for commercial execution.',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '31.jpg', '1 (2).jpg', '2 (2).jpg', '3 (2).jpg', '4 (2).jpg', '5 (2).jpg', '6 (2).jpg', '7 (2).jpg', '8 (2).jpg']
  },
  {
    id: 'sewar',
    name: 'Sewar',
    category: 'Exhibitions',
    description: 'Exhibition booth design and CGI visualization for Sewar, combining brand identity with immersive spatial modeling.',
    imageCount: 9
  },
  {
    id: 'huawei',
    name: 'Huawei Gaming Event',
    category: 'Events',
    description: 'A 3D event concept for Huawei under the patronage of the UAE Esports Federation, designed and executed in Ras Al Khaimah. Full 3D visualization, layout planning, and final presentation before execution.',
    imageCount: 8
  },
  {
    id: 'waqep',
    name: 'Waqep',
    category: 'Exhibitions',
    description: 'Exhibition booth design and CGI visualization for Waqep — spatial concept development with detailed material and lighting work for client presentations.',
    imageCount: 8
  },
  {
    id: 'danikin',
    name: 'Danikin Product CGI',
    category: 'Products',
    description: '3D product modeling, studio lighting, and material development for Danikin product collection — full CGI visualization pipeline from concept to high-res rendering.',
    imageCount: 8
  },
  {
    id: 'amlak',
    name: 'Amlak Commercial Visualization',
    category: 'Exhibitions',
    description: 'Commercial visualization and exhibition booth design for Amlak, featuring high-end CGI renders and presentation-ready spatial concepts.',
    imageCount: 6
  },
  {
    id: 'stc-pay',
    name: 'STC Pay Experiential Space',
    category: 'Events',
    description: 'Event environment and experiential space design for STC Pay — immersive 3D visualization supporting stakeholder approvals and production transition.',
    imageCount: 8
  },
  {
    id: 'sukarah',
    name: 'Sukarah 3D Product Renders',
    category: 'Products',
    description: '3D product visualization and commercial CGI rendering for Sukarah, combining spatial material lighting with cinematic product presentation quality.',
    imageCount: 8
  },
  {
    id: 'stc-bank',
    name: 'STC Bank Event Environment',
    category: 'Events',
    description: 'Event and experiential design for STC Bank — large-scale 3D environment visualization with focus on brand presence and spatial flow.',
    imageCount: 8
  },
  {
    id: 'elm',
    name: 'ELM Exhibition Booth',
    category: 'Exhibitions',
    description: 'Exhibition booth and commercial visualization for ELM — detailed CGI renders supporting concept development and client presentations.',
    imageCount: 8
  },
  {
    id: 'unity',
    name: 'Unity 3D Product & Event',
    category: 'Products',
    description: 'Product visualization and 3D environment design for Unity — spatial concept development with high-end presentation CGI quality.',
    imageCount: 8
  },
  {
    id: 'valorant',
    name: 'Valorant Stage Concept',
    category: 'Events',
    description: 'Gaming event concept and CGI visualization for Valorant — immersive spatial design with cinematic lighting and material development.',
    imageCount: 8
  }
];

const CLIENTS = [
  { name: 'Amlak', project: 'amlak', logo: 'amlak.png' },
  { name: 'Danikin', project: 'danikin', logo: 'dankin.png' },
  { name: 'ELM', project: 'elm', logo: 'elm.png' },
  { name: 'Huawei', project: 'huawei', logo: 'huawei.png' },
  { name: 'STC Bank', project: 'stc-bank', logo: 'stcbank.png' },
  { name: 'STC Pay', project: 'stc-pay', logo: 'stcpay.png' },
  { name: 'Sukarah', project: 'sukarah', logo: 'sukarah].png' },
  { name: 'Unity', project: 'unity', logo: 'unity.png' },
  { name: 'Valorant', project: 'valorant', logo: 'valorant.png' },
  { name: 'Waqep', project: 'waqep', logo: 'wakeb.png' },
  { name: 'Elmarqeb', project: 'elmarqeb', logo: 'المرقب.jpg' },
  { name: 'Hylo', project: 'hylo', logo: 'logoess copy.jpg' },
  { name: 'Sewar', project: 'sewar', logo: 'sewar.jpg' }
];

const PROJECT_IMAGE_OVERRIDES = {
  elmarqeb: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', 'City-Billboard-Mockup-03 copy.jpg'],
  hylo: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '31.jpg', '1 (2).jpg', '2 (2).jpg', '3 (2).jpg', '4 (2).jpg', '5 (2).jpg', '6 (2).jpg', '7 (2).jpg', '8 (2).jpg']
};

function getProject(id) {
  return PROJECTS.find(project => project.id === id);
}

function getProjectImages(project) {
  const filenames = PROJECT_IMAGE_OVERRIDES[project.id] || Array.from(
    { length: project.imageCount || 0 },
    (_, index) => `${index + 1}.jpg`
  );
  const folder = encodeURIComponent(project.id);
  return filenames.map(filename => `assets/projects/${folder}/${encodeURIComponent(filename)}`);
}

function getCoverImage(project) {
  return getProjectImages(project)[0];
}