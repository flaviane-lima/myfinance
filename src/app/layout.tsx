import './globals.css'; // 🔥 Isso é ESSENCIAL
import StyledComponentsRegistry from './lib/registry';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <main>{children}</main>
          </StyledComponentsRegistry>
      </body>
    </html>
  );
}
