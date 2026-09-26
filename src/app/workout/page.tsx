import ExerciseCard from "../../components/ExerciseCard"
import {Exercise} from "../../type"
import Banner from "../../components/Banner"

const gymDetails = async ():Promise<Exercise[]> => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog")
  if(!res.ok) throw new Error("The data are not there")
  const data = await res.json()
  return data;
}

export default async function HomePage() {
  const exercises = await gymDetails()
  return (
    <div>
    <Banner/>
    <div id="library" className="mx-auto mt-10 mb-10 grid max-w-7xl scroll-mt-24 gap-6 px-6 md:grid-cols-3 sm:grid-cols-1 bg-black font-sans">
     {exercises.map((item) =>(
      <ExerciseCard key={item.id} item={item} />
     ))}
    </div>
    </div>
  );
}