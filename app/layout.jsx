import './globals.css';

const publicURL = process.env.PORTFOLIO_SITE_URL;
const shareImages = publicURL ? [{ url: new URL('/assets/social-card.png', publicURL).href, width: 1200, height: 630 }] : [];

export const metadata = {
  ...(publicURL ? { metadataBase: new URL(publicURL), alternates: { canonical: '/' } } : {}),
  title: 'Chaitanya Kulkarni | Full Stack Developer & Creator',
  description: 'Chaitanya Kulkarni, a full stack developer in Bengaluru. Explore EntitlementCI, MERN projects, Python automation, music and documentaries. Download my resume or get in touch.',
  icons: { icon: '/assets/favicon.svg' },
  openGraph: {
    title: 'Chaitanya Kulkarni | Code meets creativity',
    description: 'Full stack development, Python automation and a little creative curiosity. Explore my work and The Chay Show.',
    type: 'website',
    images: shareImages,
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = { themeColor: '#111312' };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
