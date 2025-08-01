import MovieCard from "@/components/custom/MovieCard";
import ProfileCard from "@/components/custom/ProfileCard";
import { Button } from "@/components/ui/button";
import { profileData, books } from "@/lib/data";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

const SectionOne = () => {
  const date = new Date()
  const hour = date.getHours()
  const loveBooks = books.filter(each => each.genre === "love");
  const trillerBooks = books.filter(each => each.genre === "triller");
  return (
    <div className="h-auto flex items-center flex-col">
      <Button className="fixed top-3 left-5">
        <Link href={"/"} className="flex items-center gap-2">
          <ChevronLeftIcon />
          Home
        </Link>
      </Button>
      <h1 className="font-bold text-3xl">1. Profile Card Component</h1>
      <div className="grid grid-cols-2 gap-4 max-h-2/4 max-w-3/4">
        {profileData.map((each) => (
          <ProfileCard key={each.key} name={each.name} bio={each.bio} avatarUrl={each.avatarUrl} isOnline={each.isOnline} />
        ))}
      </div>

      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700" />

      <h1 className="font-bold text-3xl">2. Dynamic Greetings</h1>
      <div className="text-5xl font-bold text-gray-300 ">
        Good {hour >= 0 && hour <= 12 ? "Morning"
          : hour >= 20 && hour > 0 ? "Night"
            : "Afternoon"}
      </div>

      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700" />

      <h1 className="font-bold text-3xl">3. Books Classification</h1>
      <div className="flex gap-10">
        <div className="bg-gray-700 p-2 rounded-2xl">
          <h2 className="font-bold text-white text-3xl text-center mx-3">Romantic Movies</h2>
          {loveBooks.map(each => (
            <MovieCard key={each.key} name={each.name} genre={each.genre} director={each.director} />
          ))}
        </div>
        <div className="bg-gray-700 p-2 rounded-2xl">
          <h2 className="font-bold text-white text-3xl text-center mx-3">Triller Movies</h2>
          {trillerBooks.map(each => (
            <MovieCard key={each.key} name={each.name} genre={each.genre} director={each.director} />
          ))}
        </div>
      </div>

      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700" />

    </div>
  )
}

export default SectionOne;
