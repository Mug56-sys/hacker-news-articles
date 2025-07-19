import './index.css'
import { useQuery} from "@tanstack/react-query";
function App() {
  const {data}=useQuery({
    queryKey:['articles'],
    queryFn: async()=>{
      const response=await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
      return response.json()
    }
  })
  const topArticles=data?.slice(0,10);
  console.log(topArticles)
  return (
    <div className='bg-red-50'>
      hello
    </div>
  )
}

export default App
