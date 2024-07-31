import Image from "next/image";
import styles from "@/styles/Main.module.scss"
import Button from "@/components/ui/Button";
import MainEmojiMotion from "@/components/MainEmojiMotion";
import MainEmoji1 from "@/assets/MainEmoji1.png";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";



export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main className={styles.page}>
      {/* MAIN */}
      <section className={styles.main}>
        <div className="container">
          <div className={styles.main_text}>
            <h1>Where the joy of learn meets the power of community</h1>
            <h4>Dive deep in immersive, interactive small groups. Expand horizons, engage in discussions, and elevate your learning journey with us.</h4>
            {!session?.user.username && (
              <Button link="/sign-up" size="sm" color="white">Sign Up</Button>
            )}
          </div>

          <div className={styles.main_bg}>
            <div className={styles.main_bg_circle}>
              <MainEmojiMotion index={1} left={-1} top={50} image={MainEmoji1} />
            </div>
            <div className={styles.main_bg_circle}>
              <MainEmojiMotion index={2} left={92} top={70} image={MainEmoji1} />

            </div>
            <div className={styles.main_bg_circle}>
              <MainEmojiMotion index={3} left={92} top={25} image={MainEmoji1} />

            </div>
          </div>
        </div>

      </section>

      {/* Find your stack */}
      <section className={styles.find}>
        <div className="container">

          <div className={styles.find_headline}>
            <h2>Find your <span>perfect</span> stack</h2>
          </div>
          <div className={styles.find_block}>
            <div className={styles.find_splite_block}>
              <div className={styles.find_card}>
                <h4>Find your favorite stack</h4>
              </div>
              <div className={styles.find_card}>
                <h4>Rewiev your expirence with the project</h4>

              </div>
            </div>
            <div className={styles.find_sized_block}>
              <div className={styles.find_card}>
                <h4>Share your personal projects and stacks</h4>

              </div>
              <div className={styles.find_card}>
                <h4>Get people on your project</h4>

              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

