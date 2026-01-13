interface Props {
  params: { slug: string };
}

export default function NewsPage({ params }: Props) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-heading font-bold mb-4">{params.slug.replace(/-/g, ' ')}</h1>
      <p className="text-gray-700">Here is the content of the article "{params.slug}".</p>
    </div>
  );
}
