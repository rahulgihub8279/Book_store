import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";

export default function Home() {
  return (
    <>
      <div className="bg-zinc-900 text-white px-10 py-5">
        <Hero></Hero>
        <RecentlyAdded></RecentlyAdded>
      </div>
    </>
  );
}
