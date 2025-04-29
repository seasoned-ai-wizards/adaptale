import Link from "next/link";
import Image from "next/image";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  // Mock data for presentations (you'd fetch this from an API)
  const presentations = [
    {
      id: 1,
      title: "Introduction to Coding: Building Basic Games or Apps",
      createdAt: "2 hours ago",
      slides: 4,
      thumbnail: "/coding.png"
    },
    {
      id: 2,
      title: "The Importance of Nutrition: Healthy Eating Habits",
      createdAt: "3 days ago",
      slides: 6,
      thumbnail: "/nutrition.png"
    },
    {
      id: 3,
      title: "The Water Cycle: Understanding Earth's Natural Processes",
      createdAt: "5 days ago",
      slides: 5,
      thumbnail: "/water-cycle.png"
    }
  ];

  return (
    <HydrateClient>
      <main className="min-h-screen">
        {/* Main Content */}
        <div className="container mx-auto p-6 py-12">
          <h1 className="mb-8 font-paytone text-4xl text-gray-900">My presentations</h1>

          {/* Grid of Presentations */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {presentations.map((presentation) => (
              <div key={presentation.id} className="card-presentation">
                <div className="card-thumbnail">
                  <Image 
                    src={presentation.thumbnail} 
                    alt={presentation.title}
                    width={300}
                    height={169}
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                    priority
                  />
                </div>
                <div className="p-4">
                  <h2 className="mb-1 text-lg font-bold text-gray-900 font-inter">{presentation.title}</h2>
                  <div className="text-sm text-gray-500">
                    Created {presentation.createdAt} • {presentation.slides} slides
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Create New Presentation Button with gradient border */}
          <div className="mt-8 flex justify-end">
            <Link href="/realtime">
              <button className="btn-gradient-border">
                Create a new presentation
              </button>
            </Link>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
