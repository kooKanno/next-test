import { client } from "../../libs/client";
import styles from '../../styles/blog/blog.module.scss'
import Back from '../../components/back'
//ブログの記事を表示する部分
export default function BlogId({ blog }) {
    return (
        <main className={styles.main}>
            {/* タイトルの表示 */}
            <h1 className={styles.title}>{blog.title}</h1>
            {/* 記事公開時刻の表示 */}
            <p className={styles.publishedAt}>{blog.publishedAt}</p>
            {/* 記事本文の表示 */}
            <div 
            //CMSから呼んできたHTMLを表示するためにdangerouslySetInnerHTMLを使う
                dangerouslySetInnerHTML={{
                    __html: `${blog.body}`,
                  }}
                  className={styles.post}
            />
            <Back />
        </main>
    );
}

//microCMSの記事idを取得してビルド時にパスを指定する関数
export const getStaticPaths = async () => {
    //定数dataの中にCMSから呼んできたデータを代入
    const data = await client.get({ endpoint: "blog" });
    //定数pathにcmsから取得した記事idを基にしたパスを代入
    const paths = data.contents.map((content) => `/blog/${content.id}`);

    //指定したパスを返す。fallback: falseは存在しないアドレスの場合404を返す。
    return { paths, fallback: false };
}

//microCMSのデータを取得するビルド時にサーバー側で呼ばれる関数
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "blog", contentId: id});

    return {
        props: {
            blog: data,
        },
    };
};