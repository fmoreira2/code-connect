import Image from "next/image";

interface AvatarProps {
  src: string;
  name: string;
}

export default function Avatar({ src, name }: AvatarProps) {
    return (
		<ul>
			<li>
				<Image src={src} alt={name} width={32} height={32}  />
			</li>
			<li>@{name}</li>
		</ul>
	);
}