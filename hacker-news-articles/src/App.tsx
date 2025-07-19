import "./index.css";
import { useQueries, useQuery } from "@tanstack/react-query";

type Article={
  id:number;
  title:string;
  by:string;
  url:string;
  score:number;
}

function App() {
  const { data, isLoading,error } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/topstories.json`
      );
      return response.json();
    },
  });

  const topArticles = data?.slice(0, 10) || []

  const results = useQueries<number[]>({
        queries: topArticles.map((article:number) => ({
            queryKey: ["article", article],
            queryFn: async():Promise<Article> => {
              const response = await fetch(
                `https://hacker-news.firebaseio.com//v0/item/${article}.json`
              );
              return response.json();
            },
          })),
      })as {
  data: Article | undefined;
  isLoading: boolean;
  isError: boolean;
}[];
    
  console.log(results);
  

 
  //console.log(FetchData.by)
  //console.log(topArticles[1])
  return (
    <div className="bg-red-50">
      {!isLoading ? (
        results?.map((res) => {
          
          return <ul>
            <li>
            <a href={`${res?.data?.url}`} className={'text-blue-700 underline'}>{res?.data?.title}</a>
            <p>{res?.data?.score} by {res?.data?.by}</p>
            </li>
            
          </ul>
        })
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default App;
