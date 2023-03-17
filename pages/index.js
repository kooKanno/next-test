// ルート内の移動で使う
import Link from "next/link";
//microCMSのserviceDomainとapiKeyを呼ぶ
import { client } from "../libs/client";

//ブログの記事一覧を表示する部分
export default function Home({ blog }) {
    return (
        <div>
            <ul>
                {blog.map((blog) => (
                    //繰り返す各要素にkeyを持たせる
                    <li key={blog.id}>
                        {/* 遷移先のアドレスはcmsから呼んできた記事ごとのidを使う */}
                        <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

//microCMSのデータを取得するビルド時にサーバー側で呼ばれる関数
export const getStaticProps = async () => {
    //定数dataの中にCMSから呼んできたデータを代入。limitで呼んでくる個数の制限もできる。
    const data = await client.get({ endpoint: "blog", queries: {limit: 2} });
    //props blogの中に呼んできた内容を入れて返す
    return {
        props: {
            blog: data.contents,
        },
    };
};