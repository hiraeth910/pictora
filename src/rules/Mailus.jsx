export default function DataDeletionNotice() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full md:w-[60vw]">
        <h2 className="text-2xl font-bold mb-4">We Respect Your Privacy</h2>
        <p className="mb-4 text-gray-700">
          Once your data is deleted, you will never be able to access it again.
        </p>
        <p className="font-semibold text-lg">
          For data deletion, write to us at{" "}
          <a
            href="mailto:pictora2025@gmail.com"
            className="text-blue-600 underline"
          >
            pictora2025@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
