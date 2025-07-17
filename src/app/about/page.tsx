export default function AboutPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-xl w-full border border-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700 text-center">About This Project</h1>
        <p className="text-gray-700 text-lg text-center">
          This application demonstrates a modern MERN stack using Next.js.
        </p>
      </div>
    </div>
  );
}
