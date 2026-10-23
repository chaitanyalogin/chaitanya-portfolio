import './globals.css';
const publicURL = process.env.PORTFOLIO_SITE_URL || 'https://chaitanya-portfolio-a2f.pages.dev';
export const metadata = {
  metadataBase: new URL(publicURL),
  alternates: { canonical: '/' },
  title: 'Chaitanya Kulkarni | AML & KYC Portfolio',
  description: 'Chaitanyachidambar S. Kulkarni: commerce graduate pursuing entry-level AML, KYC and financial crime operations roles in Bengaluru. Explore TraceCase, an independent investigation workbench using fictional cases.',
  icons: { icon: '/assets/favicon.svg' },
  openGraph: {
    title: 'Chaitanya Kulkarni | Look closer. Think clearly.',
    description: 'An AML and KYC candidate with a commerce foundation and experience in data validation and reporting. Explore the TraceCase investigation workbench.',
    type: 'website', url: publicURL,
    images: [{ url: '/assets/social-card.png', width: 1200, height: 630, alt: 'Chaitanya Kulkarni: AML and KYC portfolio. Look closer. Think clearly.' }],
  },
  twitter: { card: 'summary_large_image' },
};
export const viewport = { themeColor: '#f5f4ee' };
export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}

