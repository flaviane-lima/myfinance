import StyledComponentsRegistry from './lib/registry';
import HeaderContent from './components/HeaderContent';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <HeaderContent />
          <main>{children}</main>
          </StyledComponentsRegistry>
      </body>
    </html>
  );
}
