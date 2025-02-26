import type { Metadata } from "next";
import "./globals.css";
import Aside from "@/components/Aside";
import {Prompt} from "next/font/google";

const prompt = Prompt({
  weight: ['400','600'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Code Connect",
  description: "rede social para desenvolvedores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang='pt-br' className={prompt.className}>
			<body>
				<div className='app-container'>
					<Aside />
					{children}
				</div>
			</body>
		</html>
  );
}
