import Feed from "../components/Feed";
import PostBox from "../components/PostBox";
import TopCommunities from "../components/TopCommunities";

export default function Home() {
  return (
    <div className="max-w-5xl my-7 mx-auto">
      <PostBox />
      <div className="flex">
        <Feed />
        <TopCommunities />
      </div>
    </div>
  );
}
