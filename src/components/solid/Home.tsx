import Footer from "./Footer";
import HomeHeader from "./HomeHeader";
import MessageCard from "./MessageCard";
import { getCollection } from "astro:content";
import styles from "./Home.module.scss";

const posts = (await getCollection("blog")).sort(
  (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
);

export default function Home() {
  return (
    <main style={{ display: "flex", "flex-direction": "column" }}>
      <HomeHeader />
      <div class={styles["home-container"]}>
        {posts.map((post) => (
          <MessageCard
            title={post.data.title}
            description={post.data.description}
            time={post.data.pubDate}
            key={post.id}
            url={`/blog/${post.slug}`}
          />
        ))}
      </div>
      <Footer />
    </main>
  );
}
