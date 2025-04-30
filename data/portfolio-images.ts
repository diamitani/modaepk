export const fashionImages = {
  // Fashion category images
  fashionInstallation: "/images/fashion-1.png",
  streetwearCollection: "/images/fashion-2.png",
  customFashion: "/images/fashion-3.png",
  apparelDesign: "/images/fashion-4.png",
  maskDesign: "/images/fashion-5.png",
  runwayDesigns: "/images/fashion-6.png",
  fashionCollaboration: "/images/fashion-7.png",
}

export const artworkImages = {
  // Artwork category images
  loseYourMind: "/images/artwork-1.png",
  perfectWombman: "/images/artwork-2.png",
  beAnArtist: "/images/artwork-3.png",
  sailorMoon: "/images/sailor-moon-1.png",
  animeFusion: "/images/anime-1.png",
  urbanLandscape: "/images/artwork-4.png",
  culturalIdentity: "/images/artwork-5.png",
  metamorphosis: "/images/artwork-6.png",
  digitalDreams: "/images/artwork-7.png",
  neonNostalgia: "/images/artwork-8.png",
}

export const eventImages = {
  // Events category images
  galleryOpening: "/images/gallery-1.png",
  fashionWeek: "/images/event-2.png",
  artBasel: "/images/event-3.png",
  miamiArtWeek: "/images/event-1.png",
  workshopSession: "/images/workshop-1.png",
}

export const processImages = {
  // Process category images
  studioWork: "/images/studio-1.png",
  livePainting: "/images/painting-1.png",
  creativeProcess: "/images/portrait-1.png",
  mediaFeature: "/images/press-1.png",
  collaborationProject: "/images/collaboration-1.png",
}

export const muralImages = {
  // Mural category images
  urbanMural: "/images/mural-1.png",
  communityProject: "/images/mural-2.png",
  galleryInstallation: "/images/mural-3.png",
  festivalArtwork: "/images/mural-4.png",
}

// Add this export at the end of the file to combine all image categories
export const portfolioImages = {
  ...fashionImages,
  ...artworkImages,
  ...eventImages,
  ...processImages,
  ...muralImages,
}
