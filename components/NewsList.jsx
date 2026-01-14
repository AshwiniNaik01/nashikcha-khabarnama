import Image from "next/image";

const NewsList = ({ articles }) => {
    return (
        <div className="w-full space-y-8">
            {articles.map((item, index) => (
                <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b pb-6"
                >
                    {/* LEFT SIDE TEXT */}
                    <div className="md:col-span-8 space-y-2">
                        <h2 className="text-[22px] font-bold leading-snug hover:text-red-600 cursor-pointer">
                            {item.title}
                        </h2>

                        <p className="text-gray-600 text-sm">
                            {item.category} | Updated: {item.date}
                        </p>

                        <p className="text-[16px] leading-relaxed text-gray-800">
                            {item.excerpt}
                        </p>
                    </div>

                    {/* RIGHT SIDE IMAGE */}
                    <div className="md:col-span-4">
                        <Image
                            src={item.image}
                            width={500}
                            height={300}
                            alt={item.title}
                            className="w-full h-[160px] object-cover rounded"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsList;
