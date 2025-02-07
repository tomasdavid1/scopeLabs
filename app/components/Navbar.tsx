import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          🎓 EduVideos
        </Link>
        <Link href="/upload" className="hover:underline">
          Upload Video
        </Link>
      </div>
    </nav>
  );
}
