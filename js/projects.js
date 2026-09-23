const PROJECTS = [
  { id: 'huawei', name: 'Huawei Gaming Event', category: 'Events', description: '3D event concept and execution visualization for Huawei under the patronage of the UAE Esports Federation.', imageCount: 30, behanceUrl: 'https://www.behance.net/gallery/225724309/Huawei-Esports-Arena-3D-Event-Design-Real-Execution', logo: 'huawei.png' },
  { id: 'valorant', name: 'Valorant Stage Concept', category: 'Events', description: 'Gaming event concept and CGI visualization with cinematic lighting and material development.', imageCount: 19, behanceUrl: 'https://www.behance.net/gallery/232671555/VALORANT-5th-Anniversary-Event-2', logo: 'valorant.png' },
  { id: 'shatana', name: 'Shatana', category: 'Events', description: 'Experiential event environment and spatial visualization from the supplied project resources.', imageCount: 60 },
  { id: 'waqep', name: 'Waqep', category: 'Exhibitions', description: 'Exhibition booth design and CGI visualization with detailed material and lighting work.', imageCount: 15, behanceUrl: 'https://www.behance.net/gallery/241443759/WAKEB-Futuristic-Defense-Exhibition-Booth', logo: 'wakeb.png' },
  { id: 'amlak', name: 'Amlak Commercial Visualization', category: 'Exhibitions', description: 'Commercial visualization and exhibition booth design with high-end CGI renders.', imageCount: 6, behanceUrl: 'https://www.behance.net/gallery/251853785/amlak-interior-design', logo: 'amlak.png' },
  { id: 'stc-pay', name: 'STC Pay Experiential Space', category: 'Events', description: 'Event environment and experiential space design supporting stakeholder approvals and production.', imageCount: 10, behanceUrl: 'https://www.behance.net/gallery/252222145/STC-Smart-Service-Booth', logo: 'stcpay.png' },
  { id: 'sukarah', name: 'Sukarah Exhibition Booth', category: 'Exhibitions', description: 'Exhibition booth and commercial CGI visualization for Sukarah.', imageCount: 17, behanceUrl: 'https://www.behance.net/gallery/253680303/SUKARAH-Exhibition-Booth', logo: 'sukarah].png' },
  { id: 'danikin', name: 'Danikin', category: 'Products', description: '3D product modeling, studio lighting, and material development for Danikin.', imageCount: 13, logo: 'dankin.png' },
  { id: 'stc-bank', name: 'STC Bank Event Environment', category: 'Events', description: 'Large-scale event environment visualization focused on brand presence and spatial flow.', imageCount: 30, behanceUrl: 'https://www.behance.net/gallery/247855453/STC-Saudi-National-Day', logo: 'stcbank.png' },
  { id: 'elm', name: 'ELM Exhibition Booth', category: 'Exhibitions', description: 'Exhibition booth and commercial visualization for ELM.', imageCount: 14, logo: 'elm.png' },
  { id: 'unity', name: 'Unity 3D Product & Event', category: 'Products', description: 'Product visualization and 3D environment design for Unity.', imageCount: 31, behanceUrl: 'https://www.behance.net/gallery/256123309/Unity-UDay-Abu-Dhabi-3D-Event-Design-Visualization', logo: 'unity.png' },
  { id: 'reem-mall', name: 'Reem Mall', category: 'Events', description: 'Retail and experiential environment visualization from the supplied project resources.', imageCount: 15 },
  { id: 'astrazenka', name: 'AstraZeneca', category: 'Exhibitions', description: 'Exhibition and branded environment visualization from the supplied project resources.', imageCount: 10 },
  { id: 'elyser-booth', name: 'Elyser Booth', category: 'Exhibitions', description: 'Exhibition booth visualization from the supplied project resources.', imageCount: 15 },
  { id: 'mustela', name: 'Mustela', category: 'Products', description: 'Product and brand visualization from the supplied project resources.', imageCount: 6 },
  { id: 'ramadan', name: 'Ramadan', category: 'Events', description: 'Seasonal event visualization from the supplied project resources.', imageCount: 18 },
  { id: 'sandstorm', name: 'Sandstorm', category: 'Events', description: 'Experiential environment visualization from the supplied project resources.', imageCount: 6 },
  { id: 'takamul', name: 'Takamul', category: 'Exhibitions', description: 'Exhibition and spatial visualization from the supplied project resources.', imageCount: 25, logo: 'takamul.png' },
  { id: 'tameesa', name: 'Tameesa', category: 'Exhibitions', description: 'Exhibition booth and commercial visualization for Tameesa.', imageCount: 13, behanceUrl: 'https://www.behance.net/gallery/253847615/TAMEESA-Restaurant-Facade-Design-3D-Visualization' },
  { id: 'najm', name: 'Najm Events', category: 'Events', description: 'A collection of six Najm event environments and spatial visualizations.', imageFolders: ['najm-1', 'najm-2', 'najm-3', 'najm-4', 'najm-5', 'najm-6'], imageCounts: { 'najm-1': 9, 'najm-2': 9, 'najm-3': 8, 'najm-4': 8, 'najm-5': 8, 'najm-6': 8 }, logo: 'najm.png' }
];

const CLIENT_LOGOS = [
  { name: 'VE', logo: ',ve.png' },
  { name: 'Logos', logo: 'logoess copy.jpg' },
  { name: 'Sewar', logo: 'sewar.jpg' },
  { name: 'المرقب', logo: 'المرقب.jpg' },
  { name: 'المركز السعودي لزراعة الأعضاء', logo: 'شعار المركز السعودي لزراعة الأعضاء بدقة عالية svg - png.png' },
  { name: 'المركز الوطني لأبحاث وتطوير الزراعة المستدامة - استدامة', logo: 'شعار المركز الوطني لأبحاث وتطوير الزراعة المستدامة _ استدامة.png' },
  { name: 'هيئة رعاية الأشخاص ذوي الإعاقة', logo: 'شعار هيئة رعاية الأشخاص ذوي الإعاقة.png' },
  { name: 'وزارة الثقافة', logo: 'شعار وزارة الثقافة - SVG.png' },
  { name: 'وزارة الدفاع', logo: 'شعار وزارة الدفاع -.png' },
  { name: 'وزارة الرياضة', logo: 'شعار وزارة الرياضة.png' },
  { name: 'وزارة الصحة السعودية', logo: 'شعار وزارة الصحة السعودية.png' },
  { name: 'يسر وطمأنينة', logo: 'شعار يسر وطمأنينة بدقة عالية.png' }
];

const CLIENTS = [
  ...PROJECTS.map(project => ({
  name: project.name,
  project: project.id,
  logo: project.logo || null
  })),
  ...CLIENT_LOGOS
];

function getProject(id) {
  return PROJECTS.find(project => project.id === id);
}

function getProjectImages(project) {
  if (project.imageFolders) {
    return project.imageFolders.flatMap(folderId => {
      const folder = encodeURIComponent(folderId);
      return Array.from(
        { length: project.imageCounts?.[folderId] || 0 },
        (_, index) => `assets/projects/${folder}/${encodeURIComponent(`${index + 1}.jpg`)}`
      );
    });
  }

  const filenames = Array.from(
    { length: project.imageCount || 0 },
    (_, index) => `${index + 1}.jpg`
  );
  const folder = encodeURIComponent(project.id);
  return filenames.map(filename => `assets/projects/${folder}/${encodeURIComponent(filename)}`);
}

function getCoverImage(project) {
  return getProjectImages(project)[0];
}
