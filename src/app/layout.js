import "./globals.css";

export const metadata = {
  title: "Arnav Portfolio",
 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
