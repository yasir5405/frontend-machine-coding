import { useEffect, useState } from "react";

interface Image {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const App = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      );

      const photos: Image[] = await response.json();

      if (photos) setImages(photos);
    };

    fetchImages();
  }, []);

  const uniqueAlbumIds = Array.from(
    new Set(images.map((image) => image.albumId))
  );

  return (
    <div className="min-h-dvh w-full flex flex-col items-center py-10 px-20 gap-4">
      <h1 className="text-3xl font-bold underline">Image Album UI</h1>

      <div className="h-full w-full flex flex-wrap gap-4">
        {uniqueAlbumIds.map((uniqueId, idx) => (
          <div
            key={idx}
            className="border p-4 h-[100px] cursor-pointer border-neutral-400 flex flex-col"
          >
            <h1>Album Number: {uniqueId}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
