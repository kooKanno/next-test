import { useRouter } from 'next/router'


export default function Back() {
    const router = useRouter()
    return (
        <div>
            <button onClick={() => router.back()}>戻る</button>
        </div>
    );
}