import Image from "next/image";
import styles from "@/styles/Main.module.scss"
import Button from "@/components/ui/Button";
import MainEmojiMotion from "@/components/MainEmojiMotion";
import MainEmoji1 from "@/assets/MainEmoji1.png";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import photo1 from "@/assets/Screenshot_11.png"
import macbookImage from "@/assets/MacBook Pro.webp"
import globueImage from "@/assets/globeImage.webp"
import technologistImage from "@/assets/technologistImage.webp"
import starImage from '@/assets/starImage.webp'
import mechanikImage from '@/assets/mechanikImage.webp'
import artictImage from '@/assets/artistImage.webp'


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
                <div className={styles.find_card_favorite}>
                  <Image src={technologistImage} width={150} height={150} alt="photo" />
                  <Image src={artictImage} className={styles.find_card_favorite_artict} width={125} height={125} alt="photo" />
                  <Image src={mechanikImage} className={styles.find_card_favorite_mechanik} width={125} height={125} alt="photo" />
                </div>

              </div>
              <div className={styles.find_card}>
                <h4>You can find your favorite stack and review it</h4>
                <p>A lot of stacks you can find on our website.That's helped you as thanks you can write a comment or put a like</p>
                <Image src={starImage} className={styles.find_card_star} width={50} height={50} alt="photo" />

              </div>
            </div>
            <div className={styles.find_sized_block}>
              <div className={styles.find_card}>
                <h4>Share your personal projects and stacks with <span>TechStack</span></h4>
                <div className={styles.find_card_images}>
                  <Image src={macbookImage} width={500} height={400} alt="photo" />

                </div>
              </div>
              <div className={styles.find_card}>
                <h4>Get people on your project</h4>
                <Image src={globueImage} className={styles.find_card_globe} width={200} height={200} alt="photo" />

              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

