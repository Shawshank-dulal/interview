export function BookSection() {
  const books = [
    {
      title: "All Benefits of PLUS",
      price: "$24",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      title: "All Benefits of PLUS",
      price: "$24",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Book for you</h2>
        <button className="text-teal-500">
          <span className="sr-only">View calendar</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      <div className="grid gap-4">
        {books.map((book, index) => (
          <div key={index} className="bg-white rounded-lg border p-4">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-medium">{book.title}</h3>
                <p className="text-lg font-semibold text-teal-500 mt-1">{book.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}